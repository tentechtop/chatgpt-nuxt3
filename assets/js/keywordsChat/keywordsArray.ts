let keywordsItemArrayList = [
    {
        keywordsId:1,
        keywords:["联系方式","联系邮箱"],
        message:"hcg2077@163.com😉",
    },
    {
        keywordsId:1,
        keywords:["你能做什么","你能个什么"],
        message:"我可以回答各种问题，提供信息，帮助解决问题，进行闲聊，讲笑话，甚至进行文本内容创作。如果您需要帮助或有任何疑问，请随时告诉我。😉",
    },
    {
        keywordsId:1,
        keywords:["你知道什么","你知道什么东西"],
        message:"我有关各种不同的主题，包括科学、历史、文化、技术、艺术等方面的知识。如果你有任何问题或者想了解某个具体的内容，欢迎问我！😉",
    },
    {
        keywordsId:1,
        keywords:["再见"],
        message:"再见！如果您有其他问题，欢迎随时向我提问。祝您有愉快的一天！😉",
    },
    {
        keywordsId:1,
        keywords:["好的"],
        message:"好的！如果您有其他问题，欢迎随时向我提问。祝您有愉快的一天！😉",
    },
    {
        keywordsId:1,
        keywords:["智障","傻逼","废物","你是个大聪明"],
        message:"我听不懂你在说什么。🤔",
    },
    {
        keywordsId:1,
        keywords: ["你好","您好","你好啊","您好啊"],
        message:"您好，请问有什么可以帮您。😊",
    },
    {
        keywordsId:1,
        keywords: ["你是谁","你叫什么名字","你的名字叫什么","你的名字"],
        message:"我是全基于ChatGPT3.5的智能对话模型。如果您有任何问题，可以随时向我提问。😊",
    },
    {
        keywordsId:1,
        keywords:["牛逼啊","牛逼","太强了","太棒了","你很牛逼啊","你很牛逼","可以的"],
        message:"谢谢夸奖😎！",
    },
]




let emojiList = [
    "😊",
    "😄",
    "😃",
    "😀",
    "😁",
    "😆",
    "😂",
    "🤣",
    "😊",
    "😎",
    "😘",
    "🤗",
    "🤔",
]

// @ts-ignore
function getRandomEmoji(emojiList) {
    const randomIndex = Math.floor(Math.random() * emojiList.length);
    return emojiList[randomIndex];
}

// @ts-ignore
let keywordsArrayList = []/*数组类型的关键词*/

/*关键词元素数组*/
let keywordsALLInfoList = []
let keywordsMap = new Map()


keywordsItemArrayList.forEach((key,index)=>{
    key.keywordsId=index
    /*    const randomEmoji = getRandomEmoji(emojiList);
        key.message += randomEmoji*/
    keywordsMap.set(key.keywordsId,key)
    keywordsArrayList.push(key.keywords)
})

keywordsALLInfoList=keywordsItemArrayList

export default {
    // @ts-ignore
    keywordsArrayList,keywordsALLInfoList,keywordsMap
}
