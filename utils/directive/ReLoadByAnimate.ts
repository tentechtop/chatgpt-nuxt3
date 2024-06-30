export default {
    // @ts-ignore
    mounted(el, binding) {
        const options = binding.value || { animationClass: 'animate__fadeInUpByCustom', threshold: 0.25 };

        const defaultAnimationClass = 'animate__fadeInUpByCustom';
        const defaultThreshold = 0.25;
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // 元素进入视野时，添加指定的 CSS 类
                    el.classList.add('animate__animated');
                    el.classList.add(options.animationClass || 'animate__fadeInUpByCustom');
                    // 将透明度设置为1，使元素可见
                    /*el.style.opacity = 1;*/
                    el.style.transition = 'all 0s ease'
                    observer.unobserve(entry.target);
                } else {
                    // Element leaves the viewport, remove animate__animated class
                    el.classList.remove('animate__animated');
                    // You may want to remove the specific animation class as well
                    el.classList.remove(options.animationClass || 'animate__fadeInUpByCustom');
                }
            });
        }, { threshold: options.threshold || 0.25 });
        // 初始时将元素的透明度设置为0
        /*el.style.opacity = 0;*/




        observer.observe(el);
    }
}
