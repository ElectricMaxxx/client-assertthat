suite "Test the has.class() function ", =>
  setup =>
    sandbox = document.getElementById "sandBox"
    falsyClass = document.createElement "P"
    falsyClass.setAttribute "id","falsyClass"
    truthyClass = document.createElement "P"
    truthyClass.setAttribute "id","truthyClass"
    truthyClass.setAttribute "class","myClass"
    sandbox.appendChild truthyClass
    sandbox.appendChild falsyClass
  teardown =>
    sandbox = document.getElementById "sandBox"
    truthyClass = document.getElementById "truthyClass"
    falsyClass = document.getElementById "falsyClass"
    sandbox.removeChild truthyClass
    sandbox.removeChild falsyClass
  suite "actual is a DOM Object", =>
    test "actual is not available  => error",=>
      assert.throws =>  
        assert.that null, has.class(".myClass")
    test "actual available, no class there => error",=>
      assert.throws =>
        actual = document.getElementById "falsyClass"
        assert.that actual, has.class "test"
    test "actual available, has one class wich is the same => OK", =>
      assert.doesNotThrow =>
        actual = document.getElementById "truthyClass"
        assert.that actual, has.class "myClass"
    test "actual available, has two class on machtes => OK", =>
      assert.doesNotThrow =>
        actual = document.getElementById "truthyClass"
        oldClass = actual.getAttribute "class"
        actual.setAttribute "class","test "+" "+oldClass
        assert.that actual, has.class "myClass"
  suite "actual with a css selector", =>
    test "actual is not available  => error",=>
      assert.throws =>  
        assert.that "#test", has.class(".myClass")
    test "actual available, no class there => error",=>
      assert.throws =>
        assert.that "#falsyClass", has.class "test"
    test "actual available, has one class wich is the same => OK", =>
      assert.doesNotThrow =>
        assert.that "#truthyClass", has.class "myClass"
    test "actual available, has two class on machtes => OK", =>
      assert.doesNotThrow =>
        actual = document.getElementById "truthyClass"
        oldClass = actual.getAttribute "class"
        actual.setAttribute "class","test "+" "+oldClass
        assert.that "#truthyClass", has.class "myClass"        
        
  