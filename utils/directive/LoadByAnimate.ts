export default {
    // @ts-ignore
    mounted(el, binding) {
        el.style.opacity = 0;
        el.classList.add('animate__animated');
        const defaultDelayTime = 0; //ms
        const defaultThreshold = 0.55;
        const defaultInAnim = 'animate__fadeInUpByCustom';
        const defaultOutAnim = 'animate__fadeOutUpByCustom';
        const exitAnim = false //默认无退场动画

        const options = {
            inAnim: binding.value && binding.value.inAnim || defaultInAnim,
            outAnim: binding.value && binding.value.outAnim || defaultOutAnim,
            threshold: binding.value && binding.value.threshold !== undefined ? binding.value.threshold : defaultThreshold,
            delayTime: binding.value && binding.value.delayTime !== undefined ? binding.value.delayTime : defaultDelayTime,
            exitAnim: binding.value && binding.value.exitAnim !== undefined ? binding.value.exitAnim : exitAnim
        };

        // 只关注高度视口，忽略宽度
        const observerOptions = {
            threshold: options.threshold
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {


                    if (!options.exitAnim){
                        observer.unobserve(entry.target); //取消监听
                    }
                    if (options.exitAnim && el.classList.contains(options.outAnim)){
                        el.classList.remove(options.outAnim);
                    }
                    setTimeout(()=>{
                        el.classList.add(options.inAnim);
                    },options.delayTime)

                }else {
                    el.classList.remove(options.inAnim);
                    if (options.exitAnim){
                        el.classList.add( options.outAnim);
                    }
                    console.log("消失")
                }
            });
        }, observerOptions);
        // 初始时将元素的透明度设置为0
        /*el.style.opacity = 0;*/
        observer.observe(el);
    }
}

/*使用

v-loadByAnimate="{
      inAnim:'animate__fadeInUpByCustom',
      outAnim:'animate__zoomInByCustom',
      delayTime: 500, // 延迟时间，单位毫秒
      threshold: 0.75, // 触发动画的阈值，默认是0.55
      exitAnim: true // 是否添加退出视口的动画
    }"

*/
