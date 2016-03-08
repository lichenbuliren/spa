/**
 * spa.util.js
 * 常用工具方法
 */
spa.util = (function(){
    var makeError,
        setConfigMap;

    makeError = function(name,msg,data){
        var error = new Error();
        error.name = name;
        error.message = msg;
        if(data){
            error.data = data;
        }
        return error;
    };

    setConfigMap = function(arg_map){
        var input_map = arg_map.input_map,
            settable_map = arg_map.settable_map,
            config_map = arg_map.config_map,
            key_name,
            error;

        for(key_name in input_map){
            if(input_map.hasOwnProperty(key_name)){
                if(settable_map.hasOwnProperty(key_name)){
                    config_map[key_name] = input_map[key_name];
                }else{
                    error = makeError('Bad Input','Setting config key |' + key_name + '| is not supported');
                    throw error;
                }
            }
        }
    };

    return {
        makeError: makeError,
        setConfigMap: setConfigMap
    };
})();