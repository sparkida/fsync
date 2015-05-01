/*
 * Base
 * (c) 2014 Sparkida
 * Author: Nicholas Riley
 * v 0.1
 */
/* ----Log----
 *
 * ---- Version info ----
 * v 0.1
 *	
 * ----- Todo list -----
 *  - need to do  + working on  = done
 *
 */
Spk.ignite('Base', 'b', function() {

    var proto = spk.b, 
        base;

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
            value: 'generate'
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

        Spk.prepend(control, mod.main);
        Spk.after([mod.box, mod.loader], mod.main);
    };
    
    //keep track of opened folders
    proto.opened = {};
    //list of checked files
    proto.watch = {};
    //list of all the dirs and files
    proto.items = {};


    /*
     * @method
     * generates new fsc.ini config
     */
    proto.generate = function (e) {
        if (base.watch.length === 0) {
            console.log('noting selected, nothing to generate');
            return;
        } else {
            var n,
                it,
                loader = base.mod.loader,
                list = [],
                getList = function(me) {
                    list.push(me.value);
                };
            
            for (n in base.watch) {
                if (base.watch[n]) {
                    list.push(n);
                    Spk.append(base.items[n].slice(1), loader);
                }
            }
            Spk.ease.fadeOut(base.mod.box, 300);
            console.log(list);
            //---begin synchronization---
            proto.sync(list);
        }
    };

    //synchronize a list of files and directories
    proto.sync = function (filelist) {
        console.log('synchronizing', filelist);
        //we do each one separately since that is how ftp
        //works anyways, however this could generate some
        //undesired overhead in certain circumstances
        var i,
            cfg,
            Config = function (action, complete) {
                this.action = 'sync/' + action;
                this.complete = complete;
            };
        Config.create = function (action) {
            return new Config(action, function () {
                var act = action;
                dbg('file updated: ' + act);
                base.items[act][1].className += ' completed';
            });
        };
        Config.prototype = {
            method: 'get',
            action: '',
            async: true
        };

        for (i = 0; i < filelist.length; i++) {
            cfg = Config.create(filelist[i]);
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
                    //if we are clicking the a directory's label
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
                        console.log('Marked '+ type + ': ' + filepath);
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

