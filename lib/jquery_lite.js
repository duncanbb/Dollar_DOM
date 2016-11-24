/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const DOMNodeCollection = __webpack_require__(1);
	Window.prototype.$l = function (arg) {
	   if (typeof(arg) === "string") {
	     const stri = Array.from(document.querySelectorAll(arg));
	     return new DOMNodeCollection(stri);
	   } else if (arg instanceof HTMLElement) {
	     return new DOMNodeCollection( Array.from(arg));
	    //  check this later
	   }
	};


/***/ },
/* 1 */
/***/ function(module, exports) {

	class DOMNodeCollection {
	  constructor(HTMLarray) {
	    this.htmls = HTMLarray;
	    return this;
	  }

	  html () {
	    const args = Array.from(arguments);
	    if (args.length > 0){
	      let newText = args[0];
	      this.htmls.forEach(function(el){
	        el.innerHTML = newText;
	      });
	    } else {
	      return this.htmls[0];
	    }
	  }

	  empty () {
	    this.htmls.forEach(function(el) {
	      el.innerHTML = "";
	    });
	  }
	  myAppend(){
	    const args = Array.from(arguments);

	    if (args[0].__proto__.constructor.name === 'DOMNodeCollection'){
	      this.htmls.forEach(function (el){
	        args.forEach(function(DOMnode){
	          DOMnode.htmls.forEach(function(innerNode) {

	            el.innerHTML = el.innerHTML + innerNode.outerHTML;
	          });
	        });
	      });
	    } else if (typeof args === "string"){
	      this.htmls.forEach(function (el){
	        for (var i = 0; i < args.length; i++) {
	            el.innerHTML = el.innerHTML + args[i];
	        }
	      });
	    } else if ( args[0] instanceof HTMLElement ){
	      this.htmls.forEach(function(el) {
	        args.forEach(function(arg) {
	          el.innerHTML = el.innerHTML +  arg.outerHTML;

	        });
	    });
	  }
	    return this.htmls;
	  }

	  attr(){
	    const args = Array.from(arguments);
	    let fieldName = args[0];
	    if (args.length === 1) {
	      return this.htmls[0].getAttribute(fieldName);
	    } else if (args.length === 2){
	      let value = args[1];
	      return this.htmls[0].setAttribute(fieldName, value);
	    }
	  }

	  addClass(...classNames) {
	    this.htmls.forEach(function(el){
	      let elementClasses = (el.getAttribute("class") === null) ? [] : el.getAttribute("class").split(" ");
	      classNames.forEach(function(klass){
	        // style points
	      });
	      let newClasses = elementClasses.concat(classNames);
	      el.setAttribute("class", newClasses.join(" "));
	    });
	  }

	    removeClass(...classNames) {
	      this.htmls.forEach(function(el){
	        classNames.forEach(function(klass){
	          let elementClasses = el.getAttribute("class").split(" ");
	          for (var i = 0; i < elementClasses.length; i++) {
	            if (classNames.includes(elementClasses[i])) {
	              delete elementClasses[i];
	            }
	          }
	          el.setAttribute("class", elementClasses.join(" "));
	        });
	      });
	  }

	  myChildren(){
	    let childrens = [];
	    this.htmls.forEach(function(el){
	      childrens.push(el.children);
	    });
	    return childrens;
	  }

	  myParent(){
	    let parents = [];
	    this.htmls.forEach(function(el){
	      if (parents.includes(el.parentNode)) { return;}
	      parents.push(el.parentNode);
	    });
	    return parents;
	  }

	  find(searchNodeString){
	    const found = [];
	    this.htmls.forEach( (html)=> {
	      found.push(html.querySelectorAll(searchNodeString));
	    });
	    return found;
	  }

	  remove(findAndDestroy){
	    console.log(this);
	    const toRemove = this.find(findAndDestroy);
	    toRemove[0].forEach((child)=>{
	      this.html().removeChild(child);
	    });
	  }


	}

	module.exports = DOMNodeCollection;


/***/ }
/******/ ]);