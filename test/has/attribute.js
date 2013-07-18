/**
 *
 * @todo solve this dependency problem, it`s not cool to import more than assert, has() has to go global if assert loads
 *
 */

define(['assert','has'],function(assert,has){
    suite("Testing attributes",function(){
        setup(function(){

            var sandBox = document.getElementById("sandBox");

            if(sandBox == null){
                //Than it will be destroid some tests befor
                sandBox = document.createElement("DIV");
                document.body.appendChild(sandBox);
            }
            sandBox.setAttribute("id","sandBox");
        });
        teardown(function(){
            var sandBox = document.getElementById("sandBox");
            sandBox.removeAttribute("id");
            sandBox.removeAttribute("class");
        });
        suite("Testing not available attr",function(){
            test("class not available, but expected => error",function(){
                assert.throws(function(){
                    var actual = document.getElementById("testList")
                    assert.that(actual,has.class());
                });
            });
            test("class not available, but expected, value expected => error",function(){
                assert.throws(function(){
                    var actual = document.getElementById("testList")
                    assert.that(actual, has.class("message"));
                });
            });
            test("id not available, but expected => error",function(){
                assert.throws(function(){
                    var actual = document.createElement("DIV");
                    assert.that(actual, has.id());
                });
            });
            test("id not available, but expected, value expected => error",function(){
                assert.throws(function(){
                    var actual = document.createElement("DIV");
                    assert.that(actual, has.id("message"));
                });
            });
        });

        suite("Testing available attributes",function(){
            test("class available => ok",function(){
                assert.doesNotThrow(function(){
                    var actual = document.getElementById("sandBox");
                    actual.setAttribute("class","testClass");
                    assert.that(actual, has.class());
                });
            });
            test("class available, value expected but not same => error",function(){
                assert.throws(function(){
                    var actual = document.getElementById("sandBox");
                    actual.setAttribute("class","testClass");
                    assert.that(actual, has.class("test"));
                });
            });
            test("class available,same value expected => OK",function(){
                assert.doesNotThrow(function(){
                    var actual = document.getElementById("sandBox");
                    actual.setAttribute("class","testClass");
                    assert.that(actual, has.class("testClass"));
                });
            });
            test("id available => ok",function(){
                assert.doesNotThrow(function(){
                    var actual = document.getElementById("sandBox");
                    assert.that(actual, has.id());
                });
            });
            test("id available, value expected but not same => error",function(){
                assert.throws(function(){
                    var actual = document.getElementById("sandBox");
                    assert.that(actual, has.id("test"));
                });
            });
            test("id available,same value expected => OK",function(){
                assert.doesNotThrow(function(){
                    var actual = document.getElementById("sandBox");
                    assert.that(actual, has.id("sandBox"));
                });
            });
        });
        suite("Testing with css selectors as actual",function(){
            test("no class => error",function(){
                assert.throws(function(){
                    assert.that("#sandBox",has.class());
                });
            });
            test("class exist but not same=> error",function(){
                assert.throws(function(){
                    var actual = document.getElementById("sandBox");
                    actual.setAttribute("class","myTest");
                    assert.that("#sandBox",has.class("test"));
                });
            });
            test("class exist, same=> OK",function(){
                assert.doesNotThrow(function(){
                    var actual = document.getElementById("sandBox");
                    actual.setAttribute("class","myTest");
                    assert.that("#sandBox",has.class("myTest"));
                });
            });
            test("multiple class exist, same=> OK",function(){
                assert.doesNotThrow(function(){
                    var actual = document.getElementById("sandBox");
                    actual.setAttribute("class","myTest");
                    actual.setAttribute("class","myClass");
                    assert.that("#sandBox",has.class("myTest"));
                });
            });
        });
    });

});


