suite("Test the has.tag()",function(){
  suite("Call by Tagname",function(){
    setup(function(){
      var sandBox = document.getElementById("sandBox");
      sandBox.appendChild(document.createElement("P"));
      sandBox.appendChild(document.createElement("P"));
      sandBox.appendChild(document.createElement("P"));
    });    
    teardown(function(){
      var sandBox = document.getElementById("sandBox");
      sandBox.innerHTML = "";
    });
    suite("Not available",function(){
      test("don`t has this tag in global => error ",function(){
        assert.throws(function(){
          assert.that("",has.tag("k"));
        });
      });    
      test("Don`t has this tag in an other => error",function(){
        assert.throws(function(){
          var actual = document.getElementById("testList");
          assert.that(actual,has.tag("li"));
        });      
      });
      test("no expect => OK",function(){
        assert.doesNotThrow(function(){
          var actual = document.getElementById("sandBox");
          assert.that(actual,has.no.tag("k"));
        });
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
           var actual = document.getElementById("sandBox");
           actual.appendChild(document.createElement("P").appendChild(document.createElement("LI")));
           assert.that(actual,has.tag("li"));
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
      sandBox.appendChild(document.createElement("P"));
      sandBox.appendChild(document.createElement("P"));
      sandBox.appendChild(document.createElement("P"));
    });    
    teardown(function(){
      var sandBox = document.getElementById("sandBox");
      sandBox.innerHTML = "";
    });    
    suite("Not available",function(){
      test("don`t has this tag in global => error",function(){
        assert.throws(function(){
          assert.that("",has.tag("#testLI"));
        });
      });    
      test("Don`t has this tag in an other => error",function(){
        assert.throws(function(){
          assert.that("#sandBox",has.tag("#testLI"));
        });      
      });
      test("no expect => OK",function(){
        assert.doesNotThrow(function(){
          assert.that("#sandBox",has.no.tag("#testLI"));
        });
      });
    });
    suite("Is available",function(){
      test("tag global available => ok",function(){
         assert.doesNotThrow(function(){
           assert.that("",has.tag("#sandBox"));
         });
      });
      test("tag in other tag available => ok",function(){
         assert.doesNotThrow(function(){
           var actual = document.getElementById("sandBox");
           var li = document.createElement("LI");
           li.setAttribute("id","testLI");
           actual.appendChild(document.createElement("P").appendChild(li));
           assert.that("#sandBox",has.tag("#testLI"));
         });
      });
      test("no Expect => error",function(){
        assert.throws(function(){
          assert.that(truthyTag,has.no.tag("#testLI"));
        });
      });
    });    
  });
  suite("Call expected and actual by id",function(){
    suite("Not available",function(){
      test("Don`t has this tag in an other => error",function(){
        assert.throws(function(){
          assert.that("#test",has.tag("#testLI"));
        });      
      });
      test("no expect => OK",function(){
        assert.doesNotThrow(function(){
          assert.that("#test",has.no.tag("#testLI"));
        });
      });
    });
    suite("Is available",function(){
      test("tag in other tag available => ok",function(){
         assert.doesNotThrow(function(){
           var sandBox = document.getElementById("sandBox");
           var li = document.createElement("LI");
           li.setAttribute("id","testLI");
           sandBox.appendChild(li);
           assert.that("#sandBox",has.tag("#testLI"));
         });
      });
      test("no Expect => error",function(){
        assert.throws(function(){
          assert.that("#sandBox",has.no.tag("#testLI"));
        });
      });
    });    
  });

});

