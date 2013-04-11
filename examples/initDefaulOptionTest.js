
suite("Test the setting of the default options",function(){
  suite("Nothing set",function(){
    setup(function(){
     var Option = {}; 
     FB.init(Option);
    });
    teardown(function(){
      var clearFB = document.getElementById("FB");
      document.body.removeChild(clearFB); 
    });
    test("Default Container with id=FB created",function(){
      assert.that("",has.tag("#FB"));
    });
    test("Language set to de",function(){
      var actual = config.language();
      var expected = "de";
      assert.that(actual, is.equalTo(expected));
    });
    test("Navigation DIV exists",function(){
      var actual = config.container();
      assert.that("#"+actual, has.tag("#navigation"));
    });    
    test("Browser DIV exists",function(){
      
    }); 
    test("Filter DIV does not exist",function(){
      var actual = config.container();
      assert.that(actual, has.no.tag("#filter"));
    }); 
    test("Input doesn`t exist",function(){
      assert.that("#navigation", has.no.tag("#file"));
    });     
  });
  suite("Test with language=en, container=given",function(){
    setup(function(){
      var Option = {
        container: "given",
        language: "en"
        
      };
      FB.init(Option);
    });
    teardown(function(){
      var given = document.getElementById("given");
      document.body.removeChild(given); 
    });
    test("language=en => OK",function(){
      var actual = config.language();
      var expected = "en";
      assert.that(actual, is.equalTo(expected));        
    });
    test("container with id=given exist => OK",function(){
      assert.that("",has.tag("#given"));
    });
    test("Input doesn`t exist",function(){
      assert.that("#navigation", has.no.tag("#file"));
    }); 
  });
  suite("Test with a Filter=TRUE",function(){
    setup(function(){
      var Option = {
        container: "given",
        language: "en",
        filter: true
        
      };
      FB.init(Option);
    });
    teardown(function(){
      var given = document.getElementById("given");
      if(given != null)
      document.body.removeChild(given); 
    });
    test("Filter DIV exists",function(){
      var actual = config.container();
      assert.that("#"+actual, has.tag("#filter"));
    });
    test("Category-Selection DIV doesn`t exist",function(){
      assert.that("#filter", has.no.tag("#catFilter"));
    });
    test("Input doesn`t exist",function(){
      assert.that("#navigation", has.no.tag("#file"));
    });    
    suite("With Categories = TRUE",function(){
      setup(function(){
        var Option = {
          container: "given",
          language: "en",
          filter: true,
          categories: true

        };
        FB.init(Option);
      });
      teardown(function(){
        var given = document.getElementById("given");
        document.body.removeChild(given); 
      });
      test("Category-Selection DIV exist",function(){
        assert.that("#filter", has.tag("#catFilter"));
      });
    });
  });
  suite("With upload path",function(){
    setup(function(){
      var Option = {
        container: "given",
        language: "en",
        upload: "test.path"
      };
      FB.init(Option);
    });
    teardown(function(){
      var given = document.getElementById("given");
      document.body.removeChild(given); 
    });
    test("Path is in Config",function(){
      var actual = config.option.upload;
      assert.that(actual,is.equalTo("test.path"));
    });
    test("File-Input exist",function(){
      assert.that("#navigation", has.childTag("#file"));
    });
  });  
});

