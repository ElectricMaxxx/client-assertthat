/**
 * Created
 * User: maximilian
 * Date: 18.07.13
 * Time: 21:21
 *
 */

define([],function(){

    var dom = (function(){
        var isId = function(text){
            var n = text.indexOf("#");
            return (n == 0);
        };
        var isClass = function(text){
            var n = text.indexOf(".");
            return (n == 0);
        };
        return{
            getElement: function(name){
                if(name.nodeType != 1 && name.length > 0){
                    if(isId(name)){
                        name = name.replace("#","");
                        return document.getElementById(name); //cool i can use the native function ;-)
                    }
                    //as default it will retaun ByTagName
                    var tag = document.getElementsByTagName(name);
                    return (tag.length > 0) ? tag : null;
                }
                return name;


            },
            nodeMultiClass: function(fullClass,expected){
                if(typeof fullClass == "string"){
                    var classes = fullClass.split(" ");
                    for(i in classes){
                        if(classes[i] == expected){

                            return true
                        }
                    }
                }
                return false;

            },
            hasClass: function(expected,node){
                if(!node){
                    var node = document.body;
                }

                var childs = node.childNodes;
                for(i in childs){

                    if(childs[i].nodeType == 1){
                        console.log(childs[i]+" expected: "+expected);
                        var childClass = childs[i].getAttribute("class");
                        var check = dom.nodeMultiClass(childClass,expected);
                        if(check){
                            return true;
                        }
                        //Check the childs of child
                        if(childs[i].childNodes.length>0){
                            check = dom.hasClass(expected,childs[i])
                            if(check){
                                return true;
                            }
                        }
                    }
                }
                return false;
            },
            hasNode: function(parent,node){
                if(parent != null){
                    var children = parent.childNodes;
                    for(i in children){

                        if(node != null || node == ""){
                            switch(node.nodeType){
                                case 1:
                                    //Than i have to look for an
                                    if(children[i].tagName == node.tagName){
                                        return true;
                                    }
                                    break;
                                case 3:
                                    if(children[i].nodeType == 3 && children[i].nodeValue == node.nodeValue){
                                        return true;
                                    }
                                    break;
                                default:
                                    //than i have to look for a simple text
                                    if(children[i].nodeType == 3 && children[i].nodeValue == node){
                                        return true;
                                    }
                            }
                            if(children[i].childNodes && children[i].childNodes.length > 0){
                                //Than we go on step deeper

                                return dom.hasNode(children[i],node);
                            }
                        }
                    }
                    return false;
                }
            },
            count: function(node,opt){
                var child = node.childNodes;
                var countChild = 0;
                var countOpt = 0;
                var countAll = 0;
                for(i in child){
                    if(child[i].nodeType == 1){
                        countChild++;
                        countAll++;
                        if(opt && opt != "all"){
                            //Check if it is the tag what we are looking for
                            if(child[i].tagName == opt.toUpperCase()){
                                countOpt++;
                            }
                        }
                        if(opt == "all"){
                            countAll = countAll + dom.count(child[i],opt);
                        }
                    }
                }
                //console.log("normal: "+countChild+" opt("+opt+"): "+countOpt+" all "+ countAll);
                return (!opt) ? countChild : (opt == "all") ? countAll : countOpt ;
            }
        };
    })();

    return dom;
});