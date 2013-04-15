var _this = this;

suite("Test the has.class() function ", function() {
  setup(function() {
    var falsyClass, sandbox, truthyClass;
    sandbox = document.getElementById("sandBox");
    falsyClass = document.createElement("P");
    falsyClass.setAttribute("id", "falsyClass");
    truthyClass = document.createElement("P");
    truthyClass.setAttribute("id", "truthyClass");
    truthyClass.setAttribute("class", "myClass");
    sandbox.appendChild(truthyClass);
    return sandbox.appendChild(falsyClass);
  });
  teardown(function() {
    var falsyClass, sandbox, truthyClass;
    sandbox = document.getElementById("sandBox");
    truthyClass = document.getElementById("truthyClass");
    falsyClass = document.getElementById("falsyClass");
    sandbox.removeChild(truthyClass);
    return sandbox.removeChild(falsyClass);
  });
  suite("actual is a DOM Object", function() {
    test("actual is not available  => error", function() {
      return assert.throws(function() {
        return assert.that(null, has["class"](".myClass"));
      });
    });
    test("actual available, no class there => error", function() {
      return assert.throws(function() {
        var actual;
        actual = document.getElementById("falsyClass");
        return assert.that(actual, has["class"]("test"));
      });
    });
    test("actual available, has one class wich is the same => OK", function() {
      return assert.doesNotThrow(function() {
        var actual;
        actual = document.getElementById("truthyClass");
        return assert.that(actual, has["class"]("myClass"));
      });
    });
    return test("actual available, has two class on machtes => OK", function() {
      return assert.doesNotThrow(function() {
        var actual, oldClass;
        actual = document.getElementById("truthyClass");
        oldClass = actual.getAttribute("class");
        actual.setAttribute("class", "test " + " " + oldClass);
        return assert.that(actual, has["class"]("myClass"));
      });
    });
  });
  return suite("actual with a css selector", function() {
    test("actual is not available  => error", function() {
      return assert.throws(function() {
        return assert.that("#test", has["class"](".myClass"));
      });
    });
    test("actual available, no class there => error", function() {
      return assert.throws(function() {
        return assert.that("#falsyClass", has["class"]("test"));
      });
    });
    test("actual available, has one class wich is the same => OK", function() {
      return assert.doesNotThrow(function() {
        return assert.that("#truthyClass", has["class"]("myClass"));
      });
    });
    return test("actual available, has two class on machtes => OK", function() {
      return assert.doesNotThrow(function() {
        var actual, oldClass;
        actual = document.getElementById("truthyClass");
        oldClass = actual.getAttribute("class");
        actual.setAttribute("class", "test " + " " + oldClass);
        return assert.that("#truthyClass", has["class"]("myClass"));
      });
    });
  });
});
