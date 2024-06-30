export default {
    // @ts-ignore
    mounted(el, binding) {
        el.style.setProperty('transition', 'all 0.3s ease');

        // 只关注高度视口，忽略宽度
        const observerOptions = {
            root: null, // 观察相对于浏览器窗口的交叉
            threshold: [0, 0.25, 0.5,0.75, 1] // 可以是一个数组，表示多个阈值
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {

                const intersectionRatio = entry.intersectionRatio;
                console.log("交叉值: "+intersectionRatio)

                if (intersectionRatio >= 0.75) {
                    // 元素完全在视口中
                    el.style.width = '100%';
                } else {
                    // 元素部分或完全不在视口中
                    el.style.width = '80%';
                }



            });
        }, observerOptions);
        observer.observe(el);
    }
}

