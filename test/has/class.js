var _this = this;

suite("Test the has.class() function ", function() {
  setup(function() {
    var falsyClass, sandbox, truthyClass;
    sandbox = document.getElementById("sandBox");
    falsyClass = document.createElement("P");
    falsyClass.setAttribute("id", "falsyClass");
    truthyClass = document.createElement("P");
    truthyClass.setAttribute("id", "truthyClass");
    truthyClass.setAttribute("class", "myClass");
    sandbox.appendChild(truthyClass);
    sandbox.appendChild(falsyClass);
  });
  teardown(function() {
    var falsyClass, sandbox, truthyClass;
    sandbox = document.getElementById("sandBox");
    truthyClass = document.getElementById("truthyClass");
    falsyClass = document.getElementById("falsyClass");
    sandbox.removeChild(truthyClass);
    sandbox.removeChild(falsyClass);
  });
  suite("nothing available", function() {
    suite("actual by a DOM element", function() {
      test("actual null, class expected => error", function() {
        assert.throws(function() {
          assert.that(null, has.class);
        });
      });
      test("actual null, class not expected => error", function() {
        assert.throws(function() {
          assert.that(null, has.no.class);
        });
      });
    });
    suite("actual as an css selector", function() {
      test("actual null, class expected => error", function() {
        assert.throws(function() {
          assert.that("#falsy", has.class);
        });
      });
      test("actual null, class not expected => error", function() {
        assert.throws(function() {
          assert.that("#falsy", has.no.class);
        });
      });
    });    
  });
  suite("actual is available", function() {
    suite("actual by an DOM element", function() {
      test("no class there, no expected => OK", function() {
        assert.doesNotThrow(function() {
          var actual;
          actual = document.getElementById("falsyClass");
          assert.that(actual, has.no.class());
        });
      });
      test("Class exist, expected => OK", function(){
        assert.doesNotThrow(function() {
          var actual;
          actual = document.getElementById("truthyClass");
          assert.that(actual, has.class());
          });
      });
      test("Class exist, not expected => error", function (){
        assert.throws(function() {
          var actual;
          actual = document.getElementById("truthyClass");
          assert.that(actual, has.no.class());
        });
      });
      test("Class exist, this not expected => error", function() {
        assert.throws(function() {
          var actual;
          actual = document.getElementById("truthyClass");
          asser.that(actual, has.no.class("myClass"));
        });
      });
      test("Class exist, this expected => OK", function() {
        assert.doesNotThrow(function() {
          var actual;
          actual = document.getElementById("truthyClass");
          assert.that(actual, has.class("myClass"));
        });
      });
      test("Class exist,other expected => error", function() {
        assert.throws(function() {
          var actual;
          actual = document.getElementById("truthyClass");
          asser.that(actual, has.class("test"));
        });
      });
      test("Class exist,other not expected => OK", function() {
        assert.doesNotThrow(function() {
          var actual;
          actual = document.getElementById("truthyClass");
          assert.that(actual, has.no.class("test"));
        });
      });
      test("Multiple exist, one match, that is not expected => error", function() {
        assert.throws(function() {
          var actual, oldClass;
          actual = document.getElementById("truthyClass");
          oldClass = actual.getAttribute("class");
          actual.setAttribute("class", "test " + " " + oldClass);
          asser.that(actual, has.no.class());
        });
      });
      test("Multiple exist, one match, that ist expected => OK", function() {
        assert.doesNotThrow(function() {
          var actual, oldClass;
          actual = document.getElementById("truthyClass");
          oldClass = actual.getAttribute("class");
          actual.setAttribute("class", "test " + " " +oldClass);
          console.log(actual.getAttribute("class"));
          assert.that(actual, has.class("myClass"));
        });
      });
      test("Multiple exist, one match, not specific expected => OK", function() {
        assert.doesNotThrow(function() {
          var actual, oldClass;
          actual = document.getElementById("truthyClass");
          oldClass = actual.getAttribute("class");
          actual.setAttribute("class", "test " + " " + oldClass);
          assert.that(actual, has.class());
        });
      });
      test("Multiple exist, one match, not specific not expected => error", function() {
        assert.throws(function() {
          var actual, oldClass;
          actual = document.getElementById("truthyClass");
          oldClass = actual.getAttribute("class");
          actual.setAttribute("class", "test " + " " + oldClass);
          asser.that(actual, has.no.class());
        });
      });
    });
    suite("actual as an css selctor", function() {
      test("no class there, no expected => OK", function() {
        assert.doesNotThrow(function() {
          assert.that("#falsyClass", has.no.class());
        });
      });
      test("Class exist, expected => OK", function(){
        assert.doesNotThrow(function() {
          assert.that("#truthyClass", has.class());
          });
      });
      test("Class exist, not expected => error", function (){
        assert.throws(function() {
          assert.that("#truthyClass", has.no.class());
        });
      });
      test("Class exist, this not expected => error", function() {
        assert.throws(function() {
          asser.that("#truthyClass", has.no.class("myClass"));
        });
      });
      test("Class exist, this expected => OK", function() {
        assert.doesNotThrow(function() {
          assert.that("#truthyClass", has.class("myClass"));
        });
      });
      test("Class exist,other expected => error", function() {
        assert.throws(function() {
          asser.that("#truthyClass", has.class("test"));
        });
      });
      test("Class exist,other not expected => OK", function() {
        assert.doesNotThrow(function() {
          assert.that("#truthyClass", has.no.class("test"));
        });
      });
      test("Multiple exist, one match, that is not expected => error", function() {
        assert.throws(function() {
          var actual, oldClass;
          actual = document.getElementById("truthyClass");
          oldClass = actual.getAttribute("class");
          actual.setAttribute("class", "test " + " " + oldClass);
          asser.that("#truthyClass", has.no.class());
        });
      });
      test("Multiple exist, one match, that ist expected => OK", function() {
        assert.doesNotThrow(function() {
          var actual, oldClass;
          actual = document.getElementById("truthyClass");
          oldClass = actual.getAttribute("class");
          actual.setAttribute("class", "test " + " " +oldClass);
          console.log(actual.getAttribute("class"));
          assert.that("#truthyClass", has.class("myClass"));
        });
      });
      test("Multiple exist, one match, not specific expected => OK", function() {
        assert.doesNotThrow(function() {
          var actual, oldClass;
          actual = document.getElementById("truthyClass");
          oldClass = actual.getAttribute("class");
          actual.setAttribute("class", "test " + " " + oldClass);
          assert.that("#truthyClass", has.class());
        });
      });
      test("Multiple exist, one match, not specific not expected => error", function() {
        assert.throws(function() {
          var actual, oldClass;
          actual = document.getElementById("truthyClass");
          oldClass = actual.getAttribute("class");
          actual.setAttribute("class", "test " + " " + oldClass);
          asser.that("#truthyClass", has.no.class());
        });
      });      
    });
  });
  suite("actual is document root",function(){
    suite("empty actual as document root",function(){
      suite("class as single class available",function(){
        test("expected => OK",function(){
          assert.doesNotThrow(function(){
            assert.that("",has.class("myClass"));
          });
        });
        test("not expected => error",function(){
          assert.throws(function(){
            assert.that("",has.no.class("myClass"))
          });
        });
      });
      suite("class available in multi class",function(){
        test("expected => OK",function(){
          assert.doesNotThrow(function(){
              var test = document.getElementById("truthyClass");
              var oldClass = test.getAttribute("class");
              test.setAttribute("class","myTest "+oldClass);            
              assert.that("",has.class("myClass"));
          });
        });
        test("not expected => error",function(){
            assert.throws(function(){
              var test = document.getElementById("truthyClass");
              var oldClass = test.getAttribute("class");
              test.setAttribute("class","myTest "+oldClass);                          
              assert.that("",has.no.clas("myClass"));
            });
        });        
      });
    });
    test("empty expected => error",function(){
      assert.throws(function(){
        assert.that("",has.class());
      });
    });
    suite("with 'document' as actual",function(){
    suite("empty actual as document root",function(){
      suite("class as single class available",function(){
        test("expected => OK",function(){
          assert.doesNotThrow(function(){
            assert.that("document",has.class("myClass"));
          });
        });
        test("not expected => error",function(){
          assert.throws(function(){
            assert.that("document",has.no.class("myClass"))
          });
        });
      });
      suite("class available in multi class",function(){
        test("expected => OK",function(){
          assert.doesNotThrow(function(){
              var test = document.getElementById("truthyClass");
              var oldClass = test.getAttribute("class");
              test.setAttribute("class","myTest "+oldClass);            
              assert.that("document",has.class("myClass"));
          });
        });
        test("not expected => error",function(){
            assert.throws(function(){
              var test = document.getElementById("truthyClass");
              var oldClass = test.getAttribute("class");
              test.setAttribute("class","myTest "+oldClass);                          
              assert.that("document",has.no.clas("myClass"));
            });
        });        
      });
    });
    test("empty expected => error",function(){
      assert.throws(function(){
        assert.that("document",has.class());
      });
    });      
    });
  });
});
