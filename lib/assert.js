/**
 * Created
 * User: maximilian
 * Date: 18.07.13
 * Time: 21:29
 *
 */

define(function(){

    var assert = (function(){

        return{
            that: function(actual,constraint){
                var test = constraint(actual);
                if (!test.success) {
                    throw new Error(test.message);
                }
            },
            throws:function(f){
                //simple test if something throws
                try{
                    f();
                }
                catch(err){
                    return true;
                }
                throw new Error("Your Function should throw, but didn`t do it.");
            },
            doesNotThrow: function(f){
                //simple test if something not throws

                try{
                    f();
                }
                catch(err){
                    throw new Error("Your Funktion shouldn`t throw, but it did: "+err.message);
                }
                return true;
            }
        };
    })();
    return assert;
});