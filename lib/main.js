const DOMNodeCollection = require('./dom_node_collection.js');

const docReadyCallbacks = [];
let _docReady = false;
Window.prototype.$l = function (arg) {
   if (typeof(arg) === "string") {
       const string_arr = Array.from(document.querySelectorAll(arg));
       return new DOMNodeCollection(string_arr);
   } else if (arg instanceof HTMLElement) {
      return new DOMNodeCollection( Array.from(arg));
   } else if (typeof(arg) === "function") {
      registerDocReady(arg);
   }
};

$l.extend = (base, ...otherObjects) => {
  otherObjects.forEach(otherObj => {
    for (let prop in otherObj) {
      base[prop] = otherObj[prop];
    }
  });
  return base;
};

$l.ajax = (request) => {
  const defaults = {
    method: "GET",
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    url: "",
    success: () => {},
    error: () => {},
    data: {},
  };
    let options = $l.extend(defaults, request);
    options.method = options.method.toUpperCase();

    const xhr = new XMLHttpRequest();
    xhr.open(options.method, options.url, true);

    xhr.onload = function() {
      if (xhr.status === 200){
        options.success(JSON.parse(xhr.response));
      } else {
        options.error(JSON.parse(xhr.response));
      }
    };
    xhr.send(JSON.stringify(options.data));

};

registerDocReady = func => {
  if ( !_docReady ) {
     docReadyCallbacks.push(func);
  } else {
    func();
  }
};

document.addEventListener('DOMContentLoaded', () => {
  _docReady = true;
  docReadyCallbacks.forEach( func => func() );
});
