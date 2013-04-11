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
        message: util.format("Expected %s to equal %s",actual,expected),
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
var negate = function (f) {
  return function () {
    var expected = Array.prototype.slice.call(arguments, 0);
    return function (actual) {
      var test = f.apply(this, expected)(actual);
      test.message = (test.message.match("to")) 
                        ? test.message.replace('to', 'not to') 
                        : test.message.replace('have', 'have no');
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
var has = {
  listItem: function(expected){
    return function(actual){
      actual = (actual.nodeType != 1) ? dom.getElement(actual) : actual;
      expected = (expected == "") ? null : expected;   
      if(actual == null){
        return{
          message: util.format("No List to check found"),
          success: false
        };
      }      
      return{
        message: util.format("The %s (id: "+actual.getAttribute("id")+")  has no node %s ",actual.tagName,((expected.nodeType !=1) ? expected : expected.tagName)),
        success: dom.hasNode(actual,expected)
      };
   };
  },
  lengthOf: function(expected,opt){
    return function(actual){
      actual = (actual.nodeType != 1) ? dom.getElement(actual) : actual;
      if(actual == null || actual == "" || !actual){
        return {
          message: util.format("No Node do count found"),
          success: false
        };
      }
      //console.log(actual);
      var count = dom.count(actual,opt);
      return{
        message: util.format("Expected %s to equal %s",expected,count),
        success: cmp.eq(count, expected)
      };
    };
  },
  tag: function(expected){
    return function(actual){
      if(expected == null || !expected){
        return{
          message: util.format("Expected not found"),
          success: false
        }
      }
      if(actual == "" || actual == "document"){
        return {
          message: util.format("Document has no tag called %s.",expected),
          success: dom.getElement(expected)
        }
      }
      actual = (typeof actual == "string") ? dom.getElement(actual) : actual;
      expected = (typeof expected == "string") ? dom.getElement(expected) : expected;
      if(actual == null || expected == null){
        return{
          message: util.format("No DOM elements found"),
          success: false
        };
      }
      if(typeof expected == "object" && expected.length >1){
        //there arr more than on tag that could match with the expected
        var success = false;
        for(i in expected){
          if(dom.hasNode(actual,expected[i])){
            success = true;
            break;
          }
        }
        return {
          message: util.format("%s (id: "+actual.getAttribute("id")+") has no %s inside",actual.tagName,expected),
          success: success
        };         
      }
      return {
        message: util.format("%s (id: "+actual.getAttribute("id")+") has no %s inside",actual.tagName,expected.tagName),
        success: dom.hasNode(actual,expected)
      };       
    };
  },
  childTag:function(expected)
    {
      return function(actual){
        actual = (actual.nodeType != 1) ? dom.getElement(actual) : actual;
        expected = (expected.nodeType != 1) ? dom.getElement(expected) : expected;
        if(actual == null || expected == null){
          return{
            message: util.format("Parent & Child can`t be NULL"),
            success: false
          };
        }
        var childs = actual.childNodes || array();
        for(i in childs)
        {
          if(childs[i].nodeType == 1 && childs[i].isEqualNode(expected))
          {
            return {
              message: util.format("%s (id: "+actual.getAttribute('id')+") should have Child like %s (id: "+expected.getAttribute('id')+")",actual.tagName,expected.tagName),
              success: true
            }
          }
        }
        return{
          message: util.format("%s (id: "+actual.getAttribute('id')+") should have a Child like %s",actual.tagName,((expected == null) ? null : expected.tagName)), //getting trouble with negation, if tag not exist
          success: false
        }
      };
    },
  childText:function(expected){
    return function(actual){
        actual = (actual.nodeType != 1) ? dom.getElement(actual) : actual;
        expected = (expected == "") ? null : expected;
        if(actual == null || expected == null){
          return{
            message: util.format("Parent & Child can`t be NULL"),
            success: false
          };
        }      
        var childs = actual.childNodes || array();
        for(i in childs){
          if(childs[i].nodeType == 3 && childs[i].nodeValue == expected){
            return{
              message: util.format("%s (id: "+actual.getAttribute('id')+") should have a text node like %s",actual.tagName,expected), //getting trouble with negation, if tag not exist
              success: true
            };
          }
        }
        return{
          message: util.format("%s (id: "+actual.getAttribute('id')+") should have a text node like %s",actual.tagName,expected), //getting trouble with negation, if tag not exist
          success: false
        };        
    };

  }, 
  attribute: function(expected,attr){
    
    return function(actual){
      var tag = null, tagName = "document",res=null;
      if(actual == "document" || actual == ""){
        if(!expected){
          return{
            message: util.format("No match with empty expected and actual"),
            success: false
          };
        }
        tag = document.getElementById(expected);
      }
      else{
        if(actual == null){
          return{
            message: util.format("The value of acutal can`t be NULL"),
            success: false
          };
        }
        tag = actual;
        tagName = actual.tagName;
      }
      res = (tag != null) ? tag.getAttribute(attr) : false; 
      if(!expected){ 
        return{
          message: util.format(tagName+" contains no attribute with name "+attr),
          success: (res) ? true : false
        };
      }
        return{
          message: util.format(tagName+" contains no attribute with name "+attr+" and value "+expected),
          success: (res == expected) ? true : false
        };
    };
  },
  class: function(expected){return function(actual){var f = has.attribute(expected,"class"); return f(actual);};},
  id: function(expected){return function(actual){var f = has.attribute(expected,"id"); return f(actual);};}

};
has.no = {};
for(i in has){
  
  if(has.hasOwnProperty(i)){
    has.no[i] = negate(has[i]);
  }  
}



var assert = (function(){
  return{
    that: function(actual,constraint){
    var test = constraint(actual);
    if (!test.success) {
      throw new Error(test.message);
      }
    },
    throws:function(f){
      //simple test if something throws
      try{
        f();
      }
      catch(err){
        return true;
      }
      throw new Error("Your Function should throw, but didn`t do it.");
    },
    doesNotThrow: function(f){
      //simple test if something not throws
      
      try{
        f();
      }
      catch(err){
        throw new Error("Your Funktion shouldn`t throw, but it did: "+err.message);
      }
      return true;
    }     
  };
})();
/**
 * Because i don`t want to import another module because of one method, i write it on my own
 * in an short way
 */
var util = {};
util.format = function(){
  
  var string = null
    , allArgs = []
    , splittedText = []; 
  if(arguments.length > 0){
    for(i in arguments){
      if(i == 0){
        string = String(arguments[i]);
      }
      else{
        allArgs.push(arguments[i]);
      }
      
    }
  }
  else{
    throw new Error("There was no string givven");
  }
  splittedText = string.split("%s");
  if(allArgs.length == (splittedText.length-1))
    {
      for(i in splittedText)
        {
          //not the first one
          if(i)
            {
              splittedText[i] = allArgs[i-1]+" "+splittedText[i];
            }
        }      
        return splittedText.join("");
    }
    else{
      throw new Error("Submitted parameters doesn`t match with the string");
    }
};
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
var dom = (function(){
  var isId = function(text){
    var n = text.indexOf("#");
    return (n == 0);
  };
  var isClass = function(text){
    var n = text.indexOf(".");
    return (n == 0);
  };
  return{
    getElement: function(name){
      if(name.nodeType != 1 && name.length > 0){
        if(isId(name)){
          name = name.replace("#","");
          return document.getElementById(name); //cool i can use the native function ;-)
        }
        //as default it will retaun ByTagName
       return document.getElementsByTagName(name);
      }
      return name;
        
      
    },
    hasNode: function(parent,node){
      if(parent != null){
        var children = parent.childNodes;
        for(i in children){
          
          if(node != null || node == ""){
            switch(node.nodeType){
              case 1:
                //Than i have to look for an 
                if(children[i].tagName == node.tagName){
                  return true;
                }
                break;
              case 3:
                if(children[i].nodeType == 3 && children[i].nodeValue == node.nodeValue){
                  return true;
                }
                break;
              default:
                //than i have to look for a simple text
                if(children[i].nodeType == 3 && children[i].nodeValue == node){
                  return true;
                }
            }
            if(children[i].childNodes && children[i].childNodes.length > 0){
                //Than we go on step deeper

                return dom.hasNode(children[i],node);
            }            
          }
       }
        return false;
      }
    },
    count: function(node,opt){
      var child = node.childNodes;
      var countChild = 0;
      var countOpt = 0;
      var countAll = 0;
      for(i in child){
        if(child[i].nodeType == 1){
          countChild++;
          countAll++;
          if(opt && opt != "all"){
            //Check if it is the tag what we are looking for
            if(child[i].tagName == opt.toUpperCase()){
              countOpt++;
            }
          }
          if(opt == "all"){
            countAll = countAll + dom.count(child[i],opt);
          }          
        }
      }
      //console.log("normal: "+countChild+" opt("+opt+"): "+countOpt+" all "+ countAll);
      return (!opt) ? countChild : (opt == "all") ? countAll : countOpt ;
    }
  };
})();
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

