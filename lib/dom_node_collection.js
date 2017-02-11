class DOMNodeCollection {
  
  constructor(HTMLarray) {
    this.nodes = HTMLarray;
    return this;
  }

  on(eventName, callback) {
    this.nodes.forEach(node => {
      node.addEventListener(eventName, callback);
      const eventKey = `dollarDomEvents-${eventName}`;
      if (typeof node[eventKey] === "undefined") {
        node[eventKey] = [];
      }
      node[eventKey].push(callback);
    });
  }

  off(eventName){
    this.nodes.forEach(node=> {
      const eventKey = `dollarDomEvents-${eventName}`;
      if (node[eventKey]){
        node[eventKey].forEach(callback => {
          node.removeEventListener(eventName, callback);
        });
      }
    });
  }

  html () {
    const args = Array.from(arguments);
    if (args.length > 0){
      let newText = args[0];
      this.nodes.forEach(function(el){
        el.innerHTML = newText;
      });
    } else {
      return this.nodes[0];
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
      this.nodes.forEach(node => node.innerHTML += children);
    } else if (children instanceof DOMNodeCollection) {
      this.nodes.forEach(node => {
        children.forEach(childNode => {
            node.appendChild(childNode.cloneNode(true));
        });
      });
    }
  }


  attr(key, val) {
    if (typeof val === "string") {
      this.nodes.forEach( node => node.setAttribute(key, val) );
    } else {
      return this.nodes[0].getAttribute(key);
    }
  }

  addClass(...classNames) {
    this.nodes.forEach(function(el){
      el.classList.add(...classNames);
    });
  }

  removeClass(...classNames) {
    this.nodes.forEach(function(el){
      el.classList.remove(...classNames);
    });
  }

  children(){
    let kids = [];
    this.nodes.forEach(function(el){
      kids.push(el.children);
    });
    return kids;
  }

  parent(){
    let parents = [];
    this.nodes.forEach(function(el){
      if (parents.includes(el.parentNode)) { return;}
      parents.push(el.parentNode);
    });
    return parents;
  }

  find(searchNodeString){
    const found = [];
    this.nodes.forEach( (node)=> {
      found.push(node.querySelectorAll(searchNodeString));
    });
    return found;
  }


  remove(findAndDestroy){
    const toRemove = this.find(findAndDestroy);
    toRemove[0].forEach((child)=>{
      this.html().removeChild(child);
    });
  }


}

module.exports = DOMNodeCollection;
