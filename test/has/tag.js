var falsyDiv = document.createElement("DIV");
var truthyTag = document.createElement("DIV");
var li = document.createElement("DIV");
suite("Test the has.tag()",function(){
  suite("Not available",function(){
    test("don`t has this tag in global => error",function(){
      assert.throws(function(){
        assert.that("",has.tag("li"));
      });
    });    
    test("Don`t has this tag in an other => error",function(){
      assert.throws(function(){
        assert.that(falsyDiv,has.tag("li"));
      });      
    });
  });
  suite("Is available",function(){
    test("tag global available => ok",function(){
       assert.doesNotThrow(function(){
         assert.that("",has.tag("li"));
       });
    });
    test("tag in other tag available => ok",function(){
       assert.doesNotThrow(function(){
         assert.that(truthyTag,has.tag("li"));
       });
    });    
  });
});

