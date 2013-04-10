
suite("Testing has.childTag()",function(){
  suite("Testing with an id selector",function(){
    setup(function(){
      var sandBox = document.getElementById("sandBox");
      var testChild = document.createElement("DIV");
      sandBox.appendChild(testChild);
      testChild.setAttribute("id","testChild");
    });
    teardown(function(){
      var sandBox = document.getElementById("sandBox");
      var testChild = document.getElementById("testChild");
      sandBox.removeChild(testChild);
      
    });
    suite("Child in Parent",function(){
      test("Child exist in Parent => OK",function(){
        assert.doesNotThrow(function(){
          assert.that("#sandBox",has.childTag("#testChild"))
        });
      }); 
      test("Child not Expected => error",function(){
        assert.throws(function(){
          assert.that("#sandBox",has.no.childTag("#testChild"))
        });
      });
    });
    suite("No Child in Parent",function(){
      setup(function(){
        var falsyTag = document.createElement("DIV");
        var sandBox = document.getElementById("sandBox");
        sandBox.appendChild(falsyTag);
        falsyTag.setAttribute("id","falsyTag");        
      });
      teardown(function(){
        var falsyTag = document.getElementById("falsyTag");
        var sandBox = document.getElementById("sandBox");
        sandBox.removeChild(falsyTag);
      });
      test("actual = null => error",function(){
        assert.throws(function(){
          assert.that("#falsy",has.childTag("#falsy"));
        });
      }); 
      test("expected = null => error",function(){
        assert.throws(function(){
          assert.that("#test",has.childTag("#falsy"));
        });
      }); 
      test("expected not in parent => error",function(){
        assert.throws(function(){
           assert.that("#testChild",has.childTag("#falsyTag"));
        });
      });      
    });
  });
  suite("Test with given DOM-Elements",function(){
    suite("Child in Parent",function(){
      setup(function(){
        var sandBox = document.getElementById("sandBox");
        var testChild = document.createElement("DIV");
        sandBox.appendChild(testChild);
        testChild.setAttribute("id","testChild");
      });
      teardown(function(){
        var sandBox = document.getElementById("sandBox");
        var testChild = document.getElementById("testChild");
        sandBox.removeChild(testChild);
      });
      test("right Child => OK",function(){
        assert.doesNotThrow(function(){
          assert.that(sandBox,has.childTag("#testChild"));
        });
      });
      test("not expected => error",function(){
        assert.throws(function(){
          assert.that(sandBox,has.no.childTag("#testChild"));          
        });
      });
      
    });
    suite("No Child in Parent",function(){
      test("expected not in parent => error",function(){
        assert.throws(function(){
          assert.that(sandBox,has.childTag("#mocha"));
        });
      });
      test("expected = null => error",function(){
        assert.throws(function(){
          assert.that(sandbox,has.childTag("#falsy"));
        });
      });      
    });
  });
});
