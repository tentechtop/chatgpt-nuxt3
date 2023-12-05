const scrollToTop = () => {
    const duration = 300; // 滚动持续时间（毫秒）
    const startPosition = window.scrollY;
    const startTime = performance.now();

    const animateScroll = (timestamp: DOMHighResTimeStamp) => {
        const currentTime = timestamp - startTime;
        const progress = Math.min(currentTime / duration, 1);
        const easeProgress = 0.5 - 0.5 * Math.cos(progress * Math.PI);
        window.scrollTo(0, startPosition - easeProgress * startPosition);
        if (currentTime < duration) {
            requestAnimationFrame(animateScroll);
        }
    };
    requestAnimationFrame(animateScroll);
}


export default {
    scrollToTop,
}
