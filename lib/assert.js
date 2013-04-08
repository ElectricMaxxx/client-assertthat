var is = {
  atLeast: function (expected) {
    return function (actual) {
      return {
        message: util.format('Expected %s to be at least %s.', actual, expected),
        success: cmp.ge(actual, expected)
      };
    };
  },

  atMost: function (expected) {
    return function (actual) {
      return {
        message: util.format('Expected %s to be at most %s.', actual, expected),
        success: cmp.le(actual, expected)
      };
    };
  },

  between: function (expectedLow, expectedHigh) {
    return function (actual) {
      return {
        message: util.format('Expected %s to be between %s and %s.', actual, expectedLow, expectedHigh),
        success: cmp.ge(actual, expectedLow) && cmp.le(actual, expectedHigh)
      };
    };
  },

  equalTo: function (expected) {
    return function (actual) {
      return {
        message: "Expected "+actual+" to equal "+expected,
        success: cmp.eq(actual, expected)
      };
    };
  },

  false: function () {
    return function (actual) {
      return {
        message: util.format('Expected %s to be false.', actual),
        success: cmp.eq(actual, false)
      };
    };
  },

  falsy: function () {
    return function (actual) {
      return {
        message: util.format('Expected %s to be falsy.', actual),
        success: cmp.eq(actual, false) || cmp.eq(actual, 0) || cmp.eq(actual, '') || cmp.eq(actual, null) || cmp.eq(actual, undefined)
      };
    };
  },

  greaterThan: function (expected) {
    return function (actual) {
      return {
        message: util.format('Expected %s to be greater than %s.', actual, expected),
        success: cmp.gt(actual, expected)
      };
    };
  },

  lessThan: function (expected) {
    return function (actual) {
      return {
        message: util.format('Expected %s to be less than %s.', actual, expected),
        success: cmp.lt(actual, expected)
      };
    };
  },

  NaN: function () {
    return function (actual) {
      return {
        message: util.format('Expected %s to be NaN.', actual),
        success: typeof actual === 'number' && isNaN(actual)
      };
    };
  },

  null: function () {
    return function (actual) {
      return {
        message: util.format('Expected %s to be null.', actual),
        success: cmp.eq(actual, null)
      };
    };
  },

  ofType: function (expected) {
    return function (actual) {
      return {
        message: util.format('Expected %s to be of type %s.', actual, expected),
        success: typeof actual === expected
      };
    };
  },

  sameAs: function (expected) {
    return function (actual) {
      console.log(typeof expected);
      console.log(typeof actual);
      return {
        message: "Expected "+actual+" to be the same as "+expected,
        success: cmp.id(actual, expected)
      };
    };
  },

  throwing: function (expected) {
    return function (actual) {
      try {
        actual();
      }
      catch (err) {
        if (!expected) {
          return {
            success: true
          };
        }
        if (err.message === expected) {
          return {
            success: true
          };
        }
        return {
          message: 'Expected an exception with message \'' + expected + '\' to be thrown.',
          success: false
        };
      }
      return {
        message: 'Expected an exception to be thrown.',
        success: false
      };
    };
  },

  true: function () {
    return function (actual) {
      return {
        message: util.format('Expected %s to be true.', actual),
        success: cmp.eq(actual, true)
      };
    };
  },

  undefined: function () {
    return function (actual) {
      return {
        message: util.format('Expected %s to be undefined.', actual),
        success: cmp.eq(actual, undefined)
      };
    };
  }          
};
var has = {
  listItem: function(expected){
    return function(actual){
      var childs = actual.childNodes || array();
      for(i in childs)
        {
          if(childs[i].nodeName == "LI"){
            //If there are othe tags inside the li
            var liChilds = childs[i].childNodes;
            for(j in liChilds)
              {
                if(liChilds[j].nodeValue == expected){
                  
                  return {
                    success: true
                  };
                }
              }
          }
        }
      return {
        message: "There is no listItem with content "+expected+" in the List",
        success: false
      }
    };
  },
  id:function(expected){
  return function(actual){
    if(actual == "")
      {
        return{
          message: "The id "+actual+" does not exist",
          success: (document.getElementById(expected)) ? true : false
        };        
      }
    return{
          message: "I am not able to check this at the moment",
          success: false
    };
  };
  },
  tag: {
    in: function(expected){
      return function(actual){
        var res = document.getElementById(actual);
        if(!res)
          {
            return{
            message: "The id "+actual+" does not exist",
            success: false
            };
          }
        if(!exptected){
          return {
            success: true
          };
        }
        return {
          message: "I am not able to check this at the moment",
          success: false
        };
      };

    }
  },
  child:  function(expected)
  {
    return function(actual){
      var childs = actual.childNodes || array();
      for(i in childs)
      {
        var success = false;
        if(childs[i].isEqualNode(expected))
        {
          success = true;
          break;
        }
      }
      if(success)
      {
        return{
          sucess: success
        }
      }
      return{
        message: "The node "+expected+" has no childnode like "+expected,
        success: success
      }
    };
  }          
};
var negate = function (f) {
  return function () {
    var expected = Array.prototype.slice.call(arguments, 0);
    return function (actual) {
      var test = f.apply(this, expected)(actual);
      test.message = test.message.replace('to', 'not to');
      test.success = !test.success;
      return test;
    };
  };
};  
is.not = {};
for (var i in is) {
  if (is.hasOwnProperty(i)) {
    is.not[i] = negate(is[i]);
  }
}
var assert = (function(){
  return{
    that: function(actual,constraint){
    var test = constraint(actual);
    if (!test.success) {
      throw new Error(test.message);
      }
    }
  };
})();

var cmp = {
  eq: function (first, second) {
    // If two functions shall be compared, compare their source code.
    if(typeof first === 'function' && typeof second === 'function') {
      first = first.toString();
      second = second.toString();
    }

    // Objects are compared as subsets, but only if both are defined (i.e. not null, undefined, ...).
    if(typeof first === 'object' && typeof second === 'object' && first && second) {
      return isSubset(first, second) && isSubset(second, first);
    }

    return first === second;
  },

  eqs: function (first, second) {
    // If exactly one is null, they are not equal by structure.
    if((first && !second) || (!first && second)) {
      return false;
    }

    // If both are null, they are equal by structure.
    if(!first && !second) {
      return true;
    }

    return isSubsetStructure(first, second) && isSubsetStructure(second, first);
  },

  ne: function (first, second) {
    return !(this.eq(first, second));
  },

  nes: function (first, second) {
    return !(this.eqs(first, second));
  },

  gt: function (first, second) {
    // If at least one parameter is a function, greater than does not make sense.
    if(typeof first === 'function' || typeof second === 'function') {
      return false;
    }

    // Objects are compared as subsets, but only if both are defined (i.e. not null, undefined, ...).
    if(typeof first === 'object' && typeof second === 'object' && first && second) {
      return isSubset(second, first) && !isSubset(first, second);
    }

    // If an object is compared with null, neither is greater.
    if((typeof first === 'object' && !second) || (typeof second === 'object' && !first)) {
      return false;
    }

    return first > second;
  },

  gts: function (first, second) {
    // If the second object is null, the first is greater by structure.
    if(first && !second) {
      return true;
    }

    // Otherwise, if the first is null, it is not greater (no matter what the second is).
    if(!first) {
      return false;
    }

    // If both are not null, compare as a subset. Note that second must be a subset of first, if first
    // is greater than second.
    return isSubsetStructure(second, first) && !isSubsetStructure(first, second);
  },

  ge: function (first, second) {
    return this.gt(first, second) || this.eq(first, second);
  },

  ges: function (first, second) {
    return this.gts(first, second) || this.eqs(first, second);
  },

  lt: function (first, second) {
    // If at least one parameter is a function, less than does not make sense.
    if(typeof first === 'function' || typeof second === 'function') {
      return false;
    }

    // Objects are compared as subsets, but only if both are defined (i.e. not null, undefined, ...).
    if(typeof first === 'object' && typeof second === 'object' && first && second) {
      return isSubset(first, second) && !isSubset(second, first);
    }

    // If an object is compared with null, neither is greater.
    if((typeof first === 'object' && !second) || (typeof second === 'object' && !first)) {
      return false;
    }

    return first < second;
  },

  lts: function (first, second) {
    // If the first object is null, it is less by structure.
    if(!first && second) {
      return true;
    }

    // Otherwise, if the second is null, the first is not less (no matter what it is).
    if(!second) {
      return false;
    }

    // If both are not null, compare as a subset. Note that first must be a subset of second, if first
    // is less than second.
    return isSubsetStructure(first, second) && !isSubsetStructure(second, first);
  },

  le: function (first, second) {
    return this.lt(first, second) || this.eq(first, second);
  },

  les: function (first, second) {
    return this.lts(first, second) || this.eqs(first, second);
  },

  id: function (first, second) {
    // Functions and objects need to be compared by reference, all other types are compared by value.
    if((typeof first === 'function' && typeof second === 'function') || 
       (typeof first === 'object' && typeof second === 'object' )) {
      return first === second;
    }

    return this.eq(first, second);
  }
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
