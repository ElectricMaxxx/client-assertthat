#Assert testing in DOM with a version of node-assertthat 

this will be a client version of 
https://github.com/goloroden/node-assertthat

All function of the original are working fine. All tests of these functions a green. 
For more information of these functions have a look to node-asserthat.

But why did i take node-assertthat? Because it is very easy to write and to read. This is a kind of philosophy trough the whole framework.
I try to keep this, when i ad new functions. What would be easier than writing:
```
assert.that(actual,is.equalTo(expected));
```
Everybody knows what this is looking for.


##Usage:

It`s very easy to use this. Clone this projekt an run the `test.html`.
Thats it!

You are able to add your own tests by doing a simple script include:
 ```
<script type="text/javascript" src="test/myTest.js"></script>
```



#DOM - Testing

In my workflow with an own projekt a saw that i need some DOM - Testing functions too. 
I tried to start this by adding new function, that starts with `has.` These functions are not stable. I started do do my fist tests.
But they have done some good jobs unitl now.

For more Information about coding watch the issues.

##Important for testing

insert the call of mocha.run() after the last HTML node, than mocha runs all test after the whole doc is loaded and you`ve got no
trouble with no existing nodes ...
It might be possible to include a document.readyState test into the tests, but than it will be only available inside the `assert.that();` 
and not inside the setup()/teardowsn() (or befor()/after()). These functions are called by mocha.js that wrapps the whole Test.

###has.attribute("value")

Use this test to look for attributes of DOM-Node.
At the moment it works with `has.class("value")` and `has.id("value")`. You can use it without testing vor an value too.
```
var actual = document.createElement("DIV");
...
assert.that(actual,has.class("myClass")); //checks if ther is a class with the value myClass in actual
assert.that(actual,has.id("myId")); //checks if ther is a id with the value myId in actual
assert.that(actual,has.class()); //checks if therer is a class attribute in actual
assert.that(actual,has.id()); //checks if therer is a class attribute in actual
```
is working now with #-selector in actual too

multiple classes arn`t supported at the moment.

###has.listItem

if you want to check if there is a textNode in you list you can use `has.listItem("text");`
You can use DOM-Element-Objects or strings with css selectors (actual only # for id`s):
```
var actual = document.getElementById("actual");

assert.that(actual,has.listItem("text")); //passes the test if actual is a list that has one item called 'text'
assert.that(actual,has.no.listItem("text")); //passes if actual is a list an has no item called 'text'

//easier:
assert.that("#actual",has.listItem("text")); //passes the test if actual is a list that has one item called 'text'
assert.that("#actual",has.no.listItem("text")); //passes if actual is a list an has no item called 'text'
```

###has.childTag()


Is working with both - with css-selectors (just only #id_name) and with DOM-Element-Objects.
Use this function if you want to check if an Parant has a Child ;-)

```
var actual = document.getElementById("actual");
var expected = document.getElementById("expected");

assert.that(actual,has.childTag(expected));
assert.that(actual,has.no.childTag(expected));

//but easyer:
assert.that("#actual",has.childTag("#expected"));
assert.that("#actual",has.no.childTag("#expected"));
```

A combination of botch works too.

###has.childText()

test if ther is a text node inside of a parent, works equal to `has.childTag();`
```
var actual = document.getElementById("actual");

assert.that(actual,has.childTag("text"));
assert.that(actual,has.no.childTag("text"));

//but easyer:
assert.that("#actual",has.childTag("text"));
assert.that("#actual",has.no.childTag("text"));
```

A combination of botch works too.

###has.lengthOf(number,opt)

This is an powerfull tool to check counts of tags in an other.
You can count only ChildNodes:
```
assert.that(actual,has.lengthOf(7)); //passes if actual has got 7 ChildNodes (no Text!)
assert.that(actual,has.no.lengthOf(7));
```

But you are able to count tags:
```
assert.that(actual,has.lengthOf(7,"LI")); //passes if actual has got 7 listItems
assert.that(actual,has.no.lengthOf(7,"LI"));
```
Or you count all nested tags:
```
assert.that(actual,has.lengthOf(7,"all")); //passes if actual has got 7 listItems
assert.that(actual,has.no.lengthOf(7,"all"));
```
for all examples you can use `var actual = document.getElementById("#actual")` or `var actual = "#actual"` with the css 
selector for an id.


###has.htmlContent()

Function that tests if an node has got a htmlContent. If you want to test for a specific text you can use `has.childTex()` or an specific 
node (`has.childTag()`). This one is got to test for complete sections of html-code:

```
assert.that(actual,has.htmlContent(expected));
assert.that(actual,has.no.htmlContent(expected));

//as well as

assert.that("#actual",has.htmlContent(expected));
assert.that("#actual",has.no.htmlContent(expected));
```