suite "Testing has.lengthOf()", =>
  suite "expected is number, opt undefined", =>
    test "acutal not defined => error", =>
      assert.throws =>
        assert.that(falsyTag,has.lengthOf(0))
    test "actual ok, number wrong => error", =>
      assert.throws =>
        actual = document.getElementById("sandBox")
        assert.that(actual,has.lengthOf(5))
    test "actual ok, number right => OK", =>
      assert.doesNotThrow =>
        actual = document.getElementById("sandBox")
        assert.that(actual,has.lengthOf(3))
    test "negation: actual ok, number right => error", =>
      assert.throws =>
        actual = document.getElementById("sandBox")
        assert.that(actual,has.no.lengthOf(3))   
  suite "expected is number, opt is tagname",=>
    setup =>
    test "No matching Tag (UC), number not 0 => error", =>
      assert.throws =>
        actual = document.getElementById("sandBox")
        assert.that(actual, has.lengthOf(4,"DIV"))
    test "matching tag(UC) ok, number not same => error", =>
      assert.throws =>
        actual = document.getElementById("sandBox")
        assert.that(actual, has.lengthOf(4,"P"))      
    test "matching tag(UC) ok, number same => OK", =>
      assert.doesNotThrow =>
        actual = document.getElementById("sandBox")
        assert.that(actual,has.lengthOf(3,"P"))          
    test "matching tag(not UC) ok, number same => OK", =>
      assert.doesNotThrow =>
        actual = document.getElementById("sandBox")
        assert.that(actual,has.lengthOf(3,"p"))
    test "Negation: matching tag(not UC) ok, number same => error", =>
      assert.throws =>
        actual = document.getElementById("sandBox")
        assert.that(actual,has.no.lengthOf(3,"p"))       
    test "with other tags between, number same => OK", =>
      actual = document.getElementById("sandBox")
      li = document.createElement("LI")
      actual.appendChild(li)
      assert.doesNotThrow =>
        assert.that(actual,has.lengthOf(3,"p"))        
  suite "expected is number, opt = all", =>
    setup =>
      
    test "number not same => error", =>
      assert.throws =>
        assert.that(truthyTag, has.lengthOf(7,"all"))      
    test "number same => OK", =>
      assert.doesNotThrow =>
        actual = document.getElementById("sandBox")
        assert.that(actual,has.lengthOf(4,"all"))          
    test "with other tags between, number same => OK", =>
      p = document.createElement("P")
      actual = document.getElementById("sandBox")
      actual.appendChild(p)
      assert.doesNotThrow =>
          assert.that(actual,has.lengthOf(5,"all"))
    test "with other tags nested, number same => OK", =>
      p = document.createElement("P")
      actual = document.getElementById("sandBox")
      child = actual.childNodes
      child[1].appendChild(p)
      assert.doesNotThrow =>
          assert.that(actual,has.lengthOf(6,"all"))          