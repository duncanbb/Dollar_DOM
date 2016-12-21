= dollar-DOM -- Lightweight and easy HTML document traversal and manipulation

dollar-DOM is a fast, lightweight JavaScript library that makes for easy event
handling, AJAX requests, and HTML element manipulation.
A short rundown of some of the major features:

* DOM manipulation through methods like .on to add eventHandler callbacks:

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

Append which allows elements to be added to the page:

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

* Perform asynchronous AJAX requests.

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
