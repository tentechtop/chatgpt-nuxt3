function getStringValue(text) {
    return text || ''
}

function getIntValue(num) {
    return num || 0
}

function getBooleanValue(b) {
    return b === true || b === "true" ? b : false
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

export default {
    copyJson, getStringValue, getIntValue, getBooleanValue, toInt, deepMerge, toCamelName
}
