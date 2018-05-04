import Vue from 'vue'
import Router from 'vue-router'
import Homes from '@/page/home/Homes'
import Catea from '@/page/category/Catea'
import Car from '@/page/cart/Car'
import Mes from '@/page/me/Mes'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Homes',
            component: Homes
        },
        {
            path: '/catea',
            name: 'Catea',
            component: Catea
        },
        {
            path: '/car',
            name: 'Car',
            component: Car
        },
        {
            path: '/mes',
            name: 'Mes',
            component: Mes
        },
    ],
    linkActiveClass: 'active'
})
