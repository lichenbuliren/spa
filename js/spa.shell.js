/**
 *  spa.shell.js
 *  Shell module for SPA
 */
spa.shell = (function(){
    //----------- 模块变量 -----------
    // 静态配置值
    var configMap = {
        main_html : String()
             + '<div id="spa">'
             + '    <div class="spa-shell-head">'
             + '        <div class="spa-shell-head-logo"></div>'
             + '        <div class="spa-shell-head-acct"></div>'
             + '        <div class="spa-shell-head-search"></div>'
             + '    </div>'
             + '    <div class="spa-shell-main">'
             + '        <div class="spa-shell-main-nav"></div>'
             + '        <div class="spa-shell-main-content"></div>'
             + '    </div>'
             + '        <div class="spa-shell-foot"></div>'
             + '        <div class="spa-shell-chat"></div>'
             + '        <div class="spa-shell-modal"></div>'
             + '</div>'
    };

    // 动态信息
    var stateMap = {
        $container: null
    };

    // jquery 对象缓存
    var jqueryMap = {};

    // 模块变量，之后赋值
    var setJqueryMap, initModule;
    //----------- 模块变量 -----------


    //----------- Utility Methods -----------
    // 保留区块，这里的方法不和页面元素交互
    //----------- Utility Methods -----------

    //-----------Begin DOM Methods -----------
    setJqueryMap = function(){
        var $container = stateMap.$container;
        jqueryMap.$container = $container;
    };
    //-----------  End DOM Methods -----------


    //----------- Begin Event Handlers -----------
    // 为jquery事件处理函数保留区块
    //----------- End Event Handlers   -----------


    //----------- Begin Public Methods   -----------
    // 公开方法放在这里
    initModule = function($container){
        stateMap.$container = $container;
        $container.html(configMap.main_html);
        setJqueryMap();
    };

    return { initModule: initModule};
    //----------- End Public Methods     -----------
})();