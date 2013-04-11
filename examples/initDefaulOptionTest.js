
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
  });
  suite("Test with language=en, container=given",function(){
    setup(function(){
      var Option = {
        container: "given",
        language: "en",
        upload: "test.php"
        
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
  });
});

