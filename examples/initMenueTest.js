
suite("Testing the menue after init",function(){
  suite("Nothing was set",function(){
    setup(function(){
      Option = {};
      FB.init(Option);
    });

    test("Menue as in the menue",function(){
      assert.that("#menue_top",has.childText("Menü"));
    });
    test("View in the menue",function(){
      assert.that("#views_top",has.childText("Ansichten"));
    });
    test("no UploadFile-Link exist",function(){
      assert.that("#menue_list",has.no.tag("#uploadFiles")); 
    });
  });
  suite("Upload-path was set",function(){
    setup(function(){
      Option = {
        upload: "test.php"
      }
      FB.init(Option);
    });
    teardown(function(){
      var clear = document.getElementById("FB");
      //document.body.removeChild(clear);
    });
    test("Menue as in the menue",function(){
      assert.that("#menue_top",has.childText("Menü"));
    });
    test("View in the menue",function(){
      assert.that("#views_top",has.childText("Ansichten"));
    });
    test("UploadFile-Link exist",function(){
      assert.that("#menue_list",has.tag("#uploadFiles")); //Default is german
    });
  });
  suite("Some Views where set",function(){
    setup(function(){
      Option = {
        views: ["details","preview"]
      }
      FB.init(Option);
    });
    teardown(function(){
      var clear = document.getElementById("FB");
      document.body.removeChild(clear);
    });
    test("Menue as in the menue",function(){
      assert.that("#menue_top",has.childText("Menü"));
    });
    test("View in the menue",function(){
      assert.that("#views_top",has.childText("Ansichten"));
    });
    test("no UploadFile-Link exist",function(){
      assert.that("#menue_list",has.no.tag("#uploadFiles")); //Default is german
    });
    test("View menue has a link for details",function(){
      assert.that("#views_list",has.tag("#details"));
    });
    test("View menue has a link for preview",function(){
      assert.that("#views_list",has.tag("#preview"));
    });
  });
  suite("Categories where set",function(){
    setup(function(){
      Option = {
        views: ["details","preview","categories"],
        categories: ["one","two"]
      }
      FB.init(Option);
    });
    teardown(function(){
      var clear = document.getElementById("FB");
      document.body.removeChild(clear);
    });
    test("Menue as in the menue",function(){
      assert.that("#menue_top",has.childText("Menü"));
    });
    test("View in the menue",function(){
      assert.that("#views_top",has.childText("Ansichten"));
    });
    test("no UploadFile-Link exist",function(){
      assert.that("#menue_list",has.no.tag("#uploadFiles")); //Default is german
    });
    test("View menue has a link for details",function(){
      assert.that("#views_list",has.tag("#details"));
    });
    test("View menue has a link for preview",function(){
      assert.that("#views_list",has.tag("#preview"));
    });
    test("View menue has a link for categories",function(){
      assert.that("#views_list",has.tag("#categories"));
    });    
  });
});