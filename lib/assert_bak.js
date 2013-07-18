var isSubset = function (derived, base) {
  for(var i in derived) {
    if(!base.hasOwnProperty(i) || cmp.ne(derived[i], base[i])) {
      return false;
    }
  }
  return true;
};

var isSubsetStructure = function (derived, base) {
  for(var i in derived) {
    if(typeof base[i] !== typeof derived[i]) {
      return false;
    }
  }
  return true;
};

var bind = function (f, obj) {
  return function () {
    return f.apply(obj, arguments);
  };
};

var wrap = function (f, g) {
  return function () {
    var args = [f].concat(Array.prototype.slice.call(arguments, 0));
    return g.apply(this, args);
  };
};

var unwrap = function (obj) {
  if(obj === null) {
    return obj;
  } else if(typeof obj === 'object' && (obj.constructor === Number || obj.constructor === String || obj.constructor === Boolean)) {
    return obj.valueOf();
  }

  return obj;
};

var processTypes = function (f, first, second) {
  first = unwrap(first);
  second = unwrap(second);

  return f(first, second);
};

var processTypesStructure = function (f, first, second) {
  if(typeof first !== 'object' || typeof second !== 'object') {
    return false;
  }

  if(first && second && (first.constructor === Array || second.constructor === Array)) {
    return false;
  }

  return f(first, second);
};

var setup = function (comparer, f) {
  return wrap(bind(comparer, cmp), f);
};

