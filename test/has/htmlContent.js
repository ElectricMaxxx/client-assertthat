var emptyHtml, falsyHtml, truthyHtml,
  _this = this;

truthyHtml = '<div id="testing">My little <b>Test</b> <p>with Content</p></div>';

falsyHtml = '<div id="testing">My little <b>falsy Test</b> <p>with Content</p></div>';

emptyHtml = '';

suite("Testing has.htmlContent()", function() {
  setup(function() {
    var sandbox;
    sandbox = document.getElementById("sandBox");
    return sandBox.innerHTML = truthyHtml;
  });
  teardown(function() {
    var sandbox;
    sandbox = document.getElementById("sandBox");
    return sandBox.innerHTML = '';
  });
  suite("actual is a DOM element", function() {
    test("actual is not available => error", function() {
      return assert.throws(function() {
        return assert.that(null, has.htmlContent(truthyHtml));
      });
    });
    test("actual has other htmlContent => error", function() {
      return assert.throws(function() {
        var actual;
        actual = document.getElementById("sandBox");
        return assert.that(actual, has.htmlContent(falsyHtml));
      });
    });
    test("actual has same htmlContent => OK", function() {
      return assert.doesNotThrow(function() {
        var actual;
        actual = document.getElementById("sandBox");
        return assert.that(actual, has.htmlContent(truthyHtml));
      });
    });
    test("Content same but not expected => error", function() {
      return assert.throws(function() {
        var actual;
        actual = document.getElementById("sandBox");
        return assert.that(actual, has.no.htmlContent(truthyHtml));
      });
    });
    return test("Content not same & not expected => OK", function() {
      return assert.doesNotThrow(function() {
        var actual;
        actual = document.getElementById("sandBox");
        return assert.that(actual, has.no.htmlContent(falsyHtml));
      });
    });
  });
  return suite("actual as an css selector", function() {
    test("actual is not available => error", function() {
      return assert.throws(function() {
        return assert.that("#falsyTag", has.htmlContent(truthyHtml));
      });
    });
    test("actual has other htmlContent => error", function() {
      return assert.throws(function() {
        return assert.that("#sandBox", has.htmlContent(falsyHtml));
      });
    });
    test("actual has same htmlContent => OK", function() {
      return assert.doesNotThrow(function() {
        return assert.that("#sandBox", has.htmlContent(truthyHtml));
      });
    });
    test("Content same but not expected => error", function() {
      return assert.throws(function() {
        return assert.that("#sandBox", has.no.htmlContent(truthyHtml));
      });
    });
    return test("Content not same & not expected => OK", function() {
      return assert.doesNotThrow(function() {
        return assert.that("#sandBox", has.no.htmlContent(falsyHtml));
      });
    });
  });
});
