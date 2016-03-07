/**
 *  spa.shell.js
 *  Shell module for SPA
 */
spa.shell = (function() {
    //----------- 模块变量 -----------
    // 静态配置值
    var configMap = {
        anchor_schema_map: {
            chat: { open: true, close: true}
        },
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
        anchor_map: {},
        is_chat_retract: true
    };

    // jquery 对象缓存
    var jqueryMap = {};

    // 模块变量，之后赋值
    var setJqueryMap,
        toggleChat,
        onClickChat,
        initModule,
        copyAnchorMap,
        changeAnchorPart,
        onHashChange;
    //----------- 模块变量 -----------


    //----------- Utility Methods -----------
    // 保留区块，这里的方法不和页面元素交互

    // 复制锚点配置
    copyAnchorMap = function(){
        return $.extend(true,{},stateMap.anchor_map);
    };
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

    changeAnchorPart = function(arg_map){
        var anchor_map_revise = copyAnchorMap(),
            bool_return = true,
            key_name,
            key_name_dep;

        KEYVAL:
        for(key_name in arg_map){
            if(arg_map.hasOwnProperty(key_name)){

                //跳过依赖的键在遍历过程中
                if(key_name.indexOf('_') === 0) { continue KEYVAL;}

                // 更新独立 键值
                anchor_map_revise[key_name] = arg_map[key_name];

                // 更新依赖的键值对
                key_name_dep = '_' + key_name;
                if(arg_map[key_name_dep]){
                    anchor_map_revise[key_name_dep] = arg_map[key_name_dep];
                }else{
                    delete anchor_map_revise[key_name_dep];
                    delete anchor_map_revise['_s' + key_name_dep];
                }
            }
        }
        console.log('anchor_map_revise:',anchor_map_revise);
        // 尝试改变uri，如果报错，回滚到上一次的状态
        try{
            $.uriAnchor.setAnchor(anchor_map_revise);
        }catch(e){
            $.uriAnchor.setAnchor( stateMap.anchor_map,null,true);
            bool_return = false;
        }

        return bool_return;
    }
    //-----------  End DOM Methods -----------


    //----------- Begin Event Handlers -----------
    // 为jquery事件处理函数保留区块
    onClickChat = function() {
        changeAnchorPart({
            chat: stateMap.is_chat_retract ? 'open':'close'
        });
    };

    onHashChange = function(event){
        var anchor_map_previous = copyAnchorMap(),
            anchor_map_proposed,
            _s_chat_previous,
            _s_chat_proposed,
            s_chat_proposed;

        try{
            anchor_map_proposed = $.uriAnchor.makeAnchorMap();
        }catch(e){
            $.uriAnchor.setAnchor(anchor_map_previous,null,true);
            return false;
        }

        stateMap.anchor_map = anchor_map_proposed;

        _s_chat_previous = anchor_map_previous._s_chat;
        _s_chat_proposed = anchor_map_proposed._s_chat;

        if(!anchor_map_previous || _s_chat_previous !== _s_chat_proposed){
            s_chat_proposed = anchor_map_proposed.chat;
            switch(s_chat_proposed) {
                case 'open':
                    toggleChat(true);
                    break;
                case 'close':
                    toggleChat(false);
                    break;
                default:
                    toggleChat(false);
                    delete anchor_map_proposed.chat;
                    $.uriAnchor.setAnchor(anchor_map_proposed,null,true);
            }
        }
        return false;
    }
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


        // 配置校验模式，只有在configMap.anchor_schema_map中配置的才会解析
        $.uriAnchor.configModule({
            schema_map: configMap.anchor_schema_map
        });

        $(window).on('hashchange',onHashChange).trigger('hashchange');
    };

    return {
        initModule: initModule
    };
    //----------- End Public Methods     -----------
})();