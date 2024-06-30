export default {
    //@ts-ignore
    mounted(el, binding) {
        // 监听 document 的点击事件
        document.addEventListener('click', (event) => {
            // 检查点击的位置是否在元素内部或者元素本身
            if (!(el.contains(event.target) || el === event.target)) {

            }else {

            }
        });
    },
};
