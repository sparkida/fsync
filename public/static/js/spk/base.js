/**
 * Base v0.2.0
 * Author: Nicholas Riley
 * Sparkida 2015
 */
Spk.ignite('Base', 'b', function () {
    self.dev = 1;
    var proto = spk.b,
        base,
        AJAXConfig = function (action, complete) {
            var that = this;
            that.action = 'sync/' + action;
            that.complete = complete;
        },
        SyncManager = function (filelist) {
            var that = this;
            that.list = filelist;
            that.count = filelist.length;
        };

    SyncManager.create = function (filelist) {
        return new SyncManager(filelist);
    };
    SyncManager.prototype.count = 0;
    SyncManager.prototype.next = function () {
        var that = this,
            list = that.list,
            item,
            i = 0;
        that.count -= 1;
        if (that.count === 0) {
            for (i; i < list.length; i++) {
                item = list[i];
                console.log(item);
                Spk.after(base.items[item].slice(1), base.items[item][0]);
                base.items[item][1].className = base.items[item][1].className.replace(' completed','');
            }
            Spk.ease.fadeOut(base.mod.loader, 300, 'easeInOutQuad', function () {
                Spk.ease.fadeIn(base.mod.box, 300);
            });
        }
    };

    AJAXConfig.create = function (action) {
        var onComplete = function () {
                dbg('file updated: ' + action);
                base.items[action][1].className += ' completed';
                base.syncManager.next();
            };
        return new AJAXConfig(action, onComplete);
    };

    AJAXConfig.prototype = {
        method: 'get',
        action: '',
        async: true
    };

    //init is always called if available
    proto.init = function () {
        dbg('Base Initialized!');
        base = this;
        Spk.body.style.visibility = 'visible';
        base.getFiles();
        base.setup();
        dbg('+++++');
        dbg(base);
    };

    proto.mod = {
        /*projectPath: Spk.set('input', {
            id: 'projectPath',
            type: 'text',
            name: 'project_path',
            placeholder: 'Project Path'
        }),*/
        main: Spk.get('#home'),
        loader: Spk.set('div', {
            id: 'loader'
        }),
        box: Spk.set('div', {
            id: 'box'
        }),
        submit: Spk.set('input', {
            id: 'submit',
            type: 'submit',
            value: 'sync'
        }),
        control: Spk.set('div', {
            class: 'control'
        })
    };

    proto.setup = function () {
        var mod = base.mod,
            control = mod.control,
            submit = mod.submit;

        //bind the click event to our generate function
        Spk.event.bind('click', submit, base.generate);

        Spk.append([
                //mod.projectPath,
                submit], control);
        Spk.ease.fadeOut(mod.loader);
        Spk.prepend(control, mod.main);
        Spk.after([mod.box, mod.loader], mod.main);
    };
    
    //keep track of opened folders
    proto.opened = {};
    //list of checked files
    proto.watch = {};
    //list of all the dirs and files
    proto.items = {};

    /**
     * @method
     * generates new fsc.ini config
     */
    proto.generate = function (e) {
        console.log('Building synchronization list');
        var loader = base.mod.loader,
            list = Object.keys(base.watch).filter(function (item) {
                return base.watch[item];
            });
        if (list.length === 0) {
            console.log('noting selected, nothing to generate');
        } else { 
            Spk.ease.fadeOut(base.mod.box, 300, 'easeInOutQuad', function () {
                //hide main elems and sync
                list.map(function (item) {
                    Spk.append(base.items[item].slice(1), loader);
                });
                base.sync(list);
            });
        }
    };

    /**
     * synchronize a list of files and directories
     * we do each one separately since that is how ftp
     * works anyways, however this could generate some
     * undesired overhead in certain circumstances so
     * in the future we could easily add the option
     * to do this all in a single call that passes json
     * data array or cvs querstring of files to 
     * parser in the controller that will handle the download
     * the drawback is that we would lose per file progress
     * unless we build support for progress requests
     * @params {array} filelist - an array of file and/or directory names
     */
    proto.sync = function (filelist) {
        console.log('synchronizing', filelist);
        var i = 0,
            cfg,
            size = filelist.length;
        Spk.ease.fadeIn(base.mod.loader, 200);
        base.syncManager = SyncManager.create(filelist);
        for (i; i < size; i++) {
            cfg = AJAXConfig.create(filelist[i]);
            Spk.ajax(cfg);
        }

    };

    //get files from server
    proto.getFiles = function (filepath, target) {//{{{
        dbg('building files');
        var files,
            action = filepath ? 'getfiles/' + filepath : 'getfiles';
        Spk.ajax({
            method: 'get',
            action: action,
            async: true,
            complete: function () {
                console.log('files complete');
                if (target) {
                    console.log({a:target});
                    files = base.buildFiles(Spk.parseJSON(this.response), filepath, true);
                    if (files) {
                        console.log(files);
                        base.opened[filepath] = {
                            opened: 1,
                            block: files
                        };
                        //insert files after typing
                        Spk.after(files, target);
                    } else {
                        base.opened[filepath] = {
                            opened: 1,
                            block: null
                        };
                        console.log('--- no files found ---');
                    }
                } else {
                    base.buildFiles(Spk.parseJSON(this.response));
                }
            }
        });
    };//}}}

    //build out files and directories
    proto.buildFiles = function (paths, root, returnFiles) {//{{{
        if (!paths) {
            console.log('dir is empty: ' + root);
            return;
        }
        var i,//{{{
            stack,
            c = 0,
            type = 'dirs',
            //memory efficient way to add elements to the DOM
            _frag = Spk.node('frag'),
            frag = _frag.cloneNode(),
            //TODO
            con = Spk.set('div', {}),
            box = con.cloneNode(),
            label = Spk.set('label', {
                class: 'itemLabel',
            }),                   
            item = Spk.set('input', {
                type: 'checkbox',
                class: 'item'
            }),
            gap = Spk.set('div', {
                class: 'gap' 
            }),
            check = function (me) {
                me.checked = true;
                base.watch[me.value] = 1;
            },
            uncheck = function (me) {
                me.checked = false;
                base.watch[me.value] = 0;
            },
            //label
            la,
            //input item
            it,
            container,
            clickHandler,
            current,
            index,//}}}
            newItem = function (type, filepath) {//{{{
                clickHandler = function (e) {
                    var children;
                    //if it's a file, we mark it, if it is a directory, we
                    //only mark it if the currentTarget is the input element
                    //otherwise we perform an ajax request, `getfiles`, to 
                    //get the files from the node server
                    //--
                    //if we are clicking the directory's label
                    if (e.currentTarget.nodeName.toLowerCase() === 'label' && type === 'dirs') {//{{{
                        if (undefined !== base.opened[filepath]) {
                            current = base.opened[filepath];
                            if (current.opened) {
                                console.log('dir is open, should now close');
                                console.log(current);
                                //hide and set to closed
                                if (null !== current.block) {
                                    current.block.style.display = 'none';
                                }
                                current.opened = 0;
                            } else {
                                //show and set to open
                                if (null !== current.block) {
                                    current.block.style.display = 'block';
                                }
                                current.opened = 1;
                            }
                            return false;
                        }
                        base.getFiles(filepath, e.currentTarget.nextSibling);
                        if (null !== base.opened[filepath].block && e.currentTarget.previousSibling.checked) {
                            children = Spk.get('input', base.opened[filepath].block);
                            Spk.map(children, check);
                        }
                        return false;
                    }
                    else if (e.currentTarget.nodeName.toLowerCase() === 'label') {
                        //ignore file labels
                        return false;
                    } else {
                        //if we are clicking something that is in the watch list, remove
                        if (undefined !== base.watch[filepath] && base.watch[filepath]) {
                            //remove from selected
                            base.watch[filepath] = 0;
                            if (type === 'dirs' && undefined !== base.opened[filepath] 
                                    && null !== base.opened[filepath].block) {
                                current = base.opened[filepath].block;
                                children = Spk.get('input', current);
                                Spk.map(children, uncheck);
                            }
                            //uncheck all parent nodes
                            var targ = e.target,
                                anchor;
                            while (targ.parentElement) {
                                targ = targ.parentElement;
                                anchorPath = targ.className.split('open ').pop();
                                //break when out of main container
                                if (anchorPath.length === 0) {
                                    break;
                                } 
                                //get parent anchor
                                anchor = Spk.get('#dir_' + anchorPath);
                                anchor.checked = false;
                                if (undefined !== base.watch[anchorPath]) {
                                    base.watch[anchorPath] = 0;
                                }
                            }
                                
                        } else {
                            //add to watch
                            if (type === 'dirs') {
                                if (undefined !== base.opened[filepath]
                                        && null !== base.opened[filepath].block) {
                                    current = base.opened[filepath].block;
                                    children = Spk.get('input', current);
                                    Spk.map(children, check);
                                }
                            }
                            //add to selected
                            base.watch[filepath] = 1;
                        }
                        console.log('Marked '+ type + ': ' + filepath, base.watch[filepath]);
                    }//}}}
                },
                it = item.cloneNode();
                la = label.cloneNode();
                la.className += ' ' + type;
                if (returnFiles) {
                    filepath = root + '/' + filepath
                }
                la.htmlFor = it.value = filepath;
                //set checks for files when clicked, folders have to open
                it.id = (type === 'files') ? filepath : 'dir_' + filepath;
                Spk.text(la, la.htmlFor);
                Spk.event.bind('click', [it,la], clickHandler);
                base.items[filepath] = [it, la, gap.cloneNode()];
                return base.items[filepath];
            };//end newItem//}}}
        returnFiles = returnFiles ? returnFiles : false;
        container = _frag.cloneNode();
        for (c = 0; c < 2; c++) {
            stack = paths[type];
            //container = _frag.cloneNode();
            for (i = 0; i < stack.length; i++) {
                Spk.append(newItem(type, stack[i]), container);
            }
            //frag.appendChild(container);
            //change type to files on second lap
            type = 'files';
        }
        if (returnFiles) {
            box.className = 'open ' + root;
            box.appendChild(container);
            return box;
        }
        //otherwise add to body
        frag.appendChild(container);
        Spk.append(frag, base.mod.box);
    };//}}}

});

