
export default {
    mounted(el, binding) {
        const defaultAnimationClass = 'animate__fadeInUp';
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    console.log("元素进入视野")
                    // 元素进入视野时，添加指定的 CSS 类
                    el.classList.add(binding.value || defaultAnimationClass);
                    // 将透明度设置为1，使元素可见
                    el.style.opacity = 1;
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.17 });
        // 初始时将元素的透明度设置为0
        el.style.opacity = 0;
        observer.observe(el);
    }
}
