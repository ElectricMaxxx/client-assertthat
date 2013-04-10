var expected =  document.createElement("LI");

//For the correct example
var truthyDOM = document.createElement("UL");
var li = document.createElement("LI");
truthyDOM.appendChild(li);

var falsyDOM = document.createElement("UL");
var p = document.createElement("P");
falsyDOM.appendChild(p);
suite("Tests with an expected tag as DOM Element",function(){
  suite("No Child in a Parent",function(){

    test("child expected => error",function(){
      assert.throws(function(){
         assert.that(falsyDOM,has.child(expected));
      });
    });
    test("child not expected => OK",function(){
      assert.doesNotThrow(function(){
        assert.that(falsyDOM,has.no.child(expected))
      });
    });    
  });
  suite("There is a Child",function(){
    test("child expected => OK",function(){
      assert.doesNotThrow(function(){
        assert.that(truthyDOM,has.child(expected));
      });
    });
    test("wrong child expected => error",function(){
      assert.throws(function(){
        assert.that(falsyDOM, has.child(expected));
      });
    });  
    test("child not expected, but exist => error",function(){
      assert.throws(function(){
        assert.that(truthyDOM,has.no.child(expected));
      });
    });  

  });
});
