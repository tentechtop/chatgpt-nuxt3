const newsList = [
    {
        newsId:1,
        sort:1,
        newsTitle:"", //标题
        newsSummary:"", //概述
        newsContent:"", //html内容
        newsImage:"", //封面
        category:1,  //一个新闻只有一个分类
        date:"",//时间
        previousNews:null,
        nextNews:2,
    },
]

let categoryMap = new Map()
categoryMap.set(1,{categoryId:1, categoryName:"公司新闻"})
categoryMap.set(2,{categoryId:2, categoryName:"行业新闻"})

let newsMap = new Map()

newsList.forEach((newsItem,newsIndex)=>{

})

export default {
    categoryMap,newsList,newsMap
}
