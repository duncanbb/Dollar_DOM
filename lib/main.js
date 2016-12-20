const DOMNodeCollection = require('./dom_node_collection.js');
Window.prototype.$l = function (arg) {
   if (typeof(arg) === "string") {
     const string_arr = Array.from(document.querySelectorAll(arg));
     return new DOMNodeCollection(string_arr);
   } else if (arg instanceof HTMLElement) {
     return new DOMNodeCollection( Array.from(arg));
   }
};
