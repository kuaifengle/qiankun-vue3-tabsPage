export const microAppConfig = [{
        id: 'container-1',
        name: 'app1',
        entry: process.env.NODE_ENV !== 'production' ? '//localhost:7001' : '/subPages/app1/',
        container: '#container-1',
        activeRule: '/app1'
    },
    {
        id: 'container-2',
        name: 'app2',
        entry: process.env.NODE_ENV !== 'production' ? '//localhost:7002' : '/subPages/app2/',
        container: '#container-2',
        activeRule: '/app2'
    },
    {
        id: 'container-3',
        name: 'app3',
        entry: process.env.NODE_ENV !== 'production' ? '//localhost:7003' : '/subPages/app3/',
        container: '#container-3',
        activeRule: '/app3'
    }
]