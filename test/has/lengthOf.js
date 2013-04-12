var _this = this;

suite("Testing has.lengthOf()", function() {
  setup(function() {
    var sandbox;
    sandbox = document.getElementById("sandBox");
    sandbox.appendChild(document.createElement("P"));
    sandbox.appendChild(document.createElement("P"));
    return sandbox.appendChild(document.createElement("P"));
  });
  teardown(function() {
    var sandbox;
    sandbox = document.getElementById("sandBox");
    return sandbox.innerHTML = "";
  });
  suite("expected is number, opt undefined", function() {
    test("acutal not defined => error", function() {
      return assert.throws(function() {
        return assert.that(falsyTag, has.lengthOf(0));
      });
    });
    test("actual ok, number wrong => error", function() {
      return assert.throws(function() {
        var actual;
        actual = document.getElementById("sandBox");
        return assert.that(actual, has.lengthOf(5));
      });
    });
    test("actual ok, number right => OK", function() {
      return assert.doesNotThrow(function() {
        var actual;
        actual = document.getElementById("sandBox");
        return assert.that(actual, has.lengthOf(3));
      });
    });
    return test("negation: actual ok, number right => error", function() {
      return assert.throws(function() {
        var actual;
        actual = document.getElementById("sandBox");
        return assert.that(actual, has.no.lengthOf(3));
      });
    });
  });
  suite("expected is number, opt is tagname", function() {
    test("No matching Tag (UC), number not 0 => error", function() {
      return assert.throws(function() {
        var actual;
        actual = document.getElementById("sandBox");
        return assert.that(actual, has.lengthOf(4, "DIV"));
      });
    });
    test("matching tag(UC) ok, number not same => error", function() {
      return assert.throws(function() {
        var actual;
        actual = document.getElementById("sandBox");
        return assert.that(actual, has.lengthOf(4, "P"));
      });
    });
    test("matching tag(UC) ok, number same => OK", function() {
      return assert.doesNotThrow(function() {
        var actual;
        actual = document.getElementById("sandBox");
        return assert.that(actual, has.lengthOf(3, "P"));
      });
    });
    test("matching tag(not UC) ok, number same => OK", function() {
      return assert.doesNotThrow(function() {
        var actual;
        actual = document.getElementById("sandBox");
        return assert.that(actual, has.lengthOf(3, "p"));
      });
    });
    test("Negation: matching tag(not UC) ok, number same => error", function() {
      return assert.throws(function() {
        var actual;
        actual = document.getElementById("sandBox");
        return assert.that(actual, has.no.lengthOf(3, "p"));
      });
    });
    return test("with other tags between, number same => OK", function() {
      var actual, li;
      actual = document.getElementById("sandBox");
      li = document.createElement("LI");
      actual.appendChild(li);
      return assert.doesNotThrow(function() {
        return assert.that(actual, has.lengthOf(3, "p"));
      });
    });
  });
  return suite("expected is number, opt = all", function() {
    test("number not same => error", function() {
      return assert.throws(function() {
        var actual;
        actual = document.getElementById("sandBox");
        return assert.that(actual, has.lengthOf(7, "all"));
      });
    });
    test("number same => OK", function() {
      return assert.doesNotThrow(function() {
        var actual;
        actual = document.getElementById("sandBox");
        return assert.that(actual, has.lengthOf(3, "all"));
      });
    });
    test("with other tags between, number same => OK", function() {
      var actual, p;
      p = document.createElement("P");
      actual = document.getElementById("sandBox");
      actual.appendChild(p);
      return assert.doesNotThrow(function() {
        return assert.that(actual, has.lengthOf(4, "all"));
      });
    });
    return test("with other tags nested, number same => OK", function() {
      var actual, p;
      p = document.createElement("P");
      actual = document.getElementById("sandBox");
      p.appendChild(document.createElement("LI"));
      actual.appendChild(p);
      return assert.doesNotThrow(function() {
        return assert.that(actual, has.lengthOf(5, "all"));
      });
    });
  });
});
