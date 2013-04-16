truthyHtml = '<div id="testing">My little <b>Test</b> <p>with Content</p></div>'
falsyHtml = '<div id="testing">My little <b>falsy Test</b> <p>with Content</p></div>'
emptyHtml = ''

suite "Testing has.htmlContent()", =>
  suite "actual is a DOM element", =>
    setup =>
      sandbox = document.getElementById "sandBox"
      sandBox.innerHTML = truthyHtml
    teardown =>
      sandbox = document.getElementById "sandBox"
      sandBox.innerHTML = ''  
    test "actual is not available => error", =>
      assert.throws =>
        assert.that null, has.htmlContent truthyHtml
    test "actual has other htmlContent => error", =>
      assert.throws =>
        actual = document.getElementById "sandBox"
        assert.that actual, has.htmlContent falsyHtml
    test "actual has same htmlContent => OK", =>
      assert.doesNotThrow =>
        actual = document.getElementById "sandBox"
        assert.that actual, has.htmlContent truthyHtml
    test "Content same but not expected => error", =>
      assert.throws =>
        actual = document.getElementById "sandBox"
        assert.that actual, has.no.htmlContent truthyHtml
    test "Content not same & not expected => OK", =>
      assert.doesNotThrow =>
        actual = document.getElementById "sandBox"
        assert.that actual, has.no.htmlContent falsyHtml
  suite "actual as an css selector", =>
    setup =>
      sandbox = document.getElementById "sandBox"
      sandBox.innerHTML = truthyHtml
    teardown =>
      sandbox = document.getElementById "sandBox"
      sandBox.innerHTML = ''          
    test "actual is not available => error", =>
      assert.throws =>
        assert.that "#falsyTag", has.htmlContent truthyHtml
    test "actual has other htmlContent => error", =>
      assert.throws =>
        assert.that "#sandBox", has.htmlContent falsyHtml
    test "actual has same htmlContent => OK", =>
      assert.doesNotThrow =>
        assert.that "#sandBox", has.htmlContent truthyHtml
    test "Content same but not expected => error", =>
      assert.throws =>
        assert.that "#sandBox", has.no.htmlContent truthyHtml
    test "Content not same & not expected => OK", =>
      assert.doesNotThrow =>
        assert.that "#sandBox", has.no.htmlContent falsyHtml
  suite "actual is empty (only with css-Selector)", =>
    setup =>
      sandbox = document.getElementById "sandBox"
      sandBox.innerHTML = ""  
    test "empty expected => OK",=>
      assert.doesNotThrow =>
        assert.that "#sandBox", has.htmlContent()
    test "empty not expected => error",=>
      assert.throws =>
        assert.that "#sandBox", has.no.Content()
    test "something (not empty) expected => error",=>
      assert.throws =>
        assert.that "#sandBox", has.htmlContent(truthyHtml)
    test "something (not empty) not expected => OK",=>
      assert.doesNotThrow =>
        assert.that "#sandBox", has.no.htmlContent(truthyHtml)