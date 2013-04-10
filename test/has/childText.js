
suite("Testing has.childText()",function(){
  suite("Actual is selected by id selector",function(){
    suite("No TextNode in Parent",function(){

      test("actual=null => error",function(){
        assert.throws(function(){
          assert.that("#falsy",has.childText());
        });
      });
      test("expected=null => error",function(){
        assert.throws(function(){
          assert.that("#sandBox",has.childText("#falsy"));
        });
      });
      test("not expected => OK",function(){
        assert.doesNotThrow(function(){
          assert.that("#sandBox",has.no.childText("myText"));
        });
      });
    });
    suite("TextNode in Parent exists",function(){
      setup(function(){
        var sandBox = document.getElementById("sandBox");
        var text = document.createTextNode("myText");
        sandBox.appendChild(text);
      });
      teardown(function(){
        var sandBox = document.getElementById("sandBox");
        sandBox.innerHTML = ""; //clear SandBox
      });
      test("expected => OK",function(){
        assert.doesNotThrow(function(){
          assert.that("#sandBox",has.childText("myText"));
        });
      });
      test("not expected => error",function(){
        assert.throws(function(){
          assert.that("#sandBox",has.no.childText("myText"));
        });
      });
      test("expected/nested => OK",function(){
        assert.doesNotThrow(function(){
          var sandBox = document.getElementById("sandBox");
          var nestDiv = document.createElement("DIV");
          sandBox.appendChild(nestDiv);
          assert.that("#sandBox",has.childText("myText"));
        });
      });
    });
  });
  suite("Actual is an DOM element",function(){
    suite("No TextNode in Parent",function(){
      setup(function(){
        var sandBox = document.getElementById("sandBox");
      });
      test("actual=null => error",function(){
        assert.throws(function(){
          assert.that(null,has.childText());
        });
      });
      test("expected => error",function(){
        assert.throws(function(){
          assert.that(sandBox,has.childText("myText"));
        });
      });
      test("not expected => OK",function(){
        assert.doesNotThrow(function(){
          assert.that(sandBox,has.no.childText("myText"));
        });
      });
    });
    suite("TextNode in Parent exists",function(){
      setup(function(){
        var sandBox = document.getElementById("sandBox");
        var text = document.createTextNode("myText");
        sandBox.appendChild(text);
      });
      teardown(function(){
        var sandBox = document.getElementById("sandBox");
        sandBox.innerHTML = ""; //clear SandBox
      });      
      test("expected => OK",function(){
        assert.doesNotThrow(function(){
          assert.that(sandBox,has.childText("myText"));
        });
      });
      test("not expected => error",function(){
        assert.throws(function(){
          assert.that(sandBox,has.no.childText("myText"));
        });
      });
      test("expected/nested => OK",function(){
        assert.doesNotThrow(function(){
          var sandBox = document.getElementById("sandBox");
          var nestDiv = document.createElement("DIV");
          sandBox.appendChild(nestDiv);          
          assert.that(sandBox,has.childText("myText"));
        });
      });
    });    
  });
});


