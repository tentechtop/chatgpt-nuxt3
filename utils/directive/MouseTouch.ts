export default {
    // @ts-ignore
    mounted(el, binding) {
        el.addEventListener('touchstart', () => {
            // 添加指定的 CSS 类
            el.classList.add('animate__fadeInBottomLeft');
        });
    }
}
