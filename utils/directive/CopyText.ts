export default {
    // @ts-ignore
    mounted(el, binding) {
        el.addEventListener('mouseenter', () => {
            // 检查是否已经存在一个按钮
            let copyButton = el.querySelector('button');
            // 如果不存在，就创建一个新的
            if (!copyButton) {
                copyButton = document.createElement('button');
                copyButton.innerText = '';
                copyButton.className = 'copyMessageButton';  // 添加类名
                if (navigator.clipboard && window.isSecureContext) {
                    copyButton.addEventListener('click', () => {
                        navigator.clipboard.writeText(el.innerText);
                        copyButton.className = 'alreadyCopied';  // 添加类名
                    });
                }
                el.appendChild(copyButton);
            }
        });

        el.addEventListener('mouseleave', () => {
            setTimeout(function() {
                const copyButton = el.querySelector('button');
                if (copyButton) {
                    // 延迟3秒后移除已复制的类
                    el.removeChild(copyButton);
                }
            }, 3000); // 3000毫秒（即3秒）
        });
    },
};
