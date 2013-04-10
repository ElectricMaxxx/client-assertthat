
var testList = document.createElement("UL");
var truthyList = document.createElement("UL");
var li = document.createElement("LI");
li.appendChild(document.createTextNode("myText"));
truthyList.appendChild(li);

//For nestet Listing
var truthyNestedList = document.createElement("UL");
var li = document.createElement("LI");
li.appendChild(document.createTextNode("myText"));
truthyNestedList.appendChild(li);
var anotherTag = document.createElement("P");
li.appendChild(anotherTag);


//Test not matching things
var trutyListNotMatch = document.createElement("UL");
var li = document.createElement("LI");
li.appendChild(document.createTextNode("wrongText"));
trutyListNotMatch.appendChild(li);

//test no-list
var falsyList = document.createElement("P");
var falsyCode = "";

suite("Test has.listItem()",function(){
  suite("Text Nodes only",function(){
    suite("No Item exist",function(){
      test("No Item expected => error",function(){
        assert.throws(function(){
          assert.that(truthyList,has.listItem(""));
        });
      });
      test("not expected => ok",function(){
        assert.doesNotThrow(function(){
           assert.that(trutyListNotMatch, has.no.listItem("myText"));
        });
      });
      test("Item expected, not there => error",function(){
        assert.throws(function(){
          assert.that(trutyListNotMatch,has.listItem("myText"));
        });
      });    
    });
    suite("Item exist",function(){
      test("There and alone => OK",function(){
        assert.doesNotThrow(function(){
          assert.that(truthyList,has.listItem("myText"));
        });
      });
      test("Nested between other nodes => OK",function(){
        assert.doesNotThrow(function(){
          assert.that(truthyNestedList,has.listItem("myText"));
        });
      });
      test("Not expected => error",function(){
        assert.throws(function(){
          assert.that(truthyList,has.no.listItem("myText"))
        });
      });
    });
    test("actual is no list => error", function(){
      assert.throws(function(){
        assert.that(falsyList,has.listItem("myText"))
      });
    });
    test("actual is nothing => error", function(){
      assert.throws(function(){
        assert.that(falsyCode,has.listItem("myText"));
      });
    });    
  });

  
});