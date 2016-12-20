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
	     const string_arr = Array.from(document.querySelectorAll(arg));
	     return new DOMNodeCollection(string_arr);
	   } else if (arg instanceof HTMLElement) {
	     return new DOMNodeCollection( Array.from(arg));
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

	  on(eventName, callback) {
	    this.htmls.forEach(node => {
	      node.addEventListener(eventName, callback);
	      const eventKey = `dollarDomEvents-${eventName}`;
	      if (typeof node[eventKey] === "undefined") {
	        node[eventKey] = [];
	      }
	      node[eventKey].push(callback);
	    });
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
	    this.html("");
	  }

	  append(children){
	    if (typeof children === 'object' &&
	      !(children instanceof DOMNodeCollection)) {
	        children = $l(children);
	      }

	    if (typeof children === "string") {
	      this.htmls.forEach(node => node.innerHTML += children);
	    } else if (children instanceof DOMNodeCollection) {
	      this.htmls.forEach(node => {
	        children.forEach(childNode => {
	            node.appendChild(childNode.cloneNode(true));
	        });
	      });
	    }
	  }


	  attr(key, val) {
	    if (typeof val === "string") {
	      this.htmls.forEach( node => node.setAttribute(key, val) );
	    } else {
	      return this.htmls[0].getAttribute(key);
	    }
	  }

	  addClass(...classNames) {
	    this.htmls.forEach(function(el){
	      let elementClasses = (el.getAttribute("class") === null) ? [] : el.getAttribute("class").split(" ");
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

	  children(){
	    let kids = [];
	    this.htmls.forEach(function(el){
	      kids.push(el.children);
	    });
	    return kids;
	  }

	  parent(){
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