
var falsyDiv = document.createElement("DIV");
var truthyTag = document.createElement("DIV");
var li = document.createElement("LI");
li.setAttribute("id","testLI");
truthyTag.appendChild(li);
truthyTag.setAttribute("id","test");
suite("Test the has.tag()",function(){
  suite("Call by Tagname",function(){
    suite("Not available",function(){
      test("don`t has this tag in global => error (can`t test because mocha has lots of li *g*)",function(){

      });    
      test("Don`t has this tag in an other => error",function(){
        assert.throws(function(){
          assert.that(falsyDiv,has.tag("li"));
        });      
      });
      test("no expect => OK (can`t test because mocha has lots of li *g*)",function(){
      });
    });
    suite("Is available",function(){
      test("tag global available => ok",function(){
         assert.doesNotThrow(function(){
           assert.that("",has.tag("div"));
         });
      });
      test("tag in other tag available => ok",function(){
         assert.doesNotThrow(function(){
           assert.that(truthyTag,has.tag("li"));
         });
      });
      test("not expected => error",function(){
        assert.throws(function(){
          assert.that("",has.no.tag("li"));   
        });
      });
    });    
  });
  suite("Call expected by id",function(){
    setup(function(){
      var sandBox = document.getElementById("sandBox");
      sandBox.appendChild(truthyTag);
      sandBox.appendChild(falsyDiv);
    });
    teardown(function(){
      var sandBox = document.getElementById("sandBox");
      sandBox.innerHTML = "";
    });
    suite("Not available",function(){
      test("don`t has this tag in global => error",function(){
        assert.throws(function(){
          var sandBox = document.getElementById("sandBox");
          sandBox.innerHTML = "";
          assert.that("",has.tag("#testLI"));
        });
      });    
      test("Don`t has this tag in an other => error",function(){
        assert.throws(function(){
          assert.that(falsyDiv,has.tag("#testLI"));
        });      
      });
      test("no expect => OK",function(){
        assert.doesNotThrow(function(){
          assert.that(falsyDiv,has.no.tag("#testLI"));
        });
      });
    });
    suite("Is available",function(){
      test("tag global available => ok",function(){
         assert.doesNotThrow(function(){
           assert.that("",has.tag("#test"));
         });
      });
      test("tag in other tag available => ok",function(){
         assert.doesNotThrow(function(){
           assert.that(truthyTag,has.tag("#testLI"));
         });
      });
      test("no Expect => error",function(){
        assert.throws(function(){
          console.log(truthyTag);
          assert.that(truthyTag,has.no.tag("#testLI"));
        });
      });
    });    
  });

});

