const caseList = [
    {
        caseId:1,
        sort:1,
        caseTitle:"", //标题
        caseSummary:"", //概述
        caseContent:"", //html内容
        caseImage:"", //封面
        category:1,  //一个新闻只有一个分类
        date:"",//时间
        previousNews:null,
        nextNews:2,
    },
]

let categoryMap = new Map()
categoryMap.set(1,{categoryId:1, categoryName:"公司新闻"})
categoryMap.set(2,{categoryId:2, categoryName:"行业新闻"})

let caseMap = new Map()

caseList.forEach((caseItem,caseIndex)=>{

})

export default {
    categoryMap,caseList,caseMap
}
