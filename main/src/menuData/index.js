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
]

let map = {}
menuDataList.forEach((item) => {
    map[item['path']] = item['title']
})

export const menusTitleMap = map;