/**
 * spa.chat.js
 * chat feature module for SPA
 */
/* global $,spa */
spa.chat = (function(){
    //----------- 模块变量 -----------
    // 静态配置值
    var configMap = {
        main_html: String()
            + '    <div class="spa-shell-head">'
            + '        <div class="spa-shell-head-logo"></div>'
            + '        <div class="spa-shell-head-acct"></div>'
            + '        <div class="spa-shell-head-search"></div>'
            + '    </div>'
            + '    <div class="spa-shell-main">'
            + '        <div class="spa-shell-main-nav"></div>'
            + '        <div class="spa-shell-main-content"></div>'
            + '    </div>'
            + '    <div class="spa-shell-foot"></div>'
            + '    <div class="spa-shell-chat"></div>'
            + '    <div class="spa-shell-modal"></div>',
        settable_map: {}

    };

    // 动态信息
    var stateMap = { $container: null };

    // jquery 对象缓存
    var jqueryMap = {};

    // 模块变量，之后赋值
    var setJqueryMap,
        initModule,
        configModule;
    //----------- 模块变量 -----------


    //----------- Utility Methods -----------
    //----------- Utility Methods -----------

    //-----------Begin DOM Methods -----------
    setJqueryMap = function() {
        var $container = stateMap.$container;
        jqueryMap.$container = $container;
    };
    //-----------  End DOM Methods -----------


    //----------- Begin Event Handlers -----------

    //----------- End Event Handlers   -----------

    //----------- Begin Public Methods   -----------

    configModule = function(input_map){
        spa.util.setConfigMap({
            input_map: input_map,
            settable_map: configMap.settable_map,
            config_map: configMap
        });
        return true;
    };
    // 公开方法放在这里
    initModule = function($container) {
        stateMap.$container = $container;
        $container.html(configMap.main_html);
        setJqueryMap();
    };

    return {
        initModule: initModule
    };
    //----------- End Public Methods     -----------
})();