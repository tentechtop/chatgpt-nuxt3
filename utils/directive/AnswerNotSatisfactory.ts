export default {
    // @ts-ignore
    mounted(el, binding) {
        el.addEventListener('mouseenter', () => {
            // 检查是否已经存在一个 div
            let notSatisfactoryDiv = el.querySelector('.AnswerNotSatisfactory');
            // 如果不存在，就创建一个新的
            if (!notSatisfactoryDiv) {
                notSatisfactoryDiv = document.createElement('div');
                notSatisfactoryDiv.innerText = '怪虫机器人';
                notSatisfactoryDiv.className = 'AnswerNotSatisfactory';  // 添加类名
                el.appendChild(notSatisfactoryDiv);
            }
        });

        el.addEventListener('mouseleave', () => {
            const notSatisfactoryDiv = el.querySelector('.AnswerNotSatisfactory');
            if (notSatisfactoryDiv) {
                // 延迟5秒后移除 div
                setTimeout(function() {
                    el.removeChild(notSatisfactoryDiv);
                }, 3000); // 3000毫秒（即3秒）
            }
        });
    },
};
