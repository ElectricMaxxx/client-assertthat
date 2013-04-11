suite "Test the Filter-Area with differnt init options", =>
  suite "Nothing set",=>
    setup =>
      Option = {}
      FB.init(Option)
    teardown =>
      clear = document.getElementById("FB")
      document.body.removeChild(clear)
    test "No Filter-Area there => OK",=>
      actual = config.container()
      assert.that("#"+actual,has.no.tag("#filter"))
      
  suite "Filter=TRUE",=>
    setup =>
      Option = {}
      Option.filter=true
      FB.init(Option)
    teardown =>
      clear = document.getElementById("FB")
      if clear
        document.body.removeChild(clear)
    test "Filter-Area there => OK",=>
      actual = config.container()
      assert.that("#"+actual,has.tag("#filter"))
    test "Filter has an search input",=>
      assert.that("#filter",has.tag("#filterSearch"))
      
    suite "Categories = TRUE",=>
      setup =>
        Option = {}
        Option.filter=true
        Option.filter="FB"
        Option.categories = ["one","two"]
        FB.init(Option)
      teardown =>
        clear = document.getElementById("FB")
        if clear
          document.body.removeChild(clear)      
      test "Category - Selection exist", =>
        assert.that("#filter",has.tag("#catFilter"))
      test "Checkbox for 'one' exist",=>
        assert.that("#catFilter",has.tag("#catFilter_one"))
      test "Checkbox for 'two' exist",=>
        assert.that("#catFilter",has.tag("#catFilter_two"))        