var spa = (function($) {
    // 配置信息对象
    var configMap = {
            extended_height: 434,
            extended_title: 'Click to retract',
            retract_height: 16,
            retract_title: 'Click to extend',
            template_html: '<div class="spa-slider"></div>'
        },
        // 聊天滑块对象
        $chatSlider,
        // 切换滑块方法
        toggleSlider,
        // 响应用户点击函数
        onClickSlider,
        // 初始化模块
        initModule;

    /**
     * 切换DOM高度变化
     * @return {[type]} [description]
     */
    toggleSlider = function(){
        var slider_height = $chatSlider.height();
        if (slider_height == configMap.retract_height) {
            $chatSlider.animate({
                height: configMap.extended_height
            }, 300).attr('title', configMap.extended_title);
            return true;
        }else if(slider_height == configMap.extended_height){
            $chatSlider.animate({
                height: configMap.retract_height
            }, 300).attr('title',configMap.retract_title);
            return true;
        }
        // 在动画过程中，停止其他动画
        return false;
    };

    /**
     * 点击事件处理函数
     * @param  {[type]} e [description]
     * @return {[type]}   [description]
     */
    onClickSlider = function(e) {
        toggleSlider();
        return false;
    };

    // 初始化模块函数
    initModule = function($container) {
        // 渲染 HTML
        $container.html(configMap.template_html);

        $chatSlider = $container.find('.spa-slider');
        // 初始化 slider height、title
        $chatSlider.attr('title',configMap.retract_title);
        // 绑定用户点击事件
        $chatSlider.on('click',onClickSlider);
        return true;
    };

    return {initModule: initModule};
}(jQuery));