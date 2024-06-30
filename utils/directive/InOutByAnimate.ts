export default {
    // @ts-ignore
    mounted(el, binding) {
        const options = binding.value || {
            enterAnimationClass: 'animate__fadeIn',
            leaveAnimationClass: 'animate__fadeOut',
            threshold: 0.25
        };
        const defaultEnterAnimationClass = 'animate__fadeIn';
        const defaultLeaveAnimationClass = 'animate__fadeOut';
        const defaultThreshold = 0.25;

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                el.classList.add('animate__animated');
                el.classList.remove('animate__fadeInUpByCustom');
                if (entry.isIntersecting) {
                    // Element enters the viewport
                    el.classList.add(options.enterAnimationClass || defaultEnterAnimationClass);

                    observer.unobserve(entry.target);
                } else {
                    // Element leaves the viewport
                    el.classList.remove(options.enterAnimationClass || defaultEnterAnimationClass);
                    el.classList.add(options.leaveAnimationClass || defaultLeaveAnimationClass);

                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: options.threshold || defaultThreshold });

        observer.observe(el);
    }
}
