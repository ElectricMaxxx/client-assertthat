/**
 * Created
 * User: maximilian
 * Date: 18.07.13
 * Time: 21:19
 *
 */
define([],function(){
    var util = {};
    util.format = function(){

        var string = null
            , allArgs = []
            , splittedText = [];
        if(arguments.length > 0){
            for(i in arguments){
                if(i == 0){
                    string = String(arguments[i]);
                }
                else{
                    allArgs.push(arguments[i]);
                }

            }
        }
        else{
            throw new Error("There was no string givven");
        }
        splittedText = string.split("%s");
        if(allArgs.length == (splittedText.length-1))
        {
            for(i in splittedText)
            {
                //not the first one
                if(i)
                {
                    splittedText[i] = allArgs[i-1]+" "+splittedText[i];
                }
            }
            return splittedText.join("");
        }
        else{
            throw new Error("Submitted parameters doesn`t match with the string");
        }
    };
    return util;
});