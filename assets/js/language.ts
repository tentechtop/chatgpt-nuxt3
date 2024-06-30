const regionList = [
    {
        title:"亚太",
        languageList: [
            {language:"zh", langEnName:"Chinese Simplified", dialect:"简体中文" ,domain:"/zh"},
/*
            {language:"zh-CN", langEnName:"Chinese Simplified", dialect:"简体中文" ,domain:"/zh-CN" },
*/



/*            {language:"ja", langEnName:"Japanese", dialect:"日本語" ,domain:"/ja"},
            {language:"ru", langEnName:"Russian", dialect:"Русский" ,domain:"/ru"},
            {language:"kr", langEnName:"Korean", dialect:"한국어" ,domain:"/kr"},
            {language:"vn", langEnName:"Vietnamese", dialect:"Tiếng Việt" ,domain:"/vn"},*/
        ]
    },
    {
        title:"Europe",
        languageList: [
            {language:"en", langEnName:"English", dialect:"English"  ,domain:"/en"},
/*            {language:"en-US", langEnName:"English", dialect:"English"  ,domain:"/en-US"},*/
/*            {language:"de", langEnName:"German", dialect:"Deutsch" ,domain:"/de"},
            {language:"fr", langEnName:"French", dialect:"Français" ,domain:"/fr"},
            {language:"es", langEnName:"Spanish", dialect:"Español" ,domain:"/es"},
            {language:"tr", langEnName:"Turkish", dialect:"Turkish" ,domain:"/tr"},*/



        ]
    },
    {
        title:"North America",
        languageList: [
/*            {language:"en-US", langEnName:"USA", dialect:"USA" ,domain:"/en-US"},*/
        ]
    },

];

const LanguageMap = new Map()
const LanguageList =  new Array()

regionList.forEach((region)=>{
    region.languageList.forEach(langItem =>{
        LanguageMap.set(langItem.language,langItem)
        LanguageList.push(langItem)
    })
})


export default {
    regionList,LanguageMap,LanguageList
}
