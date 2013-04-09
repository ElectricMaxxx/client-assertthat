var falsyDiv = document.createElement("DIV");
var truthyDiv = document.createElement("DIV");
truthyDiv.setAttribute("class","myClass");
truthyDiv.setAttribute("id","myId");
suite("Testing attributes",function(){
  suite("Testing not available attr",function(){
    test("class not available, but expected => error",function(){
      assert.throws(function(){
        assert.that(falsyDiv, has.class());
      });
    });
      test("class not available, but expected, value expected => error",function(){
      assert.throws(function(){
        assert.that(falsyDiv, has.class("message"));
      });
    });
    test("id not available, but expected => error",function(){
      assert.throws(function(){
        assert.that(falsyDiv, has.id());
      });
    });
      test("id not available, but expected, value expected => error",function(){
      assert.throws(function(){
        assert.that(falsyDiv, has.id("message"));
      });
    });
  });

  suite("Testing available attributes",function(){
    test("class available => ok",function(){
      assert.doesNotThrow(function(){
        assert.that(truthyDiv, has.class());
      });
    });
    test("class available, value expected but not same => error",function(){
      assert.throws(function(){
        assert.that(truthyDiv, has.class("test"));
      });
    }); 
    test("class available,same value expected => OK",function(){
      assert.doesNotThrow(function(){
        assert.that(truthyDiv, has.class("myClass"));
      });
    }); 
    test("id available => ok",function(){
      assert.doesNotThrow(function(){
        assert.that(truthyDiv, has.id());
      });
    });
    test("id available, value expected but not same => error",function(){
      assert.throws(function(){
        assert.that(truthyDiv, has.id("test"));
      });
    }); 
    test("id available,same value expected => OK",function(){
      assert.doesNotThrow(function(){
        assert.that(truthyDiv, has.id("myId"));
      });
    });
  });
  
});
