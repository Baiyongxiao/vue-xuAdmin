import en from '../i18n/lang/en'
import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login/index'
import Layout from '@/views/layout/layout'
import HomeMain from '@/views/index/mainIndex'

// 不是必须加载的组件使用懒加载
const NotFound = () => import('@/page404')
const AdminSetting = () => import('@/views/syssetting/adminSetting')
const ProductMain = () => import('@/views/product/productMain')
const program = () => import('@/views/product/program')

Vue.use(Router)
let routeNmae = en.routeNmae
let defaultRouter = [
  { path: '/',
    redirect: '/index',
    hidden: true,
    children: []
  },
  {
    path: '/login',
    component: Login,
    name: '',
    hidden: true,
    children: []
  },
  {
    path: '/index',
    iconCls: 'fa fa-dashboard', // 图标样式class
    name: routeNmae.home,
    component: Layout,
    alone: true,
    children: [
      {
        path: '/index',
        iconCls: 'fa fa-dashboard', // 图标样式class
        name: '主页',
        component: HomeMain,
        children: []
      }
    ]
  },
  {
    path: '/404',
    component: NotFound,
    name: '404',
    hidden: true,
    children: []
  },
]

let addRouter = [

  {
    path: '/adminSetting',
    iconCls: 'el-icon-setting', // 图标样式class
    name: routeNmae.systemSettings,
    component: Layout,
    alone: true,
    meta: {role: ['superAdmin']},
    children: [
      {
        path: '/adminSetting',
        iconCls: 'el-icon-menu', // 图标样式class
        name: routeNmae.adminSetting,
        component: AdminSetting,
        children: []
      },
    ]
  },
  {
    path: '/productMain',
    iconCls: 'el-icon-product', // 图标样式class
    name: routeNmae.productMain,
    component: Layout,
    alone: true,
    meta: {role: ['admin']},
    children: [
      {
        path: '/productMain',
        iconCls: 'el-icon-menu', // 图标样式class
        name: routeNmae.productMain,
        component: ProductMain,
        meta: {role: ['admin']},
        children: []
      },
    ]
  },
  {
    path: '/program',
    iconCls: 'el-icon-program', // 图标样式class
    name: routeNmae.program,
    hidden: true,
    component: Layout,
    children: [
      {
        path: '/program',
        iconCls: 'el-icon-menu', // 图标样式class
        name: routeNmae.program,
        component: program,
        children: []
      },
    ]
  },
  { path: '*',
    redirect: '/404',
    hidden: true,
    children: []
  },

]
export default new Router({
  routes: defaultRouter
})
export {defaultRouter, addRouter}
