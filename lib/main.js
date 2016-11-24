const DOMNodeCollection = require('./dom_node_collection.js');
Window.prototype.$l = function (arg) {
   if (typeof(arg) === "string") {
     const stri = Array.from(document.querySelectorAll(arg));
     return new DOMNodeCollection(stri);
   } else if (arg instanceof HTMLElement) {
     return new DOMNodeCollection( Array.from(arg));
    //  check this later
   }
};
