/**
 * Created
 * User: maximilian
 * Date: 18.07.13
 * Time: 21:13
 *
 */

define(['lib/util','lib/cmp','lib/dom'],function(util,cmp,dom){

    var has = {
        listItem: function(expected){
            return function(actual){
                actual = (actual.nodeType != 1) ? dom.getElement(actual) : actual;
                expected = (expected == "") ? null : expected;
                if(actual == null){
                    return{
                        message: util.format("No List to check found"),
                        success: false
                    };
                }
                return{
                    message: util.format("The %s (id: "+actual.getAttribute("id")+")  has no node %s ",actual.tagName,((expected.nodeType !=1) ? expected : expected.tagName)),
                    success: dom.hasNode(actual,expected)
                };
            };
        },
        lengthOf: function(expected,opt){
            return function(actual){
                actual = (actual.nodeType != 1) ? dom.getElement(actual) : actual;
                if(actual == null || actual == "" || !actual){
                    return {
                        message: util.format("No Node do count found"),
                        success: false
                    };
                }
                //console.log(actual);
                var count = dom.count(actual,opt);
                return{
                    message: util.format("Expected %s to equal %s",expected,count),
                    success: cmp.eq(count, expected)
                };
            };
        },
        tag: function(expected){
            return function(actual){
                if(expected == null || !expected){
                    return{
                        message: util.format("Expected not found"),
                        success: false
                    }
                }
                if(actual == "" || actual == "document"){
                    if(expected == "k")
                        console.log(dom.getElement(expected));
                    return {
                        message: util.format("Document has no tag called %s.",expected),
                        success: dom.getElement(expected)
                    }
                }
                actual = (typeof actual == "string") ? dom.getElement(actual) : actual;
                expected = (typeof expected == "string") ? dom.getElement(expected) : expected;
                if(actual == null || expected == null){
                    return{
                        message: util.format("No DOM elements found"),
                        success: false
                    };
                }
                if(typeof expected == "object" && expected.length >1){
                    //there arr more than on tag that could match with the expected
                    var success = false;
                    for(i in expected){
                        if(dom.hasNode(actual,expected[i])){
                            success = true;
                            break;
                        }
                    }
                    return {
                        message: util.format("%s (id: "+actual.getAttribute("id")+") has no %s inside",actual.tagName,expected),
                        success: success
                    };
                }
                return {
                    message: util.format("%s (id: "+actual.getAttribute("id")+") has no %s inside",actual.tagName,expected.tagName),
                    success: dom.hasNode(actual,expected)
                };
            };
        },
        childTag:function(expected)
        {
            return function(actual){
                actual = (actual.nodeType != 1) ? dom.getElement(actual) : actual;
                expected = (expected.nodeType != 1) ? dom.getElement(expected) : expected;
                if(actual == null || expected == null){
                    return{
                        message: util.format("Parent & Child can`t be NULL"),
                        success: false
                    };
                }
                var childs = actual.childNodes || new Array();
                for(i in childs)
                {
                    if(childs[i].nodeType == 1 && childs[i].isEqualNode(expected))
                    {
                        return {
                            message: util.format("%s (id: "+actual.getAttribute('id')+") should have Child like %s (id: "+expected.getAttribute('id')+")",actual.tagName,expected.tagName),
                            success: true
                        }
                    }
                }
                return{
                    message: util.format("%s (id: "+actual.getAttribute('id')+") should have a Child like %s",actual.tagName,((expected == null) ? null : expected.tagName)), //getting trouble with negation, if tag not exist
                    success: false
                }
            };
        },
        childText:function(expected){
            return function(actual){
                actual = (actual.nodeType != 1) ? dom.getElement(actual) : actual;
                expected = (expected == "") ? null : expected;
                if(actual == null || expected == null){
                    return{
                        message: util.format("Parent & Child can`t be NULL"),
                        success: false
                    };
                }
                var childs = actual.childNodes || array();
                for(i in childs){
                    if(childs[i].nodeType == 3 && childs[i].nodeValue == expected){
                        return{
                            message: util.format("%s (id: "+actual.getAttribute('id')+") should have a text node like %s",actual.tagName,expected), //getting trouble with negation, if tag not exist
                            success: true
                        };
                    }
                }
                return{
                    message: util.format("%s (id: "+actual.getAttribute('id')+") should have a text node like %s",actual.tagName,expected), //getting trouble with negation, if tag not exist
                    success: false
                };
            };

        },
        htmlContent : function(expected){
            return function(actual){
                expected = (!expected) ? "" : expected;
                actual = (typeof actual == "string") ? dom.getElement(actual) : actual;
                if(!actual || actual === null){
                    return {
                        message: util.format("No match for actual"),
                        success: false
                    };
                }
                if(typeof actual === "object"){
                    return{
                        message: util.format("<br/> %s expected to be same to <br/> %s",actual.innerHTML,expected),
                        success: cmp.eq(actual.innerHTML,expected)
                    };
                }
            };
        },
        attribute: function(expected,attr){

            return function(actual){
                actual = (actual == "document" || actual == "")?  actual : dom.getElement(actual);
                if(actual == null){
                    return {
                        message: util.format("No match for actual"),
                        success: false
                    };
                }
                if(actual == "" || actual == "document"){
                    switch(attr){
                        case "id":
                            return{
                                message: util.format("Document has no Node with id %s",expected),
                                success: (document.getElementById(expected) == null) ? false : true
                            };
                            break;
                        case "class":
                            return{
                                message: util.format("Document has no node with class %s",expected),
                                success: dom.hasClass(expected)
                            };
                            break;
                    }
                }
                if(!expected && attr){
                    //look only if actual has this attribute
                    return {
                        message: util.format("%s has no %s",actual.tagName,attr),
                        success: (actual.getAttribute(attr))
                    };
                }
                if(expected && attr){
                    //look only if actual has this attribute
                    if(attr != "class"){
                        return {
                            message: util.format("%s has no %s with value %s",actual.tagName,attr,expected),
                            success: (actual.getAttribute(attr) == expected)
                        };
                    }
                    else{
                        return {
                            message: util.format("%s has no %s with value %s",actual.tagName,attr,expected),
                            success: dom.nodeMultiClass(actual.getAttribute("class"),expected)
                        };
                    }

                }
            };
        },
        class: function(expected){return function(actual){var f = has.attribute(expected,"class"); return f(actual);};},
        id: function(expected){return function(actual){var f = has.attribute(expected,"id"); return f(actual);};}

    };
    /**
     * @todo write an different negate function for has() instead the same like is()
     */
    var negate = function (f) {
        return function () {
            var expected = Array.prototype.slice.call(arguments, 0);
            return function (actual) {
                var test = f.apply(this, expected)(actual);
                test.message = (test.message.match("to"))
                    ? test.message.replace('to', 'not to')
                    : test.message.replace('have', 'have no');
                test.success = !test.success;
                return test;
            };
        };
    };
    has.no = {};
    for(i in has){

        if(has.hasOwnProperty(i)){
            has.no[i] = negate(has[i]);
        }
    }

    return has;

});