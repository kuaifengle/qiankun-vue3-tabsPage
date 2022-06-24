export const menuDataList = [{
        title: 'main-首页',
        path: '/home',
    },
    {
        title: 'main-关于',
        path: '/about?id=123123123',
    },
    {
        title: 'main-用户',
        path: '/user',
    },
    {
        title: 'App1 User',
        path: '/app1/user',
    },
    {
        title: 'App1 About',
        path: '/app1/about',
    },
    {
        title: 'App2-User',
        path: '/app2/user',
    },
    {
        title: 'App2-About',
        path: '/app2/about',
    },
    {
        title: '再次打开->App2-About',
        path: '/app2/about?id=123&age=999岁&name=kuaifengle',
    },
    {
        title: '强制打开->App2-userDeatil',
        path: '/app2/user/detail?mustJump=true&pageTabTitle=用户详情',
    },
    {
        title: '假装打开一个加载失败的应用',
        path: '/app3/abc',
    },
]

let map = {}
menuDataList.forEach((item) => {
    map[item['path']] = item['title']
})

export const menuTitleData = map;