/**
 * spa.chat.js
 * chat feature module for SPA
 */
/* global $,spa, getComputedStyle */
spa.chat = (function(){
    //----------- 模块变量 -----------
    // 静态配置值
    var configMap = {
        main_html: String()
            + '<div class="spa-chat">'
                + '<div class="spa-chat-head">'
                    + '<div class="spa-chat-head-toggle"></div>'
                    + '<div class="spa-chat-head-title">Chat</div>'
                + '</div>'
                + '<div class="spa-chat-closer">X</div>'
                + '<div class="spa-chat-sizer">'
                    + '<div class="spa-chat-msgs"></div>'
                    + '<div class="spa-chat-box">'
                        + '<input type="text">'
                        + '<div>send</div>'
                    + '</div>'
                + '</div>'
            + '</div>',
        settable_map: {
            slider_open_time: true,
            slider_close_time: true,
            slider_opened_em: true,
            slider_closed_em: true,
            slider_opened_title: true,
            slider_closed_title: true,

            chat_model: true,
            people_model: true,
            set_chat_anchor: true
        },

        slider_open_time: 250,
        slider_close_time: 250,
        slider_opened_em: 16,
        slider_closed_em: 2,
        slider_opened_title: 'Click to close',
        slider_closed_title: 'Click to open',

        chat_model: null,
        people_model: null,
        set_chat_anchor: null

    };

    // 动态信息
    var stateMap = {
        $append_target: null,
        position_type: 'close',
        px_per_em: 0,
        slider_hidden_px: 0,
        slider_closed_px: 0,
        slider_opened_px: 0
    };

    // jquery 对象缓存
    var jqueryMap = {};

    // 模块变量，之后赋值
    var setJqueryMap,
        getEmSize,
        setPxSize,
        setSliderPosition,
        onClickToggle,
        initModule,
        configModule;
    //----------- 模块变量 -----------


    //----------- Utility Methods -----------
    getEmSize = function(elem){
        return Number(getComputedStyle(elem,'').fontSize.match(/\d*\.?\d*/)[0]);
    };
    //----------- Utility Methods -----------

    //-----------Begin DOM Methods -----------
    setJqueryMap = function() {
        var $append_target = stateMap.$append_target,
            $slider = $append_target.find('.spa-chat');

        jqueryMap = {
            $slider: $slider,
            $head: $slider.find('.spa-chat-head'),
            $toggle: $slider.find('.spa-chat-head-toggle'),
            $title: $slider.find('.spa-chat-head-title'),
            $sizer: $slider.find('.spa-chat-sizer'),
            $msgs: $slider.find('.spa-chat-msgs'),
            $box: $slider.find('.spa-chat-box'),
            $input: $slider.find('.spa-chat-input input[type=text]')
        };
    };

    /**
     * 计算由该模块管理的元素的像素尺寸
     */
    setPxSize = function(){
        var px_per_em,
            opened_height_em;

        px_per_em = getEmSize(jqueryMap.$slider.get(0));
        opened_height_em = configMap.slider_opened_em;

        stateMap.px_per_em = px_per_em;
        stateMap.slider_closed_px = configMap.slider_closed_em * px_per_em;
        stateMap.slider_opened_px = opened_height_em * px_per_em;
    }
    //-----------  End DOM Methods -----------


    //----------- Begin Event Handlers -----------

    //----------- End Event Handlers   -----------

    //----------- Begin Public Methods   -----------
    /**
     * 在初始化之前配置模块
     * @param  {[type]} input_map [description]
     * @return {[type]}           [description]
     */
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
        configModule: configModule,
        initModule: initModule
    };
    //----------- End Public Methods     -----------
})();