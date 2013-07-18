/**
 * Config area for client-assertthat
 * for questions of configuration have a look to: http://requirejs.org/docs/api.html
 *
 * did not realy know if i will realy need jquery, hope not
 *
 * Created by
 * @author Maximilian Berghoff
 */

require.config({
   baseUrl: "",
   paths: {
       assert: 'lib/assert',
       jquery: 'lib/jquery/jquery',
       mocha: 'lib/mocha/mocha',
       is:'lib/is',
       has:'lib/has'
   },
   shim:{
     mocha:{
         deps:['jquery']

     }
   }
});

/**
 * define your test in here
 */
require(['require','mocha'],function(require){
    mocha.setup('tdd');
    require([
        'test/has/attribute'
    ],function(require){
        mocha.run();
    });
});
