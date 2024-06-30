// @ts-ignore
const messages = import.meta.glob('../../locales/*', {eager: true})


function getLocaleAll(): any {
    let message: any = {};
    for (const path in messages) {
        // 找到最后一个斜杠的位置
        const lastSlashIndex = path.lastIndexOf('/');
        // 截取从最后一个斜杠之后到字符串末尾的部分
        const substringAfterLastSlash = path.substring(lastSlashIndex + 1);
        // 找到文件扩展名的位置
        const dotIndex = substringAfterLastSlash.lastIndexOf('.');
        const locale = dotIndex !== -1 ? substringAfterLastSlash.substring(0, dotIndex) : substringAfterLastSlash;
        // @ts-ignore
        message[locale] = messages[path].default;
    }
    return message;
}


export default defineI18nConfig(() => {
    return {
        legacy: false,
        locale: 'cn',
        fallbackLocale: 'cn',
        messages:getLocaleAll()
    }
})
