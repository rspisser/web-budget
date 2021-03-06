import Vue from 'vue'
import Router from 'vue-router'
import D3BubbleGraph from './views/D3BubbleGraph.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/credits',
            name: 'credits',
            // route level code-splitting
            // this generates a separate chunk (credit.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('./views/Credit.vue')
        },
        {
            path: '/table',
            name: 'accounts-table',
            component: () => import('./views/AccountsTable.vue')
        }
        ,
        {
            path: '/list',
            name: 'accounts-list',
            component: () => import('./views/AccountsList.vue')

        },
        {
            path: '/terms-and-conditions',
            name: 'terms-and-conditions',
            component: () => import('./views/TermsAndConditions.vue')
        },
        {
            path: '/partition/:urlPartitionID',
            name: 'accounts-partition',
            component: D3BubbleGraph,
            props: true
        },
        {
            path: '/account/:code',
            name: 'account-details',
            component: () => import('./views/AccountDetails.vue'),
            props: true
        },
        {
            path: '/',
            name: 'd3-bubble-graph',
            component: D3BubbleGraph
        },
        {
            path: '*',
            redirect: { name: 'd3-bubble-graph' },
            component: () => import('./views/TermsAndConditions.vue')
        }
    ]
})
