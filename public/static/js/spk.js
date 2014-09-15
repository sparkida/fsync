/*
 *	SpkJS v1.1.34 - A fast, reliable, lightweight JavaScript framework
 * 	Copyright (c) 2013 Nicholas Riley, Sparkida, SpkJS. All rights reserved.
 
 * 	This code must not be altered, reverse engineered, sublicensed, duplicated, 
  	extracted, or used to encourage or promote illegal activity. Any open source 
  	licensed software used by and/or accessible through this software (SpkJS) 
  	may expressly override some of these terms, and in such cases, the overriding 
  	provisions apply.
 */			
			
/* ----TODO LOG----
 * - [?]=I may not being working on these now, I may have deprecated them entirely
 * 
 * TODO - Spk.random(1, 100) - random 1 to 100
 *
 * - [?] fix mouseenter mosueleave??
 * - [?] need to perfect mouseleave and mousehover, and make sure their listeners are removed??
 * - [ ] ajax needs error handler 
 * - [ ] we need an API workaround for the versioning, possibly an internal call to a version
 * - [ ] list through the Spk that will force it to reload
 *
 * ---- version info ----
 * v 1.1.342    - fixed issue with synchronous AJAX 'complete' calls
 *              - fixed issue with Spk.after not appending to nextSibling
 *              - expanded available characters in `get` selector
 *              - fixed an issue that occurred when performing multiple ajax requests
 * v 1.1.341	- added Spk.text to change or retrieve text from nodes
 * v 1.1.34		- added Bootstrap w/ jQuery dependencies
 * v 1.1.33		- Spk.load will only load modules once
 * v 1.1.32		- Obfuscation efforts added, this is a marker in case we need to jump back
 * v 1.1.31		- Spk now has getRGB(a) and getHex to handle color conversions
 * v 1.1.30		- Spk modules can now be loaded anywhere on the document
 * v 1.1.26		- updated for IE
 * v 1.1.25		- updated enableArbiter
 * v 1.1.24		- added Spk.clientHeight and Spk.clientWidth crossbrowser scrollbar free dimensions
 * 				- fixed an issue that occured when trying to remove event listeners with Spk.unbind
 * v 1.1.23		- updated nodeManage node.romString return value
 * v 1.1.22		- updated cue, cue can be concurrently called after Spk is loaded
 * v 1.1.21		- added remove to Spk.event to remove all listeners from element
 * v 1.1.2		- deprecated clearElement for clearNode
 * v 1.1.19		- many updates to event handling, no longer places public 
 * 				  event properties or markers
 * v 1.1.18		- updated nodeManager call to node.fromString and iterator
 * v 1.1.17		- updated objectArray, objectArrayKeys to be able to count "all" properties
 * v 1.1.16		- load updated to initiliaze modules automatically after loadComplete
 * v 1.1.15		- updated node append after before prepend, with nodeManager
 * v 1.1.14		- Spk.local.query now holds the query string from HTTP requests
 * v 1.1.13		- added "source" option for settings to set a custom repository
 * v 1.1.12		- updated configuration layout and default settings
 * v 1.1.1		- Spk.src, Spk.jQuerySrc - DEPRECATED ! - use Spk.load instead
 * v 1.1.095	- Spk can be extended and modules can be ignited after loading!
 * v 1.1.0941	- ajax requests now send the X-Requested-With
 * v 1.1.094	- added cue to alow someone to cue a simple function to run at domReady
 * v 1.1.0936	- updated device detection method
 * v 1.1.0935	- updated get filter for retrieving tag names from element list objects
 * v 1.1.0922	- updated event handling to provide preventDefault support for ie
 * v 1.1.0921	- updated event handling to handle custom events and mouseleave, mouseenter
 * v 1.1.092	- updated event handling to properly unbind specific functions
 * v 1.1.091	- updated extension detection, and burn call
 * v 1.1.090	- added IE support
 * v 1.1.089 	- fixed compatibility issue with event for ie6-8
 * v 1.1.088	- introduced trace - will trace arguments.callee.caller on error
 * v 1.1.087	- added node.fromString to returna nodeset from string or
 * 				  array of strings
 * v 1.1.086	- added prepend, append, before, after helper functions
 * v 1.1.085	- Spk.event method structure has been updated
 * v 1.1.084	- Spk.event can now be called to simulate events
 * v 1.1.083	- node has been updated to support adding text to elements
 * 				  via node(elem, text) if there is no need for caching a
 * 				  reference to the text object
 * v 1.1.08		- AJAX now supports POST method
 * v 1.1.079	- event.bind now works for multiple event types on multiple objects
 * v 1.1.078 	- updated AJAX functionality 
 * v 1.1.077	- minor changes to synchronous loaded Spk ignite function,
 * 				  fixed issue where Spk was not burning properly
 * v 1.1.076	- major change to Spk.node, to incorporate element creation
 * 				  caching with Spk.set, Spk.get('text','something to say');
 * v 1.1.075	- added set option, to provide global caching of 
 * 				  HTMLElement creation and easy way to set attributes
 * 				  on multiple elements at once
 * v 1.1.074	- minor changes
 * v 1.1.072	- added device detection Spk.device
 * v 1.1.071	- added styling shortcut Spk.style....minor fixes
 * v 1.1.06 	- can now bind and unbind multiple events to a single object
 * v 1.1.05 	- minor fixes
 * v 1.1.03		- added support for extending the Spk prototype object
 * v 1.1.02		- added objectClone, objectProps deprecated fully deprecated
 * v 1.1.01		- added get, a dom element selector
 * v 1.0.92		- added prioritization to source extension modules
 *				  aka SpkMods over local when loading
 * v 1.0.91		- added clearChildren and clearNode
 * v 1.0.81		- deprecated objectProps for objectArray
 * v 1.0.8		- added event handler control	
 * v 1.0.72		- updated licensing
 * v 1.0.71		- updates to security, footprint, and fixed SpkLock state
 * v 1.0.7		- Spk receives major tune-up
 * v 1.0.6		- Spk.settings.images will now run image preloader
 * v 1.0.5		- a[SpkConfig].get('item',1) will now return null if not set
 * todo
 * v 1.0.4		- Can now asynchronously load Google's jsapi and some APIs
 * v 1.0.5		- Major changes to overall security and closures
 * v 1.0.4		- Simplified Spk initialization methods
 *				- Config method will return default if exists
 *				  when request is not found
 * v 1.0.3		- Fixed objectProps() & objectLength()
 * v 1.0.2		- Major improvements to load timings
 * v 1.0.1		- Added htmlEncode & htmlDecode functions
 *
 */
//SPK initialization;
(function (w) {
	/*
	"use strict";
	console.log('=========================================');
	console.log('----------STRICT MODE ENFORCED-----------');
	console.log('=========================================');
	*/
	//if self dev is set and 1 then
	//we are developing else = 0
	self.dev = self.dev || 0;

	//debug messenger
	var dbg = function (msg){console.log(msg)};

	//bind shortcut to dbg function
	self.dbg = dbg;


	//Start main sequence
	//set time the app started to calculate load time
	var a,
	startTime = 0,
	//storage for Spk.settings
	spkSettings = null,
	settings,
	//keep track of loaded module components
	com = {},
	setRepositoryLocation,
	SpkProto = 'prototype',
	SpkConfig = 'config',
	ignite = 'ignite',
	bind = 'bind',
	load = 'load',
	local = 'local',
	event = 'event',
	style = 'style',
	getStyle = 'getStyle',
	objectClone = 'objectClone',
	addScript = 'addScript',
	node = 'node',
	get = 'get',
	htmlEncode = 'htmlEncode',
	htmlDecode = 'htmlDecode',
	extend = 'extend',
	parseJSON = 'parseJSON',
	sitename = 'sitename',
	getInstance = 'getInstance',
	windowLoaded = 'windowLoaded',
	clearChildren = 'clearChildren',
	clearNode = 'clearNode',
	//DEP***
	objectProps = 'objectProps',
	//NEW**
	objectArray = 'objectArray',
	objectArrayKeys = 'objectArrayKeys',
	objectLength = 'objectLength',
	getScript = 'getScript',
	google = 'google',
	googleLT_ = 'googleLT_',
	googleLoaderReady = 'googleLoaderReady',
	filter = 'filter',
	indexOf = 'indexOf',
	getAlphaColor = 'getAlphaColor',
	getRGB = 'getRGB',
	getHex = 'getHex',
	getJSON = 'getJSON',
	clientWidth = 'clientWidth',
	clientHeight = 'clientHeight',
	previousElement = 'previousElement',
	nextElement = 'nextElement',
	hasChild = 'hasChild',
	fromString = 'fromString',
	attrUnset = 'unset',
	bootStrap = 'bootstrap',
	set = 'set',
	//override
	spkOverride = false,
	//keeps track of loaded spks
	onReady = {},
	//keeps list of modules waiting to be initialized
	//with init() through showStage()
	onInit = [],
	//cue is called in burn right before body is shown
	_cue = [],
	cue,
	processCue,
	//whether or not Spk is loaded
	loaded = false,
	showStage,
	//shortcut for time
	benchmark = (function () {
		var n, 
		d = function (){return new Date().getTime()},
		get = function (n) {
			var time = d() - startTime;

			if (void 0 !== n && n === 1) {
				//return seconds
				return Math.round(time / 10)/100 + ' seconds'
			}
			return time
		};

		//set startTime
		startTime = d();
		
		return get		
	}()),
	trace = function (args) {
		console.log(args.callee.caller.toString())
	},
	device = false,
	browser = (function () {
		//force lowercase
		var user = w.navigator.userAgent.toLowerCase(),
		//list of agents to check for
		agents = [
			'chrome', 
			'firefox', 
			'msie', 
			'safari', 
			'opera'
		],
		//match device brands
		reg = 'android|avantgo|blackberry|bolt|boost'
		+ '|cricket|docomo|fone|hiptop|mini|mobi'
		+ '|palm|iphone|ipad|pie|tablet|up.browser'
		+ '|up.link|webos|wos';

		//set device
		device = (device = user.match(reg)) && device.pop() || false;

		//change html className when DOM Loaded
		if (device) {
			//add to cue
			document.documentElement.className += ' device ' + device;
		}

		for(var i = 0; i < agents.length; i++) {
			if (user.search(agents[i]) >= 0) {
				return agents[i]
			}
		}
	}()),
	//ie version
	ieVersion = (function () {
		var rv = -1; // Return value assumes failure.
		if (browser === 'msie') {
			var ua = navigator.userAgent;
			var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
			if (re.exec(ua) !== null)
				rv = parseFloat( RegExp.$1 );
		}
		return rv;
	}()),

	//creates Spk from Spk
	createSpk = (function () {		
		var set = 0,
		//build Core i.e. SPK and return
		buildCore = function (a) {
			//a.set = set;

			//set core Spk|||SPK|||
			self[a.c] = function (b) {
				dbg('Spk > creating the core');
				//on runtime or no value entered
				if (a.set && (void 0 === b || null === b || (b.hasOwnProperty('length') && ! b.length))
					|| ! a.set && (void 0 !== b || void 0 === a.i || a.i === null || 
						(a.i.hasOwnProperty('length') && ! a.i.length))) {			
					this.__proto__ = null;
					return null;
				}
				else if ( ! set) {
					//check for settings and store until Spk has been read
					if ( void 0 !== self[a.i] && null !== self[a.i] && typeof self[a.i] === 'object'
					   	&& void 0 !== self[a.i].settings && null !== self[a.i].settings 
						&& typeof self[a.i].settings === 'object' ) {
						//store settings
						spkSettings = self[a.i].settings;
						//unset Spk
						self[a.i] = null;
					}
					set = 1;
				}
			};

			//return core Spk
			if ( ! set) {
				//set spk mod container
				self[a.m] = {};
				//set spk override methods
				spkOverride = g.o;
			}
			return self[a.c];
		};

		return buildCore;
	}()),
	
	//load core Spk and prototype
	core = (function () {
		var x = function (a) {
			//create Spk from SPK
			self[a.i] = new self[a.c];
			//unset the SPK constructor
			self[a.c] = null;
			//delete self[a.c];
			//unset Spk creation method
			createSpk = null;

			//return new instance
			return self[a.i];	
		};	
		//return private function
		return x;
	}()),
	
	//returns object instance name reference
	createDefinedNames = (function (a,b,c) {
		var a,b,c,o = (function () {
			return {i:a, m:b, c:'__'+c+'_'+startTime};
		});
		a = o();
		o = null;
		return a;
	}),
	//override
	g = {o:1},	
	//set shortcut reference for ambiguity
	spkDefinedNames = createDefinedNames('Spk','spk','SPK'),

	//force createDefinedNames to unset
	createDefinedNames = null,

	//bring in the body
	stageSet = false,
	//get the main SPK instance @ Spk
	//and bind a reference to it's prototype
	//so that we can build on it	
	a = createSpk(spkDefinedNames)[SpkProto];


	/* ------ Add to the Spk prototype object ------ */
	//bind benchmark function
	a.benchmark = benchmark,
	a.getTime = function (whole) {
		if (void 0 === whole) {
			whole = false
		}
		var time = new Date();
		return whole
		? time.getTime()
		: Number(time.getTime().toString().slice(0, 10))
	},
	//set name
	a.name = spkDefinedNames.i,
	//bind startTime
	a.startTime = startTime,
	a[windowLoaded] = false,
	//set window!
	a.win = w,
	//set the document in the window
	a.doc = a.win.document,
	a.browser = browser,
	a.device = device,
	a.ieVersion = ieVersion;

	var showStage = function () {
		dbg('Spk > showStage initiated');
		//show body all at once
		a.body.style.visibility = 'visible';

		//bind simple jQuery caching to typical large objects
		if (a[SpkConfig].get('usejQuery')) {
			a.$D = $(a.doc);
			a.$B = $(a.body);
			a.$W = $(a.win);
		}
		
		//initializes all loaded, bound, and executed sparks
		initializeSparks()
	},
	//run once window has loaded
	burn = function () {
		dbg('  ---  ---  Window loaded  ---  ---  ' + a.benchmark(1));
		dbg(' ---- Switching to loaded enviornment ---- ');
		//set document body and force className on documentElement
		

		//shortcut to body know that we know it's there
		a.body = a.doc.body;
		
		//set windowLoaded if !windowLoaded
		a[windowLoaded] = true;

		//make sure stage is set or wait for it to setStage
		if (stageSet) {
			dbg('Spk>  stage is set! -- calling showStage from _W.onload');
			showStage()
		}	

		//run and unset
		burn = null;	
	};

	
	//TODO - figure out exactly what is going on
	//on DOMContentLoded
	(function () {

		var done = false,
		//used to be top
		pot = true,
		doc = a.doc,
		root = doc.documentElement,
		add = doc.addEventListener ? 'addEventListener' : 'attachEvent',
		rem = doc.addEventListener ? 'removeEventListener' : 'detachEvent',
		pre = doc.addEventListener ? '' : 'on',

		init = function (e) {
			if (e.type === 'readystatechange' && doc.readyState !== 'complete') 
			{
				return
			}
			(e.type === 'load' ? a.win : doc)[rem](pre + e.type, init, false);
			if (!done && (done = true)) {
				burn();
			}
		},

		poll = function () {
			try {
				root.doScroll('left')
			}
			catch(e) {
				a.win.setTimeout(poll, 1); 
				return
			}
			init('poll');
		};
	

		if (doc.readyState === 'complete') {
			burn();
		}
		else 
		{
			if (doc.createEventObject && root.doScroll) {
				try	{
					pot = !a.win.frameElement
				}
				catch(e){}
				if (pot) {
					poll()
				}
			}

			doc[add](pre + 'DOMContentLoaded', init, false);
			doc[add](pre + 'readystatechange', init, false);
			a.win[add](pre + 'load', init, false);
		}

	}());

	//return object instance reference
	a[getInstance] = (function () {
		//creates `Spk` on first run
		//to allow easy reference
		var names = core(spkDefinedNames),
		x = function (moduleName) {
			if (void 0 !== moduleName) {
				if (void 0 === names[moduleName]) {
					throw 'Spk::getInstance > Invalid module name'
				}
				return names[moduleName];
			}
			return names;
		};	
		return x
	}());
		

	//Bind blank constructor to spk
	a[bind] = (function () {
		var c = spkDefinedNames,
		main = function (spkName, spkLazy) {
			var d = spkName,
			e = spkLazy;

			dbg('Spk > binding ' + d);
			//a module must be provided
			if ( void 0 === d || null === d || typeof d !== 'string' ) {
				//no module set....kill
				throw('Spk > Invalid bind request "'+ d + '"')
			}
			else {
				//does the spk and spk.module exist?
				if (void 0 === com[d]) {
					
					dbg('Spk > module "' + d + '" bound to "'+ c.i +'"');			
					//if ( ! onReady[d].extend)
					//{
						//build the module prototype
						com[d] = function (){};
					//}

					com[d].lazy = [];

					//module already loaded check for shortcut override
					if (void 0 !== e && typeof e === 'string') {
						//push lazy reference
						com[d].lazy.push(e);
						//set shortcut in spk mod
						self[c.m][e] = com[d][SpkProto];

						if (void 0 !== onReady[d] && onReady[d].extend) {
							//run once to capture return object
							com[d] = onReady[d].func,
							self[c.i][d] = new com[d]();
							onReady[d] = null;
							delete onReady[d]
						}
					}
				}
				//com[d] exists | mod already set
				else 
				{
					dbg('Spk > _x0955 :: module loaded checking for shortcut @ '+e);
					/*dbg(self[c.m][e]);
					dbg(c.m);
					dbg(e);*/
					//module already loaded check for shortcut override
					if (void 0 !== self[c.m][e] && typeof self[c.m][e] === 'string') {
						//lazy
						var l = com[d].lazy;
						//lazy count
						var lc = l.length;
						//store result
						var res = 0;
						//find a match
						for(var i=0; i <= lc; i++) {
							if (e === l[i]) {
								res = 1;
							}
						}
											
						//check to see if shortcut already set
						if (void 0 === res || spkOverride) {
							//if (self[c.c].override){dbg('Override engaged');}
							com[d].lazy.push(e);
							//set shortcut

							self[c.m][e] = com[d][SpkProto];
						}
						l = null;
					}

				}//else

			}//else

		};//main

		return main

	}());


	/*
	 * load
	 * loads files from their resource locations
	 * and loads / ignites modules from the prototype to the main instance
	 *
	 * @params void
	 * @return function - load
	 */
	a[load] = (function () {
		var that, con,
		firstRun = true,
		module, resourceLocation, useSource,
		c = spkDefinedNames,
		//maintains a list of normal sparks
		spks,
		spksLength = 0,
		//keep a list of loaded spks
		isLoaded = {},
		//keeps track of windowOnload for beforeOnload calls
		windowLoaded = false,
		//count loads to start the loadComplete process	
		loadCounter = 0,
		loadComplete = false,
		//the main loading function
		registerModule = function (module) {
			//dbg(isLoaded);
			dbg('Spk::Load > Validating module "' + module + '"');
			//Ignite / c for beforeOnload callsall
			if (typeof module !== 'string') {
				dbg('_x0953');
				throw this.name + ' Invalid request!'
			}
			else {
				//does the object's method exist?
				if (void 0 !== com && void 0 !== com[module] && typeof com[module] === 'function') {
					//spk new module onto Spk(instance).module
					self[this.name][module] = new com[module]();
					//get lazy reference
					var l = com[module].lazy,	
					//lazy count
					lc = l.length;

					//unset shortcut references
					com[module] = null;
					delete com[module];	
					
					//loop through lazy references and 
					for(var i=0; i <= lc; i++) {
						//we DON'T delete the `spk` object so users can
						//continue to add more modules after load
						self[c.m][l[i]] = null;
					
						//unload spk.`lazy` reference
						delete self[c.m][l[i]];
					}

					//unset reference for cleanliness
					l = null;
					lc = null;

					//if we haven't already loaded everything
					//unload module
					dbg('Spk > deleting prototype @' + module);
					delete com[module];

					//set name
					this[module].name = module;
					//set as loaded
					isLoaded[module.toLowerCase()] = true;
					//increase counter
					loadCounter++;

					//if there is an init function....set it
					if (void 0 !== this[module].init && typeof this[module].init === 'function') {
						//automatically intialize
						if (stageSet) {
							dbg('Spk > initializing ' + module);
							//hook prior to initialization
							processCue();
							this[module].init()
						}
						else {
							dbg('Spk > storing init function for ' + module);
							//store init in ready variable
							onInit.push(module)
						}
					}

					//if all have been loaded
					if ( ! loadComplete && isLoaded.length === spksLength && loadCounter === spksLength) {
						//everything has beeen loaded
						dbg('===============CLOSING SPK PROTO============== ' + a.benchmark(1));

						//now set load complete
						loadComplete = true
					}
					
					return true
				}

				dbg('Load Invalid > ' + module);
				return false	
			}//end

		},
		//end registerModule

		//count the plugins
		jQueryModuleLoader = (function () {
			var jQcounter = 0;

			return function (src, useSrc) {
				jQcounter++;
				dbg('attempting to load jq component: '+ src);
				
				var url;

				if (src.search(/bootstrap/i) >= 0) {
					url = (useSrc)
					? con.get('jQueryLocation').src + src + '.js'
					: con.get('jQueryLocation').local + src + '.js';
				}
				else {
					//build url
					url = (useSrc)
					? con.get('jQueryLocation').src + 'jquery.' + src + '.js'
					: con.get('jQueryLocation').local + 'jquery.' + src + '.js';
				}

				//get the script
				a[getScript](url);
		
				//if we have called to load all jQuery coms
				if (jQcounter === settings.get('jQueryComLength')) {
					//set jQueryComCalled
					//if jQueryLoaded -> then lets add the plugin components
					//otherwise we will wait for jQueryLoaded
					settings.set('jQueryComCalled', true);
				}
			}
		}()),
		spkModuleLoader = function (loc, useSrc) {
			//override location just in case
			var file = loc + '.js',
			//set main dir objects
			//if we a re loading from local
			dir = con.get('spkLocation'),
			//set the location
			url = useSrc ? dir.src + file : dir.local + file;
			//create result array
			a[getScript](url);
		};



		/* 
		 * load
		 * return function for load
		 * will load modules with name alone or will
		 * load files from their resource locations
		 *
		 * @params string - basename of file
		 * @params string - location of retrieval
		 * @params boolean - should we use the source 'src' location?
		 * @return void
		 */
		return function (module, resourceLocation, useSource) {
			if (firstRun) {
				firstRun = false,
				spksLength = settings.get('spksLength');
				con = a[SpkConfig],
				that = a.getInstance()
			}

			//create new regular expression to match
			if (void 0 !== isLoaded[module.toLowerCase()]) {
				throw new TypeError('Spk::load > ' + module + ' has already been loaded');
				return
			}
			else if (void 0 !== resourceLocation) {
				//useSource defaults to false and uses local
				if (void 0 === useSource) {
					useSource = false
				}

				//process location
				switch(resourceLocation) {
				//load Spk Modules
				case 'spk':
					spkModuleLoader(module, useSource);
					return;

				//load jQuery modules
				case 'jQuery':
					jQueryModuleLoader(module, useSource);
					return;

				//end on error
				default: 
					throw 'Spk::Load > Invalid location'
				}
			}

			dbg('Spk > loading spk :: ' + module);
			//attempt to load, error? or fail silently?
			if ( ! registerModule.call(that, module)) {
				throw new TypeError('Spk::load > Invalid request module')
			}

		}
	}()),
	//end of load
	
	//default settings object
	a[local] = (function (){
		var local = {};
		for(var n in w.location) {
			local[n] = w.location[n]
		}	
		local['queryString'] = w.location.search.length ? w.location.search.substr(1) : '';
		local['query'] = null;
		if (local['queryString'].length > 0) {
			var queryObject = local['query'] = {},
			str = local['queryString'].split('&');

			for(var i = 0; i < str.length; i++) {
				var name = str[i].split('='),
				val = name.pop();
				//bind to object for easy access
				queryObject[name] = val;
			}

		}
		return local
	}());

	//a.local.sitename fix for ie
	if (void 0 === a[local].origin) {
		a[local].origin = a[local].protocol + '//' + a[local].host
	}
						
	//get the sitename
	a[local][sitename] = (function () {
		var hostname = a[local].host;
		if (self.dev) {
			return hostname
		}
		hostname = hostname.split('.');
		return hostname.splice(hostname.length-2,1);
	}());

	/*
	 * ajax
	 *
	 * provides support to AJAX requests 
	 * expects object with following parameters:
	 *
	 * + method		- (optional, default=GET, assumes POST with data)GET or POST
	 * + action		- (required) the url action to place
	 * + data		- (optional, POST) data
	 * + error		- (optional) error handler
	 * + complete - (optional) function to call once ajax has
	 *   			  completed, will extend request object as this
	 * + async		- (optional, default=false) asynchronous ajax
	 */
	
	//runs ajax request
	var _ajax = (function () {
		var valid = ['method', 'action', 'data', 'complete', 'error', 'async'],
		contentType = 'Content-type',
		formContentType = 'application/x-www-form-urlencoded';

		//async is optional if args passed as string
		return function (args, async) {
			var	t = this;

			t.method = 'GET',
			t.async = true,
			t.data = null,
			t.action = '',
			t.complete = null,
			t.error = null;

			//return new ajax request object
			if (void 0 === args) {
				return t.createRequest();
			}
			
			
			switch(typeof args) {
			case 'string':
					//string
					dbg('ajax shortcut request received');
					if (void 0 !== async) {
						t.async = async ? true : false;
					}
					t.action = args;					
					return t.getURL();
				break;

			case 'object':
				for(var n in args) {
					/*if (a.indexOf(n, valid) < 0) {
						throw 'Spk > Invalid ajax request parameter @' + n;		
					}*/
					//apply new setting
					t[n] = args[n];
				}

				var res = t.createRequest();

				if (void 0 !== t.complete) {
					res.complete = t.complete
				}
				if (void 0 !== t.error) {
					res.error = t.error
				}
			
				try {
					res.open(t.method.toUpperCase(), t.action, t.async)
				}
				catch(err) {
					throw 'Spk > Invalid ajax method, expecting url'
				}

				if (t.data !== null) {
					t.data = t.objectData(t.data)
				}

				//set request headers for ajax
				res.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
				//set request headers to force use of form as content-type
				res.setRequestHeader(contentType, formContentType);

				try {
					res.send(t.data)
				}
				catch(err) {
					throw 'Spk > Invalid AJAX post data, expecting object'
				}

				//throw 'has not been finished prgoramming';
				break;
			}
			//end switch		
		}
	}()),
	ajax = _ajax[SpkProto];

	//bind ajax to primary SPK.prototype
	a.ajax = (function (args, async) {
		return new _ajax(args, async);
	}),
	ajax.error = function (msg) {
		throw('AJAX Error > '+msg);
	},
	//create a string from an object to
	//send as post data
	ajax.objectData = function (obj) {
		var str = '';
		for(var n in obj) {
			str += n + '=' + a.win.encodeURIComponent(obj[n]) + '&'			
		}
		str = str.substr(0, str.length - 1);
		return str
	},
	//returns a new request XMLHttpRequest object
	ajax.createRequest = (function () {
		var t,
            requestObject = function () {
                if (a.win.XMLHttpRequest) {
                    return new XMLHttpRequest();
                } else {
                    return new ActiveXObject('Microsoft.XMLHTTP');
                }				
            };
            
			

		return function () {
			t = this;
            var req = requestObject();
            //set ready and call copmlete if exists
            req.onreadystatechange = function () {
                if (req.readyState === 4 && req.status === 200) {
                    if (void 0 !== req.complete && typeof req.complete === 'function') {
                        //call the complete function with req extended
                        req.complete.call(req)
                    }
                }
            };
			return req;
		}
	}()),

	//retrieves a single file via url and GET
	ajax.getURL = function () {
		dbg('getting url @' + this.action);
		var t = this,
		request = t.createRequest();

		if (void 0 !== t.complete) {
			request.complete = t.complete
		}


		//build request
		request.open(t.method, t.action, t.async);
		request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
		//request.setRequestHeader('HTTP_X_REQUESTED_WITH', 'XMLHttpRequest');
		//request.setRequestHeader('Expires','-1');
		//request.setRequestHeader('max-age','[3600]');
		request.send();
		//if we asynchronmously grabbing the file then
		//we need to check if we should bind an event listener to the object
		
		//this.reset();
		return request;
	};
	
	

	//create configuration template
	var config = (function () {
		var con,
		initialize = false;

		return function (obj) {

			//on first run return new config
			if ( ! initialize ) {
				initialize = true;
				con = new config(obj);
				con.get = con.get.call(con);
				con.set = con.set.call(con);
				con.reset = con.reset.call(con);
				return con
			}

			//reset x
			initialize = false;

			if (void 0 === obj) {
				obj = {}
			}
			else if (typeof obj !== 'object') {
				throw 'invalid object _x0954'
			}

			//the user config
			this.config = {},
			//the default config
			this.proto = obj;
		};
	}());
	//prototype is the default config
	//options that we can always revert to
	var conProto = config[SpkProto] = {};
	
	//reset to mixed defaults,
	//this will be different than clear/delete
	//if we do those
	conProto.reset = (function () {
		var that = this;
		return function () {			
			//new object, proto saves defaults
			that[SpkConfig] = {}
		}
	}),		
	//retrieves a config option
	//(checking)where: config or proto
	//currently returns where === both
	conProto.get = (function ()	
	{
		var that = this,
		returnNull = false,
		where;
		
		return function (name, where) {
			//default 
			if (void 0 === where) {
				where = 'both'
			}				
			//set returnNull
			else if (where === 1) {
				where = 'both',
				returnNull = true
			}
			//if where was set but not valid 
			else if (where !== SpkConfig && where !== 'proto' && where !== 'both') {
				throw 'invalid configuration _x0952';
				return
			}
			//if name is not specified,
			//return full config list
			if (void 0 === name) {
				var obj,
				store = that.proto;
			
				//overwrite any default set values	
				for(obj in that[SpkConfig]) {
					store[obj] = that[SpkConfig][obj];
				}
				
				where = null;
				returnNull = false;
				return store					
			}
			//check for altered setting first
			else if ((where === 'both' || where === SpkConfig) && void 0 !== that[SpkConfig][name]) {
				where = null;
				returnNull = false;
				//dbg('Config : getting > ' + name);
				return that[SpkConfig][name]
			}
			//check for default setting last
			else if ((where === 'both' || where === 'proto') && void 0 !== that.proto[name]) {
				where = null;
				returnNull = false;
				return that.proto[name]
			}
			else {
				where = null;
				if (returnNull) {
					//reset returnNull
					returnNull = false;
					return null
				}
				//dbg('Config > could not find configuration! @ ' + name);
				//default return false
				return false
			}
		}
	}),
	//sets a config option 
	conProto.set = (function () {
		var that = this;
		return function (name, value, override) 
		{
			//override the proto setting
			if (void 0 !== override && override) {
				that.proto[name] = value;
				return
			}
			//we set twice in case we are comparing
			that[SpkConfig][name] = value
		}
	});


	//create public and private configurations
	(function () {
		//set the users local Spk location
		var localSrc = a[local].origin + '/',
		//set the spk location
		spkSrc = 'http://s1.sparkida' + (self.dev ? '' : '.com') + '/src/',
		//js dir
		jsSpk = 'js/spk/',
		//jQuery repository
		jqLoc = 'js/jquery/',
		//set resource locations
		spkLocation = {
			//source location
			src: spkSrc + jsSpk,
			//local location
			local: localSrc + jsSpk
		},
		//set src jQuery components location
		jQueryLocation = {
			//source location
			src: spkSrc + jqLoc,
			//local location
			local: localSrc + jqLoc
		},
		//seperate private config from public
		privateSettings = {
			//whether or not we are using the components
			jQueryUseCom: false,
			//the latest version from google apis
			jQueryLatest: '1.9.1'
		},
		//these can be controlled by the user
		publicSettings = {
			//spk Arbiter will check Spk to make sure it hasn't been deleted
			enableArbiter: false,
			//stored images for preloader
			images: [],
			//set custom local source
			source: '',
			//store reference to spk mods 
			spks: {
				src: [],
				local: []
			},
			//jQuery components
			jQueryCom: {
				src: [],
				local: []
			},
			//set main spk location
			spkLocation: spkLocation,
			jQueryLocation: jQueryLocation,
			//should we use any google API's?
			useGoogleAPI: false,
			//the google apis to load
			googleLoad: [],
			//are we using bootstrap?
			useBootstrap: false,
			//are we using jQuery?
			usejQuery: false,
			//our most stable jQuery version
			jQueryVersion: '1.8.1'
		};

		//establish the ability to change the repository for local
		setRepositoryLocation = function (repo) {
			//last character a forward slash?
			if (repo[repo.length - 1] !== '/') {
				repo += '/'
			}
			
			spkLocation.local = repo + jsSpk,
			jQueryLocation.local = repo + jqLoc,

			//set and override proto
			a[SpkConfig].set('spkLocation', spkLocation, 1),
			//set and override proto
			a[SpkConfig].set('jQueryLocation', jQueryLocation, 1)
		};

		//create private settings
		settings = new config(privateSettings);
		//create public settings
		a[SpkConfig] = new config(publicSettings);

	}());

	//run initilization
	var buildGoogle = function () {
		//set location
		var googleAPILoc = '//www.google.com/jsapi',
		///googleCustomLoader = '//s1.sparkida/src/js/spk/googleLoader.js',
		googleLoad = a[SpkConfig].get('googleLoad'),
		moduleName = null,
		moduleVersion = null,
		moduleSettings = null,
		runLoad = 'load',
		clearSettings = function (){
			moduleName = null,
			moduleVersion = null,
			moduleSettings = null
		},
		loadedModules = [],
		parseAPI = function (googleModule) {
			for(var n = 0; n < googleModule.length; n++) {
				switch(n) {
				//moduleName
				case 0:
					dbg('getting google '+googleModule[n]);
					moduleName = googleModule[n];
					break;

				//moduleVersion
				case 1:
					moduleVersion = googleModule[n];
					break;

				//moduleSettings
				case 2:
					moduleSettings = googleModule[n];
					break;
				}
			}			

			//stack module name on loaded
			loadedModules.push(moduleName);

			//load with module settings
			if (moduleSettings !== null) {
				self[google][runLoad](moduleName, moduleVersion, moduleSettings)
			}
			//load without module settings
			else {
				self[google][runLoad](moduleName, moduleVersion)
			}

			//reset all
			clearSettings()

		};
		//bind googleLoader
		//a.googleLoader = parseAPI;
		//will be set to ready in googleLoader spk
		a[googleLoaderReady] = false;
		//get jsapi script
		a[getScript](googleAPILoc);
		//get googleLoader Spk
		a[load]('googleLoader', 'spk', true);
		//a[getScript](googleCustomLoader, false);
		//set check for jsapi
		//jsapi ready
		var allLoaded = false,
		//will increment by one for each item loaded and reset with counter
		isLoaded = 0,
		check,
		nextCheck,
		APIReady = function () {
			if (void 0 !== self[googleLT_] && a[googleLoaderReady]) {
				a.win.clearInterval(check);
				//DEP * load first then set
				for(var n = 0; n < googleLoad.length; n++) {
					parseAPI(googleLoad[n]);
				}

				var loadedAmount = loadedModules.length,
				nextCheck,
				checkLoaded = function () {
					for(var n = 0; n < loadedModules.length; n++) { 
						//make sure module exists and is greater than 3
						if (void 0 !== self[google][loadedModules[n]]
						&& a[objectLength](self[google][loadedModules[n]]) > 3) {
							//increment by one
							isLoaded++;
							//remove from list
							loadedModules.splice(n,1);
						}
					}

					//if loaded is equal to the original amount loaded
					if (isLoaded === loadedAmount) {
						//clear timer
						a.win.clearInterval(nextCheck);
						//set ready
						settings.set('googleAPIReady', true);	
					}
				},
				
				//interval to check loaded
				nextCheck = a.win.setInterval(checkLoaded, 1);
			}
		},
		check = a.win.setInterval(APIReady, 1);
	},
	//end build google
	
	//buildBootstrap
	buildBootstrap = function () {
		var usejQuery = a[SpkConfig].get('usejQuery');
		//if we aren't using jQuery than force enable it
		if ( ! usejQuery ) {
			a[SpkConfig].set('usejQuery', true)
		}
		//add bootstrap to list of jQueryCom
		a[SpkConfig].get('jQueryCom').src.push('bootstrap');
	},

	
	//buildjQuery
	buildjQuery = function () {
		dbg('init jQuery');
		//get requested components if any
		//if we are using the jQueryCom then create
		//this in the config
		//a[SpkConfig].set('jQueryComSet', false);
		//are we using jQuery components?
		var	jQueryUseCom = false,
		jQueryCom = a[SpkConfig].get('jQueryCom'),
		jQueryComLength = jQueryCom.src.concat(jQueryCom.local).length,
		jQueryUseCom = jQueryComLength ? true : false;
		//force not set, because nothing has loaded, but we 
		//will require access to this soon to ensure all
		//components have been loaded 
		settings.set('jQueryComSet', false);
		//store the length
		settings.set('jQueryComLength', jQueryComLength);
		//and store this as well so we can determine if we
		//should be running any jQuery component based checks
		settings.set('jQueryUseCom', jQueryUseCom);
		//set the length of jQuery components
		//a[SpkConfig].set('jQueryComLength', jQueryComLength);

		//a place to store components
		var version = a[SpkConfig].get('jQueryVersion'),
		src = '//ajax.googleapis.com/ajax/libs/jquery/' + version  + '/jquery.min.js';
		a[getScript](src);
		
		//make jsure we wait for this to finish
		dbg('Spk > loading [jQuery v'+version+'] from Google APIs');
		//Spk.addScript(node);

		//make sure they exist and load
		if (jQueryUseCom) {
			//separate src and local and load
			for(var m in jQueryCom) {
				var useSrc = (m === 'src') ? true : false;
				for(var i = 0; i < jQueryCom[m].length; i++) {
					//load jQuery component
					a[load](jQueryCom[m][i], 'jQuery', useSrc)
				}
			}
		}

		//rewrite to setInterval
		var jQueryLoaded = !1,
		//attempt count	
		ac = 0,
		//attempt limit
		al = 500,
		jQueryLoaded = function () {
			if (void 0 !== self['jQuery'] && typeof self['jQuery'] === 'function') {
				return true
			}
			return false
		},

		timer,
		//create private run functiona
		run = function () {
			dbg('jQuery > attempted load @ '+a.benchmark(1));

			ac++;
			//set timera
			if ( ! jQueryLoaded()) {
				if (ac > al) {
					dbg('CLOSING ATTEMPT');
					a.win.clearInterval(timer);
				}
			}
			else {
				//clear timer
				a.win.clearInterval(timer);
				//loaded
				dbg(' ----- --- > jQuery Loaded!');
				//set jQueryLoaded
				settings.set('jQueryLoaded', true);
			}
		};

		//clear load timer	
		//Spk.doc.documentElement.className += ' mob';
		timer = a.win.setInterval(run, 1);
		//run();
	},
	//end build jQuery
	//enable Arbiter
	enableArbiter = (function () {
		var name = spkDefinedNames.i,
		checkTimer,
		_spk_x = a.getInstance(),
		checker = function () {
			if (_spk_x !== self[name]) {
				dbg('Spk unset -- resetting');
				self[name] = _spk_x
			}
		};

		return function () {
			//run timer to make sure spk is defined
			checkTimer = a.win.setInterval(checker, 250);
		}
	}()),
	preloadImages = function () {
		var images = a[SpkConfig].get('images'),
		newImage = new Image();

		for(var i = 0; i < images.length; i++) {
			newImage.src = images[i]
		}
	},
	readyBurn = function () {
		dbg('__________READY TO BURN__________');
		//all mods have been succesfully loaded
		settings.set('spkReady', true);
		//if total request reached load sparks
		loadSparks();
	},
	//initialize everything
	runSpk = function () {
		dbg('Running the Spk');
		//bind initial settings
		var ini = spkSettings, spk, spks;
		//if no settings override and ignite
		if (ini === null) {
			return readyBurn()
		}

		//mash ini with configuration
		for(spk in ini) {
			//process specifics
			switch(spk) {
			//get jQuery version
			case 'jQueryVersion':
				if (ini[spk] === 'latest') {
					//version is equal to latest than overwrite jQueryVersion
					//with jQueryLatest in the config
					ini[spk] = settings.get('jQueryLatest');
				}
			case 'source':
				//set custom repository
				setRepositoryLocation(ini[spk]);
				break;


			case 'spks':
			case 'jQueryCom':
				//force proper structure
				if ( void 0 === ini[spk].src ) {
					ini[spk].src = []
				}
				if ( void 0 === ini[spk].local ) {
					ini[spk].local = []
				}
				//don't break this since we'll just use default

			default:
				//add init setting to config
				//override proto
				a[SpkConfig].set(spk, ini[spk], 1)
			}

		}


		//are we using google API?
		a[SpkConfig].get('useGoogleAPI') && buildGoogle();
		//we would load jQuery on DOMready but that's silly
		//when the loading can be done asynchronously
		//start loading bootstrap, it won't matter thanks to Spk's ignition sequence
		a[SpkConfig].get('useBootstrap') && buildBootstrap();
		//load jQuery first
		a[SpkConfig].get('usejQuery') && buildjQuery();
		a[SpkConfig].get('images').length && preloadImages();
		//engage arbiter
		a[SpkConfig].get('enableArbiter') && enableArbiter();

		//just fetch regular list
		spks = a[SpkConfig].get('spks');
		
		var spksLength = 0;
		//cycle through local and src spks
		for(var m in spks) {
			var useSrc = (m === 'src') ? true : false;
			//cycle through spks
			for(var i = 0; i < spks[m].length; i++) {
				spksLength++;
				dbg('loading ' + m + ' spk: ' + spks[m][i]);
				a[load](spks[m][i], 'spk', useSrc)
			}
		}

		//if no spks, burn
		if (spksLength === 0) {
			return readyBurn();
		}

		//set the length of stored spks
		settings.set('spksLength', spksLength);


		//unset this 
		runSpk = null;
	},
	
	//cue functions
	cue = function (func){_cue.push(func)},
	//process cued functions
	processCue = function () {
		while(_cue.length > 0) {
			var cueFunc = _cue.splice(0,1)[0];
			if (typeof cueFunc === 'function') {
				try 
				{
					cueFunc()
				}
				catch(cueError) {
					throw 'Spk > Invalid cue function'
				}
			}
		}

		_cue = [];
	},	
	
	//initializes all loaded, bound, and executed sparks
	initializeSparks = function () {
		//process the cue
		processCue();
		//call init functions in mods
		while(onInit.length) {
			var mod = onInit.splice(0,1)[0],
			con = self[spkDefinedNames.i][mod];

			dbg('Spk > Initializing mod "' + mod + '"');
			con.init();
		}
	},
	
	//run any modules that have been bound to the `spk` object
	executeSparks = function () {
		var m, bootstrapName = '';

		for(m in onReady) {
			//not bootstrap
			if (onReady[m].lazy === 'jq') {
				dbg('Spk > jQuery mod "' + m + '" ignited!');
				//load from ready	
				//dbg(onReady[plugins[m]]);
				if (m.search(/bootstrap/i) >= 0) {
					//save name for future reference
					bootstrapName = m
				}
				else {
					onReady[m].func();
					onReady[m] = null;
					delete onReady[m];
				}
			}
		}

		m = null;

		if (a[SpkConfig].get('useBootstrap') && bootstrapName.length) {
			onReady[bootstrapName].func();
			onReady[bootstrapName] = null;
			delete onReady[bootstrapName];
		}

		for(m in onReady) {
			dbg('Spk > module "' + m + '" ignited!');
			onReady[m].func();
			onReady[m] = null;
			delete onReady[m];
			//load will attempt to init we need to hold until stageSet
			a[load](m);
			//that.addScript(that.requests[m]);
		}
	},

	//and run from single instance
	//delete main SPK using it only as shortcut reference
	//while running final event in load.loader
	//self[c.c] = {com:[]};

	//--------------------------------
	// misc methods etc... 
	// these can only be used until 
	// front end has been initialized
	//--------------------------------
	loadSparks = (function () {
		var readyTimer, 
		that, 
		loaderCalled = false,
		setStage = function () {
			dbg(' --------------SETTING STAGE----------------- ');
			dbg(' --- READY --- ' + a.benchmark(1));
			//a.win.clearTimeout(timer);
			//and lastly, show body
			//if window has already been loaded
			// then bring in the body otherwise
			stageSet = true;
			
			if (a[windowLoaded]) {
				showStage()
			}

		},
		ready = function () {
			dbg('Spk > checking if stage is ready');
			a.win.clearInterval(readyTimer);
			readyTimer = null;
			//spks have already been fetched
			dbg('Spk > executing sparks');
			executeSparks();
			//if stage has already been set then
			//skip window load checks and cut 
			//straight to spark initialization
			dbg('Spk > checking stageSet'); 
			if (stageSet) {
				dbg('Spk > stage already set...initializing module');
				initializeSparks()
			}
			else {
				dbg('Spk > ready called in loadsparks');
				setStage()
			}
			dbg('Spk >  -----end-----');
		},
		run = function () {
			//if the stage has already been set goto ready
			if (stageSet) {
				ready();
				return
			}
			else if (loaderCalled) {
				dbg('-----------Loader already called------------');
				return
			}
			else {
				loaderCalled = true
			}

			that = this;
			var usejQuery = a[SpkConfig].get('usejQuery'),
			//are we using jQuery components
			jQueryUseCom = settings.get('jQueryUseCom'),
			//use the google API
			useGoogleAPI = a[SpkConfig].get('useGoogleAPI'),
			//check if jQuery is loaded
			checkjQuery = function (){return settings.get('jQueryLoaded')},
			//check if jQueryCom is called
			checkjQueryCom = function (){return settings.get('jQueryComCalled')},
			//check is google API is ready
			checkGoogleAPI = function (){return settings.get('googleAPIReady')},
			//check if spk is ready
			checkSpk = function (){return settings.get('spkReady')},
			//check the ready state in correlation to timer
			checkReady = function () {
				dbg('checking ready');
				//this is a nice dynamic way to check if whatever is being used
				//is also ready to be used, i.e. if something isn't used then false
				//will equal false :: (false === false) :: and result in true
				if ((usejQuery === checkjQuery()) && (jQueryUseCom === checkjQueryCom()) &&
				(useGoogleAPI === checkGoogleAPI()) && checkSpk()) {
					dbg('<<<!We are ready to BURN!>>>');
					ready()
				}
			};
			//check if ready 
			readyTimer = a.win.setInterval(checkReady, 1)
		};
		//and run the shtufff
		return run
	}());



	/* extends
	 * extend Spk with Spk.name = method */
	a[extend] = function (name, method) {
		dbg('Spk::extend > Extending module ' + name);
		//bind resulting function to Spk
		a[name] = method();
		//ignite with name?
		a.ignite(name, 'SPK_API_EXTEND')
	},

	/*
	 * ignite
	 * will store jSONP object requests that were made
	 *
	 * @return function
	 *
	 * @params string
	 * @params string
	 * @params object|function
	 * @params bool
	 *
	 * @return void
	 */
	a[ignite] = (function () {
		var x = true,
		//ignite specific counter
		counter = 0,
		useExtend = false,
		//count all sparks
		spkCount;


		return function (spkName, spkLazy, spkFunc, extend) {
			if (void 0 === spkName || typeof spkName !== 'string' || ! spkName.length) {
				throw 'Spk > Invalid ignite name'
			}
			else if (spkLazy === 'SPK_API_EXTEND') {
				useExtend = true
			}

			//only run once
			if (x) {
				var modules = a[SpkConfig].get('spks'),
				//if we are using jq coms then this will be true
				jqCom = [];

				//concatenate the src modules with the local ones
				modules = modules.src.concat(modules.local);
				//are we using jQuery mod? if so then make sure
				//we get jq components as well
				if (a[SpkConfig].get('usejQuery')) {
					//get mods
					jqCom = a[SpkConfig].get('jQueryCom');
					jqCom = jqCom.src.concat(jqCom.local);
				}

				//kill init
				x = true;
				//set main spks
				modules = modules.concat(jqCom),
				spkCount = modules.length,
				igniteCom = null
			}


			//if already loaded
			if (void 0 !== loaded[spkName]) {
				throw "Mod " + spkName + " has already been loaded. Request Denied";
				return;
			}


			//if googleLoader, just run the function and return
			if (spkName === 'googleLoader') {
				//store function
				var runGoogleLoader = spkFunc,
				googleCheckTimer = null,
				googleCheck = function () {
					//check to make sure google is loaded
					if (void 0 !== self.google && typeof self.google === 'object') {
						a.win.clearInterval(googleCheckTimer);
						runGoogleLoader();					
						a.googleLoaderReady = true
					}
				};

				googleCheckTimer = a.win.setInterval(googleCheck, 1);
				return		
			}
			

			/*only increase counter for known modules that
			*were provided in the settings during intitialization*/
			for(var i = 0; i < spkCount; i++) {
				if (modules[i].toLowerCase().search(spkName.toLowerCase()) >= 0) {
					//increase counter by one
					counter++;
					//break loop
					break
				}
			}


			/* Since extended functions are directly extended,
			 * we will only store modules that are not */
			if ( ! useExtend) {
				//store loaded mod in the ready object
				onReady[spkName] = {
					lazy: spkLazy,
					func: spkFunc,
					extend: (void 0 === extend || ! extend) ? false : true
				};

				dbg('Spk > * Ignited ' + spkName + ' ...awaiting burn *');

				//ready the mods early for stacking
				//if this is a jQuery component then skip bind
				if (spkLazy !== 'jq') {
					//bind and ready module
					a[bind](spkName, spkLazy);
					//bind all modules, and wait for main loader to get triggered?
				}
			}
			else {
				//and disable useExtend
				useExtend = false;
			}
			
			//if counter === to spks then run everything
			if (counter >= spkCount) {
				//if already burned?
				if (settings.get('spkReady')) {
					loadSparks()
				}
				else {
					dbg('...burn ready!');
					readyBurn()
				}
			}
			
		};
	}()),


	//getScript will append script tag to header
	//with src and optional async:: default false
	a[getScript] = function (src, async) {
		//determine queryString
		var src,
		bool = Spk.win['Boolean'],
		proto = src.split('://'),
		//split by slash and remove empty parts(ie<9)
		parts = a.filter(proto.pop().split('/'), bool),
		basename = parts.pop(),
		version = basename.search(/\?v=/) >= 0 ? basename.split('?') : '';
		
		//set the version and trim the added .js extension if any
		if (version.length > 0) {
			basename = version[0];
			version = version.pop();

			//return substr if version has an added extension
			if (version.search(/\.js/) >= 0) {
				version = version.substr(0, version.length - 3)
			}
			//set new src
			src = proto + '://' + parts.join('/') + '/' + basename + '?' + version			
		}

		dbg('Spk::getScript > script request received: ' + src);

		var script, src, async;
		if (void 0 === src || ! src || ! src.length) {
			throw Error("getScript: Invalid src > " + src)
		}
		//force async 
		async = (void 0 === async || async) ? true : false;
		script = a[node]('script');
		script.src = src;
		script.async = async;
		//and append to head
		a.addScript(script);
	},

	//returns an array of object properties
	a[objectArray] = function (obj, all) {
		var o,
		arr = new Array(),
		//we need to check if it is an object to confirm Object specific
		//properties "hasOwnProperty" and "propertyIsEnumerable"
		isObject = (obj instanceof Object),
		//either object or HTMLCollection/nodeList
		nodeList = (void 0 !== obj.item && (void 0 !== obj.length && typeof obj.length === 'number'));

		if ( ! isObject && ! nodeList) {
			throw Error('Spk::objectArray > Invalid Object @' + obj)
		}

		if (all) {
			for(o in obj) {
				arr.push(obj[o])
			}
		}
		else {
			for(o in obj) {
				if ((isObject && ! nodeList) && obj.hasOwnProperty(o) && obj.propertyIsEnumerable(o)) 
				{
					arr.push(obj[o])
				}
				else {
					if (o === 'length' || o === 'item' || o === 'namedItem') {
						continue
					}
					arr.push(obj[o]);
				}
			}
		}
		return arr
	},

	//returns an array of object keys
	a[objectArrayKeys] = function (obj, all) {
		var o,
		//keep count in case of nodeList
		arr = new Array(),
		//we need to check if it is an object to confirm Object specific
		//properties "hasOwnProperty" and "propertyIsEnumerable"
		isObject = (obj instanceof Object);
		//we don't process nodeList for arrayKeys as it would be pointless

		if ( ! isObject) {
			throw Error('Spk::objectArrayKeys > Invalid Object @' + obj)
		}

		if (all) {
			for(o in obj) {
				arr.push(o)
			}
		}
		else {
			for(o in obj) {
				if (obj.hasOwnProperty(o) && obj.propertyIsEnumerable(o)) {
					arr.push(o)
				}
			}
		}
		return arr
	},

	/*
	 * returns the length of an object
	 * @param object
	 * @param bool
	 */
	a[objectLength] = function (obj, all) {
		var n = null,
		count = [];
		if (all) {
			for(n in obj) {
				count.push(n)			
			}
		}
		else {
			for(n in obj) {
				if (obj.hasOwnProperty(n) && obj.propertyIsEnumerable(n)) {
					count.push(n);
				}
			}
		}
		return count.length
	},

	//return a clone of the object or clone a nodeList/HTMLCollection
	a[objectClone] = function (obj) {
		var o,
		n = {},
		//we need to check if it is an object to confirm Object specific
		//properties "hasOwnProperty" and "propertyIsEnumerable"
		isObject = (obj instanceof Object),
		//either object or HTMLCollection/nodeList
		nodeList = (void 0 !== obj.item && (void 0 !== obj.length && typeof obj.length === 'number'));

		//if it's not an object or a nodeList than error
		if ( ! isObject && ! nodeList) {
			throw Error('Spk::objectClone > Invalid Object @' + obj)
		}
	
		for(o in obj) {
			if ((isObject && ! nodeList) && obj.hasOwnProperty(o)) {
				n[o] = obj[o]
			}
			else {
				if (o === 'length' || o === 'item' || o === 'namedItem') {
					continue
				}
				//clone all nodes
				n[o] = obj[o].cloneNode(1);
			}
		}

		return n
	},


	/*
	 * attempts to parse JSON data into JS object
	 * @param string
	 * @return object | bool
	 */
	a[parseJSON] = function (json) {
		var data = false;
		try 
		{
			data = JSON.parse(json)
		}
		catch(err) {
			dbg('error parsing JSON data')
		}
		return data;
	},

	//appends script to head
	a[addScript] = (function () {
		var h = a.doc.getElementsByTagName('script')[0];
		return function (s) {
			h.parentNode.insertBefore(s, h);
		}
	}()),
	
	//htmlspecialchars_decode	
	a[htmlDecode] = function (str) {
		return str.
			replace(/&amp;/g,'&').
			replace(/&lt;/g,'<').
			replace(/&gt;/g,'>').
			replace(/&quot;/g,'"').
			replace(/&#039;/g,"'");
	},

	//htmlspecialchars_decode	
	a[htmlEncode] = function (str) {
		return str.
			replace(/&/g,'&amp;').
			replace(/</g,'&lt;').
			replace(/>/g,'&gt;').
			replace(/"/g,'&quot;').
			replace(/'/g,'&#039;');
	},

	//select an element on the document
	a[get] = (function () {
		var target,
		sel,
		that,
		//provides querySelector support for ie <= 7
		query = function (elem, selector) {
			//set capture
			var capture = new Array(),
			nodes = elem.all,
			n;

			for(n in nodes) {
				if (void 0 === nodes[n].nodeType) {
					continue
				}
				capture.push(nodes[n])
			}		
			return capture
		},
		types = ['id', 'classNames', 'tagName'],
		find = function (type, name) {
			//is Spk the current caller then use doc or use supplied obj or element caller
			var targ = (that.name === 'Spk') ? Spk.doc : that,
			matches = [],
			//whether or not the targ is an array
			useArray = (targ instanceof Array);


			//targ isn't array so we force for now and then return
			//array[0] at end
			if ( ! useArray) {
				//if it has a tagName it's an element more than likely
				//if it has length it can be mixed object, array, or NodeList
				if (void 0 !== targ.length && void 0 === targ.nodeType) {
					targ = a[objectArray](targ)
				}
				else {
					targ = [targ]
				}
			}

			for(var m = 0; m < targ.length; m++) {
				if (type === 'id') {
					//nothing further to filter, return 
					if (sel.classNames === null && sel.tagName === null) {
						matches.push(targ[m].getElementById(name));
						break;
					}
					//ceheck classNames first
					else if (sel.classNames !== null) {
						//get element
						var match = a.doc.getElementById(name),
						//make array of element's classNames
						classNames = match.className.split(' ');

						//cycle selector classNames validate that they exist in match
						for(var i = 0; i < sel.classNames.length; i++) {
							if (a.indexOf(sel.classNames[i], classNames) < 0) {
								matches.push(null);
								break;
							}
						}
						matches.push(match);
						break;
					}
					matches.push(null);
					break;
				}
				
				//classNames - always returns an array
				else if (type === 'classNames') {
					useArray = true;
					var res = {};
					for(var i = 0; i < name.length; i++) {
						try {
							res[name[i]] = targ[m].getElementsByClassName(name[i])
						} 
						catch(errClassName) {
							//subprocess, last resort
							try {
								res[name[i]] = query(targ[m], name[i])
							} 
							catch(errClassName){
							}
						}
					}

					//match shortest classNames first
					var shortest = '',
					count = null;

					for(var n in res) {
						//count size of className
						if (count === null) {
							//store clase name length
							count = res[n].length,
							//set first as shortest
							shortest = n
						}
						//if count is set and the current className
						//is less than the previous set lowest
						else if (count > res[n].length) {
							count = res[n].length,
							shortest = n
						}
					}

					//store 
					res = shortest.length ? res[shortest] : null;

					if (null !== res) {
						res = Spk.objectArray(res);
						matches = matches.concat(res);
					}
				}
				//tagName - always returns array
				else if (type === 'tagName') {
					if (void 0 === targ[m].nodeType) {
						continue
					}
					useArray = true;
					matches = matches.concat(Spk.objectArray(targ[m].getElementsByTagName(name)));
				}
			}
			//end for loop

			//clear null values
			matches = matches.filter(Spk.win['Boolean']);

			//if our target was a single target return it's first response? --- this may change
			if ( ! useArray) {
				return matches.length > 0 ? matches[0] : null
			}

			return matches.length ? matches : null
		},
		//end find

		//find and filter
		filter = function () {
				//stop current filter if id found
				var	idFound = false,
				//obj that will hold final result
				obj = {};

				//prioritized matches for filtered selectors
				for(var i = 0; i < types.length; i++) {
					//if id, classNames, or tagNames exist
					if (null !== sel[types[i]]) {
						/*
						dbg('findtype: ' + types[i]);
						dbg('findname: ' + sel[types[i]]);
						*/
						//find type, id
						obj[types[i]] = find(types[i], sel[types[i]]);
						//todo - force array from node lists?
						//id's should only exist once
						if (types[i] === 'id' && obj[types[i]] !== null) {
							//id has been found, break loop
							idFound = true;
							break
						}

					}
				}
				
				//search for matched elements
				for(var n in obj) {
					if (obj[n] === null) {
						return n === 'id' ? void 0 : []
					}

					//the order is essential to an efficient search pattern
					switch(n) {
					case 'id':
						return obj[n];
						break;


					case 'classNames':

						//if we won't be filtering by tagNames as well, just return
						var res = [];

						//not filtering by tagName
						if (void 0 === obj.tagName || null === obj.tagName) {
							var valid = true;

							//cycle classes
							for(var i = 0; i < obj[n].length; i++) {
								//get elems classNames
								var el = obj[n][i];


								if (void 0 === el.nodeType) {
									continue
								}
								var names = el.className.split(' ');
								//confirm that each obj[n] className exists in sel.classNames
								for(var c = 0; c < sel.classNames.length; c++) {
									//no match, continue
									//does current element's classNames match set
									if (a.indexOf(sel.classNames[c], names) < 0) {
										valid = false;
										break;
									}
								}
								if (valid) {
									res.push(el)
								}
								else {
									valid = true
								}
							}
						}
						else {
							//otherwise cycle classNames and match tagName
							var tagNameFilter = sel.tagName;
							//find matching elements
							for(var i = 0; i < obj[n].length; i++) {
								//get elems that match tag - tagName
								var tag = obj[n][i];
								if (void 0 === tag.nodeType) {
									continue
								}

								tag = tag.tagName.toLowerCase();
								
								if (tagNameFilter === tag) {
									res.push(obj[n][i])
								}

							}
						}
						return res;
						break;

					case 'tagName':
						//if not array but element list - array-like
						if (void 0 !== obj[n].length && ! (obj[n] instanceof Array)) {
							return a[objectArray](obj[n])
						}
						//single value or array, return as is
						else {
							return obj[n]
						}
						break;
					}
					//end switch
				}
				//end for
				
				return obj
		},
		//end filter

		filterSelector = function (selector) {
			sel = {
				'selector': selector
			};

			var selector = selector.toString();
			
			//split id's first should only be one
			sel.id = selector.match(/#[\w_\-\/\\]+/g);
			
			if (sel.id !== null) {
				//remove id from selector string
				selector = selector.replace(sel.id,'');
				sel.id = sel.id.shift().substr(1)
			}

			//get array of any classNames
			sel.classNames = selector.match(/\.\w+/g);
			
			if (sel.classNames !== null) {
				for(var i = 0; i < sel.classNames.length; i++) {
					//remove class from selector string
					selector = selector.replace(sel.classNames[i],'');
					sel.classNames[i] = sel.classNames[i].substr(1)
				}
			}
			
			//tagName or null for not set
			sel.tagName = selector.length ? selector : null;
		};


		/*
		 * @params string
		 * @params object
		 * @return string | null | array
		 */
		return function (selector, obj) {
			var selector, obj;
			//if there is no selector
			if (void 0 === selector || ! selector.length) {
				throw 'Invalid element selector > ' + selector
			}
			
			//process obj if NodeList or HTMLCollection etc - specifically!
			//this should be done before altering obj
			if (void 0 !== obj) {
				if (void 0 !== obj.length && ! obj.length) {
					return []
				}
				that = obj
			}
			else {
				that = this
			}


			//split the selector string, also forcing it into an array
			selector = selector.split(' ');

			//using multiple selectors?
			if (selector.length > 1) {
				var res = [];
				for(var i = 0; i < selector.length; i++) {
					//find id and type
					filterSelector(selector[i]);

					if (i === 0) {
						//stack result
						res.push(filter());
					}
					else {
						//rebind that
						that = res.pop();
						//stack result
						res.push(filter());
					}

				}
				//grab last matches
				res = res.pop();

				return res
			}
			//only using one selector
			else {
				filterSelector(selector);
				if (selector.length === 1 && selector[0] === 'body') {
					return a.doc.body
				}

				return filter()				
			}
			return []
		}
	}());



	/*
	 * controls event binding on html elements
	 */
	var evt = (function () {
		/*types = [
			'HTMLEvents',
			'KeyboardEvents',
			'MouseEvents'
		],*/

		//whether or not we should use the standard Event creation method
		//todo - useStandard  will be enabled when preventDefault() is
		//functional in all browsers
		//var useStandard = typeof Event === 'function',
		var useStandard = false,
		//this will model the data for our events
		eventModel = {
			'HTMLEvents': {
				type: '',
				cancelBubble: false,
				cancelable: true
			},
			'KeyboardEvents': {
				type: '',
				cancelBubble: false,
				cancelable: true,
				keyIdentifier: '',
				keyLocation: 0,
				which: 0,
				charCode: 0,
				keyCode: 0,
				ctrlKey: false,
				altKey: false,
				shiftKey: false,
				view: null,
				metaKey: false
			},
			'MouseEvents': { 
				type: '',
				cancelBubble: false,
				cancelable: true,
				view: null,
				detail: 0,
				screenX: 0,
				screenY: 0,
				clientX: 0,
				clientY: 0,
				ctrlKey: false,
				altKey: false,
				shiftKey: false,
				metaKey: false,
				button: 0,
				relatedTarget: null
			}/*,
			'MutationEvent': {

			},
			'UIEvents': {
				type: '',
				cancelBubble: false,
				cancelable: false,
				view: null,
				detail: 0
			}*/
		},
		dispatch = function (elem, e) {
			//if the event wasn't provided it was 
			//dispatch was called from the event
			if (void 0 === e) {
				var e = this
			}

			//bind event to elem
			if (a.doc.addEventListener) 
			{
				elem.dispatchEvent(e)
			} 
			else 
			{
				elem.fireEvent(e.eventType, e)
			}
		};
	
		//list of events
		//todo --- update to use new Event() instead of createEvent
		/*
		 *
		 * @params string | array
		 * @params object | null
		 * @params object | null
		 * @return 
		 */
		return function (type, elem, evt) {
			//storage for event object
			var e, n, type,
			//initType = 'initEvent',
			eventType = 'HTMLEvents',
			//binding to elem?
			useBind = (void 0 !== elem && null !== elem), 
			//store the dataset for the event
			initEvent = {};

			/* This allows us to create specific custom events by 
			 * using the keywords click, mouse, or key */
			//non-standard event creation: if (browser === 'msie' && ieEVersion < 9)
			
			//mouse event
			if (type.search(/click|mouse/i) > -1) {
				eventType = 'MouseEvents'
				//initType = 'initMouseEvent'
			}
			//keyboard event
			else if (type.search(/key/i) > -1) {
				eventType = 'KeyboardEvents'
				//initType = 'initKeyboardEvent'
			}
			//force default event type
			else {
				eventType = 'HTMLEvents'
				//initType = 'initHTMLEvent'
			}
			
			//dbg('use eventType : ' + eventType);
			//set eventType
			type = !! a.doc.addEventListener ? '' + type : 'on' + type;
			//clone event properties you can pass custom props or an event
			if (void 0 !== evt && typeof evt === 'object') {
				for(n in eventModel[eventType]) {
					if (n === 'type') {
						initEvent[n] = type
					}
					else if (n === 'view') {
						initEvent[n] = Spk.win
					}
					//does the provided event have a property in that
					//exists in the model as well?
					else if (void 0 !== evt[n]) {
						//set for custom event
						initEvent[n] = evt[n]
					}
					//stack default model property
					else 
					{
						initEvent[n] = eventModel[eventType][n]
					}
				}
			}
			else {
				//get any values from elem
				for(n in eventModel[eventType]) {
					if (n === 'type') {
						initEvent[n] = type
					}
					else if (void 0 !== elem && void 0 !== elem[n]) {
						initEvent[n] = elem[n]
					}
					else {
						switch(n) {
						case 'relatedTarget':
							if (void 0 !== elem) {
								initEvent[n] = elem
							}
							else {
								initEvent[n] = null
							}
							break;

						case 'view':
							initEvent[n] = Spk.win;
							break;

						default:
							initEvent[n] = eventModel[eventType][n]
						}
					}
				}
			}


			//standard event, bind and dispatch
			//set type
			//useStandard is currently in proto stage, we are not using this
			//until we figure out prevent default effects across browsers
			if (useStandard) {
				e = new Event(initEvent.type)
			}
			else {
				//old versions 
				if (a.doc.addEventListener) {
					e = a.doc.createEvent('HTMLEvents');
					e.initEvent(initEvent.type, true, true);
				//	dbg(e);
				}
				//and old ie < 9
				else { 
					e = a.doc.createEventObject();
					e.eventType = initEvent.type;
				}
			}

			if ( ! a.doc.createEventObject) {
				//bind any specific event properties
				for(n in initEvent) {
					e[n] = initEvent[n]
				}
			}


			//fix preventDefault
			if (void 0 === e.preventDefault) {
				e.preventDefault = function () {
					e.cancelBubble = true,
					e.returnValue = false
				};
			}
			
			//if we aren't dispatching on element then return
			if ( ! useBind) {
				e.dispatch = function (elem){dispatch.call(e, elem)};
				return e
			}

			//dispatch the event
			dispatch(elem, e);
		}
	
	}());

	var __getID = '__getID',
	__findID = '__findID',
	store = 'store',
	changeStore = 'changeStore',
	origStore = 'origStore',
	customStore = 'customStore',
	customEvents = 'customEvents',
	mouseenter = 'mouseenter',
	mouseleave = 'mouseleave',
	//already set at top
	//bind = 'bind',
	unbind = 'unbind',
	clear = 'clear',
	remove = 'remove';


	//create a uniqid
	evt[__getID] = (function () {
		//keep private
		var counter = 0;
		//and add api
		return function () {
			return counter++
		}
	}()),

	evt[__findID] = function (elem) {
		//find the elem or register a new event handler control
		for(var n in this[store]) {
			//elem found
			if (this[store][n] === elem) {
				return n
			}
		}
		return false
	},

	//stores id: element in object
	evt[store] = {},
	
	//stores array of eventHandler functions for [id][type]
	evt[changeStore] = {},
	
	//store original functions for comparison
	evt[origStore] = {},
	
	//stores hooks to custom events that are created as hacks
	//to simulating the event being called
	evt[customStore] = {},

	/* Create and store custom events that will be used
	 * on the front end */
	evt[customEvents] = {};
	
		//mouseenter
	evt[customEvents][mouseenter] = (function () {
		var onMouseEnterRebind = function (e, elID, fID) {
			var elem = this;
			//if element is the target and the relatedTarget is not a part of its children
			if (elem === e.currentTarget && elem !== e.relatedTarget && ! a.hasChild(elem, e.relatedTarget)) {
				var binder = evt.customStore[elID]['mouseenter'][fID];
				binder.__rebinderEnabled = false;

				//evt.unbind('mouseout', elem, onMouseEnterRebind);
				elem.removeEventListener('mouseout', binder.__rebinder, false);

				//evt.bind('mouseover', elem, evt.customEvents.onMouseEnter);
				elem.addEventListener('mouseover', binder, false)
			}
		};
		
		//return onMouseEnter
		return function (e, elID, fID) {
			//bind elem to this
			var elem = this;
			
			//if element is the target or elem has the target in its children
			if (elem === e.target || a.hasChild(elem, e.target)) {
				var binder = evt.customStore[elID]['mouseenter'][fID];
				//evt.unabind('mouseover', elem, evt.customEvents.onMouseEnter);
				elem.removeEventListener('mouseover', binder, false);
				//evt.bind('mouseout', elem, onMouseEnterRebind);
				
				//set rebinder function once per custom event
				if (void 0 === binder.__rebinder) {
					//custom function id
					//var cfID = evt.customStore[elID]['mouseenterRebind'].length;
					binder.__rebinder = function (e) {
						//call onMouseEnterRebind with new custom function id
						onMouseEnterRebind.call(elem, e, elID, fID) 
					};
					//set rebinder type
					binder.__rebinderType = 'mouseout'
				}
				
				//mark so we know whether to delete the binder or rebinder
				//when calling event.remove, event.clear 
				binder.__rebinderEnabled = true;

				//bind event listener
				elem.addEventListener('mouseout', binder.__rebinder, false);

				//trigger mouseenter
				evt('mouseenter', elem, e);
				
			}
		}
	}()),
	//end mouseenter
	
	evt[customEvents][mouseleave] = (function () {
		//create custom event
		var	onMouseLeaveRebind = function (e, elID, fID) {
			var elem = this;
			if (elem === e.target || a.hasChild(elem, e.target)) {
				var binder = evt.customStore[elID]['mouseleave'][fID];
				binder.__rebinderEnabled = false;

				//that.unbind('mouseover', elem, onMouseEnterLeave);
				elem.removeEventListener('mouseover', binder.__rebinder, false);

				//that.bind('mouseout', elem, onMouseLeave);
				elem.addEventListener('mouseout', binder, false)
			}
		};

		return function (e, elID, fID) {
			var elem = this;
			/*dbg(e.target);
			dbg(e.currentTarget);
			dbg(e.relatedTarget);
			//dbg(e.relatedTarget);
			dbg(elem === e.target);
			dbg(elem === e.currentTarget);
			dbg(a.hasChild(elem, e.target));
			dbg(a.hasChild(elem, e.currentTarget));
			//dbg( ! a.hasChild(elem, e.relatedTarget));

			/*if (((elem === e.target && elem === e.currentTarget) 
				|| (elem === e.target && a.hasChild(elem, e.currentTarget))) 
			&& ! a.hasChild(elem, e.relatedTarget))*/
			if (elem === e.currentTarget && elem !== e.relatedTarget && ! a.hasChild(elem, e.relatedTarget)) {
				var binder = evt.customStore[elID]['mouseleave'][fID];
				//that.unbind('mouseout', elem, onMouseLeave);
				elem.removeEventListener('mouseout', binder, false);
				
				//set rebinder function once per custom event
				if (void 0 === binder.__rebinder) {
					//custom function id
					//var cfID = evt.customStore[elID]['mouseenterRebind'].length;
					binder.__rebinder = function (e) {
						//call onMouseEnterRebind with new custom function id
						onMouseLeaveRebind.call(elem, e, elID, fID) 
					};
					//set rebinder type
					binder.__rebinderType = 'mouseover'
				}
				
				//mark so we know whether to delete the binder or rebinder
				//when calling event.remove, event.clear 
				binder.__rebinderEnabled = true;
				//bind event listener
				//that.bind('mouseover', elem, onMouseEnterLeave);
				elem.addEventListener('mouseover', binder.__rebinder, false);

				//trigger mouseleave
				evt('mouseleave', elem, e)
			}
		}
	}()),

	//bind a `type` event listener function to the elem
	evt[bind] = (function () {
		var that = this,
		x = false,
		touchTypes = [
			'start',
			'end',
			'leave',
			'move',
			'cancel'
		],
		ie = ! a.doc.addEventListener,
		command = ie ? 'attachEvent' : 'addEventListener',
		pre = ie ? 'on' : '',
		suf = ie ? void 0 : false,
		set = function (type, elem, func, extend, data) {
			//generate random id
			var type, elem,
			//get elem's eventID
			id = that[__findID](elem),
			funcRef,
			extendFuncRef;
	
			
			//elem not yet registered for events, or no longer has events bound
			//create new 
			if (id === false) {
				id = that[__getID](),
				that[store][id] = elem, 
				//create new object to store types
				that[changeStore][id] = {},			
				that[origStore][id] = {}			
			}

			//check if the event type has been registered
			if (void 0 === that[changeStore][id][type]) {
				//create new place to store registered event handlers
				that[changeStore][id][type] = new Array(),
				that[origStore][id][type] = new Array()
			}

	
			if (void 0 !== data) { 
				extendFuncRef = extend 
				//data + extend
				? function (e){func.call(extend, e, data)} 
				//data no extend
				: function (e){func.call(e.target, e, data)} 
			}
			else {
				extendFuncRef = extend 
				//extend, no data
				? function (e){func.call(extend, e)} 
				//no data no extend
				: func;
			}


			/* now set funcRef */

			//ie has non-standard window event
			if (ie) {
				funcRef = function (event) {
					var e = event ? event : window.event;
					e.target = void 0 !== e.target ? e.target : e.srcElement,
					e.preventDefault = function () {
						e.returnValue = false
					};
					extendFuncRef(e)
				};
			}
			else {
				funcRef = extendFuncRef;
			}

			//create new function reference id
			//as they could be binding new data
			//and the function handle coulde be different
			//id = uniqid.toString();
			//func, the original function, receives
			//a stack of ids of copied funcRefs
			//func.__evt_id.push(id);
			//the new funcRef id ...
			//if it is __evt_id it could be overwritten when func === funcRef
			//funcRef.__evt_store.push(id);
			
			//keep track of functions, we need to bind the new
			//reference to a list for when we clear
			//
			//when the elem is window, we should not bind events to it 
			//but instead to a locally stored object we can always reference,
			//why not do that for every element?!?
			//store both, one to search for, one that was altered

			if (funcRef !== func) {
				//store changed handler
				that[changeStore][id][type].push(funcRef),
				that[origStore][id][type].push(func)
			}
			else {
				//they are identical store null 
				that[changeStore][id][type].push(null),
				that[origStore][id][type].push(func)
			}

			if (type === 'touch') {
				//cycle through touch types and bind
				//an event listener to each on the same
				//function making it a handler
				for(var i = 0; i < touchTypes.length; i++) {
					elem[command](pre + 'touch' + touchTypes[i], funcRef, suf)
				}
				return
			}
			//effect mousewheel for firefox on scroll detection
			if (type === 'mousewheel' && browser === 'firefox') {
				elem.addEventListener('DOMMouseScroll', funcRef, false)
			}
			//ie
			else if (ie) {
				elem.attachEvent('on' + type, funcRef)
			}
			else {
				elem.addEventListener(type, funcRef, false)
			}

			/*-----build custom triggers-----*/

			//hook, before we bind ids to functions
			if ( ! ie && type === mouseleave) {
				//add new custom event function reference
				if (void 0 === that[customStore][id]) {
					that[customStore][id] = {};
				}
				
				//keep track of event types bound to this id/elem
				if (void 0 === that[customStore][id][type]) {
					that[customStore][id][type] = new Array();
				}

				//custom function id from array position
				var fid = that[customStore][id][type].length;
				//add custom function to stack
				that[customStore][id][type].push(function (e){
					//call function passing this functions position
					that[customEvents][type].call(elem, e, id, fid);
				});

				//set binder type
				that[customStore][id][type][fid].__binderType = 'mouseout';

				//custom event hook / hack
				elem.addEventListener('mouseout', that[customStore][id][type][fid], false)
			}

			//hook, before we bind ids to functions
			else if ( ! ie && type === mouseenter) {
				//add new custom event function reference
				if (void 0 === that[customStore][id]) {
					that[customStore][id] = {};
				}
				
				//keep track of event types bound to this id/elem
				if (void 0 === that[customStore][id][type]) {
					that[customStore][id][type] = new Array();
				}

				//custom function id from array position
				var fid = that[customStore][id][type].length;
				//add custom function to stack
				that[customStore][id][type].push(function (e){
					//call function passing this functions position
					that[customEvents][type].call(elem, e, id, fid);
				});

				//set binder type
				that[customStore][id][type][fid].__binderType = 'mouseover';

				//custom event hook / hack
				elem.addEventListener('mouseover', that[customStore][id][type][fid], false)
			}
		};

		return function (type, elem, func, ext, dat) {
			var type, elem;
			
			if (void 0 === type || null === type) {
				type = void 0 === type ? 'undefined' : 'null';
				console.log(arguments);
				throw new TypeError('Spk::event:bind > expecting string '
					+ 'or array for argument 1 "type" @' + type)
			}
			else if (void 0 === elem || null === elem) {
				type = void 0 === elem ? 'undefined' : 'null';
				console.log(arguments);
				throw new TypeError('Spk::event:bind > expecting object '
					+ 'or array for argument 2 "elem" @' + elem)
			}

			if ( ! (type instanceof Array)) {
				type = [type]
			}
			if ( ! (elem instanceof Array)) {
				elem = [elem]
			}
			//bind multiple events to single target
			for(var i = 0; i < type.length; i++) {
				//set elements
				for(var e = 0; e < elem.length; e++) {
					//detect when mouse leaves current elements
					//does not bubble
					set(type[i], elem[e], func, ext, dat)
				}
			}
		}
	}),
	//end bind
	
	/*
	 * evt.unbind
	 * Removes an event handler given element, event type, listener
	 *
	 * @params array|string - the event handler / type
	 * @params array|object - the element/s
	 * @params object - the listener function
	 * @return void
	 */
	evt[unbind] = (function () {
		var that = this,
		storeID = false,
		funcID = false,
		func,
		ie = ! a.doc.addEventListener,
	   	pre = ie ? 'on' : '',
		handle = ie ? 'detachEvent' : 'removeEventListener',
		unset = function (type, elem, func) {
			//search through the elements list of bound events
			//for this type of event
			
			/* check if orig function is different then change store,
			 * unbind change store if different, we''ll be deleting both
			 * in either case but changeSoter will be null if origStore
			 * is same as func */
			var origHandlers = that[origStore][storeID][type],
			changeHandlers = that[changeStore][storeID][type];

			for(var i = 0; i < origHandlers.length; i++) {
				//try to find function in original handler functions
				if (origHandlers[i] === func) {
					funcID = i;
					break
				}
			}

			//make sure an actual function like this exists and is bound
			if (funcID === false) {
				throw Error('Spk::event:unbind > Invalid function, function is not currently bound')
			}

			//save for custom event comparison
			//var origFunc = func;

			//check to see if changeHandlers function is different or null
			if (changeHandlers[funcID] !== null) {
				//unbind this one instead
				func = changeHandlers.splice(funcID, 1)[0]
			}
			else {
				//remove function
				changeHandlers.splice(funcID, 1)
			}

			//and remove final trace
			origHandlers.splice(funcID, 1);

			//unbind event listener
			elem[handle](pre + type, func);
			
			
			/*---remove any custom events that may have been set---*/
			if (void 0 !== that[customStore][storeID] 
				&& void 0 !== that[customStore][storeID][type]
				&& that[customStore][storeID][type].length > 0) {
				//SPLICE! the main event controller -> binder 
				var binder = that[customStore][storeID][type].splice(funcID, 1)[0];
				//check if we are using a rebinder
				if (void 0 !== binder.__rebinderEnabled && binder.__rebinderEnabled) {
					elem[handle](binder.__rebinderType, binder.__rebinder)
				}
				else {
					elem[handle](binder.__binderType, binder)
				}
			}

			
		};

		return function (type, elem, func) {
			storeID = that[__findID](elem);

			//todo - should we return
			if (storeID === false) {
				throw Error('Spk::event:unbind > Invalid element, has no bound listeners')
			}

			if (type instanceof Array) {
				for(var i = 0; i < type.length; i++) {
					unset(type[i], elem, func)
				}
			}
			else {
				unset(type, elem, func)
			}
		}

	}),
	//end unbind


	//unbind all events of a specific type on an element
	evt[clear] = (function () {
		var that = this,
		storeID = false,
	   	pre = !! a.doc.addEventListener ? '' : 'on',
		capture = pre.length > 0 ? void 0 : false,
		handle = pre.length > 0 ? 'detachEvent' : 'removeEventListener',
		del = function (type) {
			var origHandlers = that[origStore][storeID][type],
			changeHandlers = that[changeStore][storeID][type];

			while(origHandlers.length > 0) {
				//unlink handler functions
				var orig = origHandlers.splice(0, 1)[0],
				change = changeHandlers.splice(0, 1)[0];
				
				//unbind handler from element
				that.store[storeID][handle](pre + type, (change === null ? orig : change), capture)
			}

		};

		return function (evtType, elem) {
			storeID = that[__findID](elem);

			if (false === storeID) {
				throw Error('Spk::event:clear > Invalid element, has no bound listeners')
			}

			if (evtType instanceof Array) {
				for(var i = 0; i < evtType.length; i++) {
					del(evtType[i])
				}
			}
			else {
				del(evtType)
			}
		}
	}),
	//end clear

	//unbind all event listeners from an element
	evt[remove] = (function () {
		var that = this,
		storeID = false,
	   	pre = !! a.doc.addEventListener ? '' : 'on',
		capture = pre.length ? void 0 : false,
		handle = pre.length ? 'detachEvent' : 'removeEventListener',
		del = function () {
			var elem = that[store][storeID],
			origTypes = that[origStore][storeID],
			changeTypes = that[changeStore][storeID];

			//get through handles for listeners on handle types
			while(origTypes.length > 0) {
				//handle[type] == ['click', 'keydown', etc...]
				var origHandlers = origTypes[n],
				changeHandler = changeTypes[n];

				while(origHandlers.length > 0) {
					//unlink handler functions
					var orig = origHandlers.splice(0, 1)[0],
					change = changeHandlers.splice(0, 1)[0];
					
					//unbind handler from element
					that.store[storeID][handle](pre + type, (change === null ? orig : change), capture)
				}

				//remove handle
				origTypes.splice(0, 1),
				changeTypes.splice(0, 1)
			}
		};

		return function (elem) {

			if (elem instanceof Array || (typeof elem === 'object' && void 0 !== object.length)) {
				for(var i = 0; i < elem.length; i++) {
					storeID = that[__findID](elem);

					if (false !== storeID) {
						del()
					}
				}
			}
			else {
				storeID = that[__findID](elem);

				if (false === storeID) {
					del()
				}
			}
		}
	}),
	//end remove
	
	evt[bind] = evt[bind].call(evt),
	evt[clear] = evt[clear].call(evt),
	evt[remove] = evt[remove].call(evt),
	evt[unbind] = evt[unbind].call(evt),
	a[event] = evt,

	//remove html element
	a[clearNode] = function (node, returnNode) {
		//make sure node is not null
		if (void 0 === node) {
			trace(arguments);
			throw 'Spk.clearNode > Element object must not be null'
		}

		//make sure nodeent is valid
		if (typeof node !== 'object' || ! 'parentNode' in node) {
			trace(arguments);
			throw 'Spk.clearNode > Invalid HTML Element'
		}
		if (node.parentNode !== null) {
			//remove child
			node.parentNode.removeChild(node);
			//return node only if we are capturing
			if (void 0 !== returnNode && returnNode) {
				return node
			}
		}
	},

	//clear the contents of an HTMLElement
	a[clearChildren] = function (node, returnChildren) {
		if (void 0 === node) {
			trace(arguments);
			throw 'Spk::clearChildren > Invalid HTML Element @'+node
		}
		if (void 0 === returnChildren || ! returnChildren) {
			returnChildren = false
		}
		else {
			var store = [];
		}
		while(node.lastChild) {
			if (returnChildren) {	
				store.push(node.lastChild);
			}
			node.removeChild(node.lastChild)
		}	
		if (returnChildren) {
			return store.reverse()
		}
	},

	/*
	 * style
	 * styles multiple dom objects
	 *
	 * @params object|array
	 * @params object
	 * @return void
	 */
	a[style] = (function () {
		var css,args,
		set = function (obj) {
			if (void 0 === obj) {
				console.log(args);
				throw new TypeError('Spk::style >  Invalid HTML Element')
			}
			
			for(var n in css) {
				if (n === 'opacity' && browser === 'msie' && ieVersion < 9) {
					//return filter opacity
					obj.style['filter'] = 'alpha(opacity=' + (parseFloat(css[n]) * 100) + ')';
					continue
				}
				else if (void 0 === obj.style || void 0 === obj.style[n]) {
					throw new TypeError('Spk::style > Invalid css property @' + n)
				}	
				obj.style[n] = css[n]
			}
		},
		mirror = function (arrobj) {
		//	console.log(arrobj);
			for(var i = 0; i < arrobj.length; i++) {				
				set(arrobj[i])
			}			
		},
		arrayCall = function (arr) {
			//dbg('----------');
			//dbg(arr);
			for(var i = 0; i < arr.length; i++) {			
				if (arr[i] instanceof Array) {
					mirror(arr[i]);
					continue;
				}

				set(arr[i])
			}			
		};

		return function (obj, cssText) {
			css = cssText;
			args = arguments;

			if (obj instanceof Array || (typeof object === 'object' && void 0 !== obj.length)) 
			{
				arrayCall(obj);
				return
			}
			set(obj)
		}
	}()),


	/*
	 * getStyle
	 * returns a cross-browser computed style
	 * of a current property 
	 * 
	 * @params string
	 * @params object
	 */
	a[getStyle] = function (prop, obj) {
		
		if (void 0 === prop || typeof prop !== 'string') {
			dbg(1233);
			dbg(prop);
			dbg(obj);
			throw 'Spk > Invalid getStyle property...expecting string'
		}
		else if (void 0 === obj || void 0 === obj.style) {
			dbg(44444);
			dbg(prop);
			dbg(obj);
			throw 'Spk > Invalid getStyle object...expecting HTML Element'
		}
		
		if (browser === 'msie' && ieVersion < 9) {
			if (prop === 'opacity') {
				prop = 'filter'
			}
			return obj.currentStyle[prop]
		}
		//getPropertyValue, is not the same, and does not 
		//work for dom properties backgroundColor vs background-color
		return w.getComputedStyle(obj)[prop]
	};


	//create new class that will store fetched elems
	//for caching via cloning	
	//TODO  - (textContent vs innerText) vs createTextNode
	var _spkElem = function (){},
	spkElemProto = _spkElem[SpkProto] = {
		store: {},
		clone: function (elem){
			return this.store[elem].cloneNode()
		},
		create: function (elem){
			switch(elem) {
			case 'frag':
				this.store[elem] = a.doc.createDocumentFragment();
				break;
			case 'text':
				this.store[elem] = a.doc.createTextNode('');
				break;
			default:
				this.store[elem] = a.doc.createElement(elem);
			}
		},
		get: function (elem, text) {
			if (void 0 === this.store[elem]) {
				this.create(elem)
			}
			if (void 0 !== text && elem !== 'frag') {
				//create new text node
				if (void 0 === this.store['text']) {
					this.create('text')
				}

				//create new element
				var ele = this.store[elem].cloneNode();

				switch(elem) {
				case 'text':
					//set text value
					ele.nodeValue = text;
					break;
				default:
					//and create new text
					var txt = this.store['text'].cloneNode();
					txt.nodeValue = text;
					//append text to elem
					ele.appendChild(txt);
				}

				return ele
			}
			return this.store[elem].cloneNode()
		}
	},
	spkElem = new _spkElem;

		
	//set a new element, useful because it will globally cache
	//all elements created and return clones
	a[set] = (function () {
		var setAt = 'setAttribute',
		error = function (num) {
			throw 'Spk > Invalid text object ' + num
		},
		//store fetched objects
		run = function (elem, attrs) {
			if (typeof elem === 'string') {
				//we only create element once and store in reference
				//we always return a clone
				elem = spkElem.get(elem)
			}
			if (void 0 === elem) {
				throw 'Spk > Invalid HTML Element in set'
			}

			for(var n in attrs) {
				switch(n) {
				case 'text':
					var type = typeof attrs[n];
					//text node already set just append
					switch(type) {
					case 'object':
						try{
							elem.appendChild(attrs[n])
						}
						catch(err) {
							error(1)
						}
						break;

					case 'string':
						elem.appendChild(Spk.node('text', attrs[n]));
						break;

					default:
						dbg(n);
						dbg(attrs);

						error(type)
					}
					break;

				case 'style':
					var type = typeof attrs[n];
					if (type === 'string') {
						//setAttribute
						elem[setAt](n, attrs[n])
					}
					//css object mode
					else if (type === 'object') {
						var css = attrs[n];
						for(var s in css) {
							elem.style[s] = css[s]					
						}
					}
					else {
						throw new TypeError('Spk::set > expecting string or object for style')
					}
					break;

				default:
					//setAttribute
					elem[setAt](n, attrs[n])
				}
			}
			return elem
		};

		return function (elem, attrs) {
			if (elem instanceof Array) {
				//keep array of returned elements
				var arr = [];
				//cycle through elements applying attributes
				for(var i = 0; i < elem.length; i++) {
					//stack elements onto array for return
					arr.push(run(elem[i], attrs))
				}
				//return array of elements
				return arr
			}

			//only need to run string | die
			return run(elem, attrs)
		}
	}()),

	/*
	 * unset
	 * removes an attribute or list of attributes
	 */
	a[attrUnset] = (function () {
		var args,
            i,
            n,
            run = function (elem, attrs) {
                if (attrs instanceof Array) {
                    for(n = 0; n < attrs.length; n++) {
                        try {
                            elem.removeAttribute(attrs[n]);
                        } catch(unsetNodeError) {
                            throw 'Spk:unset > could not remove attribute "' + attrs[n]
                            + '" from node @' + elem
                        }
                    }
                } else {
                    try {
                        elem.removeAttribute(attrs)
                    } catch(unsetNodeError)	{
                        trace(args);
                        throw 'Spk:unset > could not remove attribute "' + attrs
                        + '" from node @' + elem
                    }
                }
            };

		return function (elem, attrs) {
			//set args for error catching
			args = arguments;
			if (elem instanceof Array) {
				//cycle through elements applying attributes
				for(i = 0; i < elem.length; i++) {
					//stack elements onto array for return
					run(elem[i], attrs)
				}
                return;
			}
			//only need to run string | die
			run(elem, attrs)
		}
	}()),

	//create document element, returns element of type
	a[node] = function (type, text) {
		if (typeof type !== 'string') {
			throw 'Spk > Invalid node get type'
		}
		return spkElem.get(type, text)
	},

	//return a node or set of nodes from strings
	a[node][fromString] = (function () {
		var firstRun = true,
		frag = spkElem.get('frag'),
		markup = spkElem.get('div'),
		kids,
		getNode = function (str) {
			//first run only
			if (firstRun) {
				firstRun = false;
				frag.appendChild(markup)
			}

			markup.innerHTML = str,
			kids = a[objectArray](markup.children),
			//empty markup
			a[clearChildren](markup);

			//return array if multiple nodes were added
			return kids.length > 1 ? kids : kids[0]
		},
		error = function () {
			throw 'Spk::node:fromString > Invalid parameter type, expecting string'
		};

		return function (str) {

			if (str instanceof Array) {
				var arr = [];
				for(var i = 0; i < str.length; i++) {
					if (typeof str !== 'string') {
						return error()
					}
					//stack resulting node
					arr.push(getNode(str[i]))
				}
				return arr
			}			
			else if (typeof str === 'string') {
				return getNode(str)
			}
			return error()
		}
	}());

	/*
	 * This is the nodeManager
	 * it handles things like append, prepend,
	 * before, after
	 *
	 * it is a prototype with a main controller and error 
	 * handler for smooth sailing and DRY
	 */
	var _nodeManager = function (types){this.register(types)},
	nodeObj = {},
	after = 'after',
	before = 'before',
	prepend = 'prepend',
	append = 'append',
	process = 'process',
	register = 'register',
	nodeManager = 'nodeManager';
	nodeObj[nodeManager] = _nodeManager[SpkProto];

	nodeObj[nodeManager][register] = function (types) {
		var that = this;
		for(var i = 0; i < types.length; i++) {
			//register type to Spk
			a[types[i]] = (function (managerType) {
				var name = managerType;
				return function (nodes, targetNode) {
					that.process.call(that, name, nodes, targetNode)
				}
				//initiliaze with the name of the type
			}(types[i]));
		}
	};
	

	//process requests to their methods
	nodeObj[nodeManager][process] = function (type, nodes, targetNode) {
		var type, nodes, targetNode;
		try 
		{
			//nodes could be single node, array of nodes, or an array-like object of nodes
			if (nodes instanceof Array || (typeof nodes === 'object' && void 0 !== nodes.length)) {
				//iterate through each and 
				for(var i = 0; i < nodes.length; i++) {
					if (typeof nodes[i] === 'string') {
						nodes[i] = a[node].fromString(nodes[i]);
						if (nodes[i].length > 1) {
							this.process(type, nodes[i], targetNode);
							continue;
						}
					}
					
					//attempt to run process of "type" ie nodeManager.append
					this[type](nodes[i], targetNode)
				}
			}
			else {
				if (typeof nodes === 'string') {
					nodes = a[node].fromString(nodes);
					if (nodes[i].length > 1) {
						//stop and repeat
						this[process](type, nodes, targetNode);
						return;
					}
					else {
						nodes = nodes[0]
					}
				}

				//run single
				this[type](nodes, targetNode)
			}
		}
		catch(nodeManagerErr) {
			console.log(nodeManagerErr.stack);
			throw 'Spk.' + type + ' could not process node @' + (nodes.tagName)
		}	
	};

	//insert nodes before targetNode
	nodeObj[nodeManager][before] = function (node, targetNode) {
		targetNode.parentNode.insertBefore(node, targetNode)
	},

	//appends nodes to targetNode
	nodeObj[nodeManager][append] = function (node, targetNode)		
	{
		targetNode.appendChild(node)
	},
	
	//prepend
	nodeObj[nodeManager][prepend] = function (node, targetNode) {
		if (targetNode.firstChild) {
			targetNode.insertBefore(node, targetNode.firstChild)
		}
		else {
			targetNode.appendChild(node)
		}
	},

	//after	
	nodeObj[nodeManager][after] = function (node, targetNode) {
		//if target has a sibling, use insertBefore
		if (targetNode.nextSibling) {
			targetNode.parentNode.insertBefore(node, targetNode.nextSibling)
		} else {
		    //otherwise, target is at the end of the parentNode's children, so appendChild
			targetNode.parentNode.insertBefore(node)
		}
	};

	//instantiate prototype of nodeManager 
	//and bind method types to Spk
	nodeManager = new _nodeManager([
			prepend,
			append,
			before,
			after		
	]);


	/*
	 * returns true / false if parent has child or not
	 *
	 * @params object
	 * @params object
	 * @return boolean
	 */
	a[hasChild] = function (parent, child) {
		if (void 0 === child || null === child || void 0 === child.parentNode) {
			return false
		}

		var node = child.parentNode;
		while(node !== null) {
			if (node === parent) {
				return true
			}
			node = node.parentNode
		}
		return false
	},


	//return next element
	a[nextElement] = function (elem) {
		var el, elem;

		if (void 0 !== (el = elem.nextElementSibling)) {
			return el
		}

		while ( null !== elem.nextSibling && elem.nextSibling.nodeType !== -1) {
			elem = elem.nextSibling
		}	

		return elem
	},

	
	//return previous element
	a[previousElement] = function (elem) {
		var el, elem;

		if (void 0 !== (el = elem.previousElementSibling)) {
			return el
		}

		while ( null !== elem.previousSibling && elem.previousSibling.nodeType !== -1) {
			elem = elem.previousSibling
		}	

		return elem

	},

	//Array.filter - supports filter for arrays in older browsers
	a[filter] = function (arr, callback, bind) 
	{
		if (void 0 === bind) {
			var bind = this
		}

		if (typeof callback !== 'function') 
		{
			throw new TypeError('Spk::filter > Expecting function for second parameter "callback" @' + func);
		}

		var res = [],
		len = arr.length;

		for (var i = 0; i < len; i++) 
		{
			if (callback.call(bind, arr[i], i, arr)) 
			{
				res.push(arr[i])
			}
		}

		return res
	},

	//Array.indexOf - adds support for indexOf in older browsers
	a[indexOf] = function (search, arr, start) 
	{
		var type = typeof search;
		if (void 0 === search || (type !== 'string' && type !== 'number')) {
			throw new TypeError('Spk::indexOf > Expecting string for first parameter "search" @' + search)
		}
		if (void 0 === arr || void 0 === arr.length) {
			throw new TypeError('Spk::indexOf > Expecting array or string for second parameter "searchObject" @' + arr)
		}

		var start,
		len = arr.length,
		i;

		if (void 0 === start) 
		{
			i = 0
		}
		else if (start < 0) {
			i = len + start
		}
		else 
		{
			i = start
		}

		//if the array is empty or the search is not in range
		if (len === 0 || (len > 0 && (i > len - 1 || i < 0))) {
			return -1
		}
		else {
			for(i; i < len; i++) {
				if (arr[i] === search) {
					return i
				}
			}			
		}

		return -1		
	},
	
	
	/*
	 * return hex of rgb color
	 * @params array
	 * @params boolean - pad with '#' default: true
	 * @return string
	 */
	a[getHex] = (function () {
		var hexListR = {
			10: 'A',
			11: 'B',
			12: 'C',
			13: 'D',
			14: 'E',
			15: 'F'
		},
		translate = function (numb) {
			if (numb < 10) {
				return numb
			}
			//return hex number
			return hexListR[numb]
		},
		hex = function (color) 
		{
			var color = parseInt(color),
			x = color % 16;

			return translate((color - x) / 16) + translate(x)
		};

		return function (rgb, padding) {
			var rgb, padding;


			if (void 0 === rgb) {
				throw new TypeError('Spk::ease:getHex > RGB value cannot be null')
			}

			//default padding with '#'
			if (void 0 === padding || padding) {
				padding = true
			}
			else {
				padding = false
			}

			/*Turn the rgb value into an array*/
			if (typeof rgb === 'string') {
				//make sure it is in proper format 
				if (rgb.search(',') < 1 || (rgb = rgb.split(',')).length !== 3) {
					throw new TypeError('Spk::ease:getHex > Invalid RGB string format, expecting "#,#,#" @' + rgb)
				}
			}
			//rgb type is array
			else if (rgb instanceof Array) {
				if (rgb.length !== 3) {
					throw new TypeError('Spk::ease:getHex > Invalid RGB array format, expecting "[#,#,#]" @' + rgb)
				}
			}
			//rgb type is object
			else if (typeof rgb === 'object') {
				if ((void 0 === rgb.r && void 0 === rgb.R) 
					|| (void 0 === rgb.g && void 0 === rgb.G)
					|| (void 0 === rgb.b && void 0 === rgb.B)) {
					throw new TypeError('Spk::ease:getHex > Invalid RGB object format, expecting '
						+'"{r: #, g: #, b: #}" OR "{R: #, G: #, B: #}" @' + rgb)
				}
				
				//force lowercase so we can properly build rgb / hex
				for(var n in rgb) {
					rgb[n.toLowerCase()] = Number(rgb[n])
				}

				//build final rgb array
				rgb = [rgb.r, rgb.g, rgb.b]
			}


			var str = padding ? '#' : '';
			for(var i = 0; i < rgb.length; i++) {
				//perform hex morph
				str += hex(rgb[i])
			}
			return str
		}
	}()),

	/*
	 * getAlphaColor
	 * Get an alpha color's true color value by 
	 * providing the rgba with a bgColor to compare against
	 *
	 * @params mixed
	 * @params mixed
	 * @params boolean
	 */
	a[getAlphaColor] = (function () {
		/* 
		 * e.g. rgba(255, 255, 255, 0.5)
		 * bgColor(0,0,0)
		 * means we are applying half the rgba
		 * value to the backgroundColor value
		 */
		return function (rgba, bgColor, returnHex) {
			var rgba, bgColor, returnHex;

			//set returnHex default
			if (void 0 === returnHex || ! returnHex) {
				returnHex = false
			}
			else {
				returnHex = true
			}

			var i = 0,
                srcAlpha,
                //unless we make this read multiple opacities it should be 1
                dstAlpha = 1,
                //source and destination(bg) colors
                src, dst,
                rgb = new Array(),
                //the combined Alpha
                outA = 1,
                rounder = 'round';

                srcAlpha = Number(rgba.pop());
                //disabled, unless we use multiple opacities
                //dstAlpha = Number(bgColor.pop(dd));

                outA = srcAlpha + dstAlpha * (1 - srcAlpha);
			
			for(i; i < bgColor.length; i++) {
				src = Number(rgba[i]),
				dst = Number(bgColor[i]);
				if (dst === 0 && dstAlpha < 1) {
					dst = 255 - (255*dstAlpha);
				}
				//set the rounding mechanism, best guess for now
				//rounder = src - dst <= 0 ? 'floor' : 'ceil',
				rgb.push(Math[rounder](Number( (src * srcAlpha) + ((dst * dstAlpha) * (1 - srcAlpha)) / outA )))

			}

			//return hex or array of rgb
			return returnHex ? a.getHex(rgb) : rgb

		}

	}()),


	/*
	 * return rgb color values from hex
	 * @params string
	 * @return array
	 */
	a[getRGB] = (function () {
		var hexList = {
			'A': 10,
			'B': 11,
			'C': 12,
			'D': 13,
			'E': 14,
			'F': 15
		},
		//dehexify
		translate = function (hex) {
			// hex is a hex digit.
			// dehexify returns the decimal number between 0 and 15.
			if (hex < 10) {
				return hex		
			}
				
			//hex is string
			hex = hex.toUpperCase();
			if (void 0 == hexList[hex]) {
				throw 'Invalid hex to rgb request 2: ' + hex;
			}
			//return hex number
			return hexList[hex]
		},
		// convertHex
		rgb = function (hex,v) {
			// hexVal is a two-digit hex number.  
			// convertHex returns the RGB value between 0 and 255.
			var x = parseInt(translate(hex.substring(0,1))), // temp has first digit.
			val = parseInt(translate(hex.substring(1,2))); // answer has second digit.
			return x * 16 + val + ''
		};

		return function (hex) {
			var hex, r = [];
			if (typeof hex !== 'string') {
				throw new TypeError('Spk::ease:getRGB > Invalid argument, expecting hex string @' + hex)
			}

			if (hex.substr(0,1) === '#') {
				hex = hex.substr(1)
			}

			if (hex.length === 3) {
				//combine into 6
				var res = hex.split('');
				hex = '';

				for(var i = 0; i < res.length; i++) {
					hex += res[i] + '' + res[i]
				}
			}
			
			//create hex
			for(var i = 0; i < 3; i++) {
				r.push(Number(rgb(hex.substr(i*2,2))))
			}
			return r
		}

	}()),

	/* 
	 * GetJSON
	 *
	 * A method for retrieving JSONP requests
	 * that is JSON wrapped in a callback function
	 */
	a[getJSON] = (function () {
		var getTimer = function (url) {
			var timer, geturl = url,
			getContent = function () {
				var scripts = Spk.get('script');
				for(i = 0; i < scripts.length; i++) {
					if (scripts[i].hasAttribute('src') && scripts[i].src === geturl) {
						capture = scripts[i];
						Spk.win.clearInterval(timer);
						timer = null;
						break;
					}
				}
			};

			timer = Spk.win.setInterval(getContent, 1);	
		};

		return function (url, async) {
			var geturl = url;
			a.getScript(geturl);
			new getTimer(geturl);
		}		
	}()),

	

	/*
	* Text - Will search and find text in nodes
	*/
	a.text = (function () {
		return function (obj, set, append) {
			if (void 0 === obj || void 0 === obj.nodeType) {
				throw Error('Spk::text > Invalid Object expecting HTML node @' + obj)
			}
			if (void 0 === append || ! append) {
				var append = false
			}
			var children = obj.childNodes,
			getText = (set === void 0);
			if (children.length === 0) {
				if (getText) {
					return ''
				}
				a.set(obj,{'text': set})
			}
			for(var i = 0; i < children.length; i++) {
				if (children[i].nodeName === '#text') {
					if (getText) {
						return children[i].nodeValue
					}
					else {
						if (append) {
							children[i].nodeValue += set;
						}
						else {
							children[i].nodeValue = set;
						}
						break
					}
				}
			}
		}
	}());


    /*
     * Map - Maps an array to a callback
     */
    a.map = (function () {
        var i;
        return function (array, func) {
            if (typeof func !== 'function') {
                throw new TypeError('Spk::map > callback `func` must be type function');
            }
            for (i = 0; i < array.length; i++) {
                func(array[i]);
            } 
        }
    }());



	a.docHeight = function () {
		return a.doc.documentElement.offsetHeight
	},

	a.docWidth = function () {
		return a.doc.documentElement.offsetWidth
	},

	/* 
	 * ClientHeight and ClientWidth
	 * returns a crossbrowser way to retrieve each
	 */
	(function () {
		var compat = a.doc.compatMode.toLowerCase() === 'backcompat' ? true : false;

		a[clientHeight] = function () {
			return compat 
			? a.body[clientHeight]
			: a.doc.documentElement[clientHeight]
		},
		a[clientWidth] = function () {
			return compat 
			? a.body[clientWidth]
			: a.doc.documentElement[clientWidth]
		}
	}());



	//hook to add to cue
	a.cue = cue,

	//trace the caller
	a.trace = trace,


	//---------------------------
	//--------------------------------
	// #end misc methods
	//--------------------------------
	//---------------------------

	//finally run the spk
	runSpk();


	//api hook via s(api-name, args)
	/* currently not for production use
	self['s'] = function (name, a, b, c, d, e) {
		if (void 0 === self[spkDefinedNames.i][name]) {
			throw 'Spk > No API found'
		}

		return self[spkDefinedNames.i][name](a, b, c, d, e)
	}*/




	//---------------------------
	//--------------------------------
	// #end SPK
	//--------------------------------
	//---------------------------


})(window);




