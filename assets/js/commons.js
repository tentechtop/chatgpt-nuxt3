import allLang from "@/assets/js/language";

function getStringValue(text) {
    return text || ''
}

function getIntValue(num) {
    return num || 0
}

function getBooleanValue(b) {
    return b === true || b === "true" ? b : false
}

export  function   scrollToTop(){
    const duration = 300; // 滚动持续时间（毫秒）
    const startPosition = window.scrollY;
    const startTime = performance.now();

    const animateScroll = (timestamp) => {
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


function copyJson(source, fieldArr) {
    if (!source) {
        return {}
    }
    const obj = JSON.parse(JSON.stringify(source))
    if (!fieldArr || fieldArr.length === 0) {
        return obj
    }
    const target = {}
    for (const i in fieldArr) {
        const key = fieldArr[i]
        target[key] = source[key]
        if (target[key] === undefined) {
            target[key] = ''
        }
    }
    return target
}

function toInt(num) {
    if (!num) {
        return 0
    }
    num = parseInt(num)
    if (isNaN(num)) {
        return 0
    }
    return num
}

function deepMerge(oa, ob) {
    // 非空&&是对象
    if (oa && ob && oa instanceof Object && ob instanceof Object) {
        let temp
        if (Array.isArray(oa)) {
            temp = []
            // Array
            const tempA = [...oa]
            let k = 0
            for (; k < tempA.length; k++) {
                // 只复制已有的
                if (k >= ob.length) {
                    break
                }
                if (tempA[k] && ob[k]) {
                    temp.push(deepMerge(tempA[k], ob[k]))
                } else {
                    temp.push(ob[k])
                }
            }
            for (k = tempA.length; k < ob.length; k++) {
                temp.push(ob[k])
            }
        } else {
            // Object
            temp = Object.assign({}, oa)
            for (const k in ob) {
                if (Object.prototype.hasOwnProperty.call(temp, k)) {
                    temp[k] = deepMerge(temp[k], ob[k])
                } else {
                    temp[k] = ob[k]
                }
            }
        }
        return temp
    } else {
        // 基本类型/null 直接替换
        // 如果A,B类型不同 直接替换
        if (!ob && ob !== false && ob !== 0) return oa
        return ob
    }
}

function toCamelName(name) {
    if (!name) {
        return name
    }
    let newName = name.replace("-", "_")
    const nameArr = newName.split("_")
    newName = nameArr[0]
    for (let i = 1; i < nameArr.length; i++) {
        if(nameArr[i] && nameArr[i].length>0){
            newName = newName + nameArr[i].substring(0, 1).toUpperCase() + nameArr[i].substring(1)
        }
    }
    return newName
}



export function timeAgo(time) {
    const now = new Date();
    const createTime = new Date(time.replace(' ', 'T'));

    const diffInSeconds = Math.abs((now - createTime) / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    const diffInWeeks = Math.floor(diffInDays / 7);
    const diffInMonths = Math.floor(diffInDays / 30); // Approximate month as 30 days
    const diffInYears = Math.floor(diffInDays / 365); // Approximate year as 365 days

    let timeDescription = '';

    if (diffInYears > 0) {
        timeDescription = `${diffInYears}年前`;
    } else if (diffInMonths > 0) {
        timeDescription = `${diffInMonths}个月前`;
    } else if (diffInWeeks > 0) {
        timeDescription = `${diffInWeeks}周前`;
    } else if (diffInDays > 0) {
        timeDescription = `${diffInDays}天前`;
    } else if (diffInHours > 0) {
        timeDescription = `${diffInHours}小时前`;
    } else {
        // Changed this part to handle less than an hour case
        timeDescription = `${Math.max(1, diffInMinutes)}分钟前`;
    }

    return timeDescription;
}


export function timeAgoHistory(time) {
    const now = new Date();
    const createTime = new Date(time.replace(' ', 'T'));

    const diffInSeconds = Math.abs((now - createTime) / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    const diffInWeeks = Math.floor(diffInDays / 7);
    const diffInMonths = Math.floor(diffInDays / 30); // Approximate month as 30 days
    const diffInYears = Math.floor(diffInDays / 365); // Approximate year as 365 days

    let timeDescription = '';

    if (diffInYears > 0) {
        timeDescription = `${diffInYears}年前`;
    } else if (diffInMonths > 0) {
        timeDescription = `${diffInMonths}个月前`;
    } else if (diffInWeeks > 0) {
        timeDescription = `${diffInWeeks}周前`;
    } else if (diffInDays > 0) {
        timeDescription = `${diffInDays}天前`;
    } else if (diffInHours > 0) {
        timeDescription = `${diffInHours}小时前`;
    } else {
        // Changed this part to handle less than an hour case
        timeDescription = `1小时前`;
    }
    return timeDescription;
}

export function formatDate(dateStr) {
    // 使用Date对象解析日期字符串
    const date = new Date(dateStr);

    // 获取年、月、日、小时和分钟
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // getMonth()返回的月份是从0开始的
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    // 根据小时数添加"中午"前缀
    const period = hours >= 11 && hours < 13 ? '中午' : hours < 11 ? '上午' : '下午';

    // 格式化月、日、小时和分钟，确保是两位数字
    const formattedMonth = month < 10 ? '0' + month : month;
    const formattedDay = day < 10 ? '0' + day : day;
    const formattedHours = hours % 12 || 12; // 12小时制
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;

    // 组合成最终的格式化字符串
    return `${year}年${formattedMonth}月${formattedDay}日 ${period}${formattedHours}:${formattedMinutes}`;
}


export  function generateRandomID() {
// 获取当前时间的时间戳，单位为微秒
    const timestamp = Date.now() * 10000 + Math.floor(Math.random() * 0x10000);

    // 生成UUID的各个部分
    const timeLow = timestamp & 0xFFFFFFFF;
    const timeMid = (timestamp >> 32) & 0xFFFF;
    const timeHiAndVersion = ((timestamp >> 48) & 0x0FFF) | (1 << 12); // 版本号为1
    const clockSeq = Math.floor(Math.random() * 0x10000) | 0x8000; // 变体号为10xx

    // 将数字转换为十六进制字符串，并填充到所需的长度
    const toHex = (val) => val.toString(16).padStart(4, '0');

    // 构造UUID字符串
    const uuid = `${toHex(timeLow)}-${toHex(timeMid)}-${toHex(timeHiAndVersion)}-${toHex(clockSeq)}-${toHex(Math.floor(Math.random() * 0x100000000) + 0x100000000)}`;

    return uuid;
}

export function getFormatDate(date) {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    const seconds = ('0' + date.getSeconds()).slice(-2);
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}


export function generateNumericUUID(length = 16) {
    const timestamp = Date.now(); // 获取当前时间的时间戳
    const numericStr = timestamp.toString(); // 将时间戳转换为字符串

    // 截取字符串，如果长度小于指定长度，使用随机数填充
    let uuid = numericStr.slice(-Math.min(numericStr.length, length));
    while (uuid.length < length) {
        const randomNumber = Math.floor(Math.random() * 10); // 生成0-9的随机数
        uuid += randomNumber;
    }

    return uuid;
}


export function removeLanguageDomain(route) {
    // 遍历语言数组
    for (const lang of allLang.LanguageList) {
        // 检查路由是否以当前语言的domain开头
        if (route.startsWith(lang.domain)) {
            // 如果是，去掉domain部分
            return route.substring(lang.domain.length);
        }
    }
    // 如果没有匹配的domain，返回原路由
    return route;
}


export default {
    copyJson, getStringValue, getIntValue, getBooleanValue, toInt, deepMerge, toCamelName,scrollToTop
}
