/**
 *  spa.shell.js
 *  Shell module for SPA
 */
spa.shell = (function() {
    //----------- 模块变量 -----------
    // 静态配置值
    var configMap = {
        main_html: String() + '    <div class="spa-shell-head">' + '        <div class="spa-shell-head-logo"></div>' + '        <div class="spa-shell-head-acct"></div>' + '        <div class="spa-shell-head-search"></div>' + '    </div>' + '    <div class="spa-shell-main">' + '        <div class="spa-shell-main-nav"></div>' + '        <div class="spa-shell-main-content"></div>' + '    </div>' + '        <div class="spa-shell-foot"></div>' + '        <div class="spa-shell-chat"></div>' + '        <div class="spa-shell-modal"></div>',
        // 聊天栏模块配置信息
        chat_extend_time: 250,
        chat_retract_time: 300,
        chat_extend_height: 450,
        chat_retract_height: 15,
        chat_extend_title: 'Click to retract',
        chat_retract_title: 'Click to extend'
    };

    // 动态信息
    var stateMap = {
        $container: null,
        is_chat_retract: true
    };

    // jquery 对象缓存
    var jqueryMap = {};

    // 模块变量，之后赋值
    var setJqueryMap, toggleChat, onClickChat, initModule;
    //----------- 模块变量 -----------


    //----------- Utility Methods -----------
    // 保留区块，这里的方法不和页面元素交互
    //----------- Utility Methods -----------

    //-----------Begin DOM Methods -----------
    setJqueryMap = function() {
        var $container = stateMap.$container;
        jqueryMap.$container = $container;
        jqueryMap.$chat = $container.find('.spa-shell-chat');
    };

    toggleChat = function(do_extend, callback) {
        var chatHeight = jqueryMap.$chat.height(),
            is_open = chatHeight == configMap.chat_extend_height,
            is_closed = chatHeight == configMap.chat_retract_height,
            is_sliding = !is_open && !is_closed;

        if (is_sliding) return false;

        // 展开聊天窗口
        if (do_extend) {
            jqueryMap.$chat.animate({
                height: configMap.chat_extend_height,
            }, configMap.chat_extend_time, function() {
                jqueryMap.$chat.attr('title', configMap.chat_extend_title);
                stateMap.is_chat_retract = false;
                callback && callback();
            });

            return true;
        }

        // 合上聊天窗口
        jqueryMap.$chat.animate({
            height: configMap.chat_retract_height
        }, configMap.chat_retract_time, function() {
            jqueryMap.$chat.attr('title', configMap.chat_retract_title);
            stateMap.is_chat_retract = true;
            callback && callback();
        });

        return true;
    };
    //-----------  End DOM Methods -----------


    //----------- Begin Event Handlers -----------
    // 为jquery事件处理函数保留区块
    onClickChat = function() {
        toggleChat(stateMap.is_chat_retract);
        return false;
    };
    //----------- End Event Handlers   -----------

    //----------- Begin Public Methods   -----------
    // 公开方法放在这里
    initModule = function($container) {
        stateMap.$container = $container;
        $container.html(configMap.main_html);
        setJqueryMap();

        // 初始化绑定事件
        stateMap.is_chat_retract = true;
        jqueryMap.$chat.attr('title', configMap.chat_retract_title).click(onClickChat);
    };

    return {
        initModule: initModule
    };
    //----------- End Public Methods     -----------
})();