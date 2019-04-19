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
const CheInsurance = () => import('@/views/insurance/cheInsurance')
const CaiChanInsurance = () => import('@/views/insurance/caiChanInsurance')
const JianKangInsurance = () => import('@/views/insurance/jianKangInsurance')
const LvYouInsurance = () => import('@/views/insurance/lvYouInsurance')
const OtherInsurance = () => import('@/views/insurance/otherInsurance')
const ShaoErInsurance = () => import('@/views/insurance/shaoErInsurance')
const YiWaiInsurance = () => import('@/views/insurance/yiWaiInsurance')
const ZhongJiInsurance = () => import('@/views/insurance/zhongJiInsurance')
const ShouInsurance = () => import('@/views/insurance/shouInsurance')
const History = () => import('@/views/history/history')
const Vote = () => import('@/views/insurance/vote')
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
        meta: {role: ['superAdmin']},
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
  {
    path: '/cheInsurance',
    iconCls: 'el-icon-item', // 图标样式class
    name: routeNmae.cheInsurance,
    component: Layout,
    alone: true,
    meta: {role: ['ordinary']},
    children: [
      {
        path: '/cheInsurance',
        iconCls: 'el-icon-menu', // 图标样式class
        name: routeNmae.cheInsurance,
        component: CheInsurance,
        meta: {role: ['ordinary']},
        children: []
      },
    ]
  },
  {
    path: '/caiChanInsurance',
    iconCls: 'el-icon-item', // 图标样式class
    name: routeNmae.caiChanInsurance,
    component: Layout,
    alone: true,
    meta: {role: ['ordinary']},
    children: [
      {
        path: '/caiChanInsurance',
        iconCls: 'el-icon-menu', // 图标样式class
        name: routeNmae.caiChanInsurance,
        component: CaiChanInsurance,
        meta: {role: ['ordinary']},
        children: []
      },
    ]
  },
  {
    path: '/jianKangInsurance',
    iconCls: 'el-icon-item', // 图标样式class
    name: routeNmae.jianKangInsurance,
    component: Layout,
    alone: true,
    meta: {role: ['ordinary']},
    children: [
      {
        path: '/jianKangInsurance',
        iconCls: 'el-icon-menu', // 图标样式class
        name: routeNmae.jianKangInsurance,
        component: JianKangInsurance,
        meta: {role: ['ordinary']},
        children: []
      },
    ]
  },
  {
    path: '/lvYouInsurance',
    iconCls: 'el-icon-item', // 图标样式class
    name: routeNmae.lvYouInsurance,
    component: Layout,
    alone: true,
    meta: {role: ['ordinary']},
    children: [
      {
        path: '/lvYouInsurance',
        iconCls: 'el-icon-menu', // 图标样式class
        name: routeNmae.lvYouInsurance,
        component: LvYouInsurance,
        meta: {role: ['ordinary']},
        children: []
      },
    ]
  },
  {
    path: '/shaoErInsurance',
    iconCls: 'el-icon-item', // 图标样式class
    name: routeNmae.shaoErInsurance,
    component: Layout,
    alone: true,
    meta: {role: ['ordinary']},
    children: [
      {
        path: '/shaoErInsurance',
        iconCls: 'el-icon-menu', // 图标样式class
        name: routeNmae.shaoErInsurance,
        component: ShaoErInsurance,
        meta: {role: ['ordinary']},
        children: []
      },
    ]
  },
  {
    path: '/yiWaiInsurance',
    iconCls: 'el-icon-item', // 图标样式class
    name: routeNmae.yiWaiInsurance,
    component: Layout,
    alone: true,
    meta: {role: ['ordinary']},
    children: [
      {
        path: '/yiWaiInsurance',
        iconCls: 'el-icon-menu', // 图标样式class
        name: routeNmae.yiWaiInsurance,
        component: YiWaiInsurance,
        meta: {role: ['ordinary']},
        children: []
      },
    ]
  },
  {
    path: '/zhongJiInsurance',
    iconCls: 'el-icon-item', // 图标样式class
    name: routeNmae.zhongJiInsurance,
    component: Layout,
    alone: true,
    meta: {role: ['ordinary']},
    children: [
      {
        path: '/zhongJiInsurance',
        iconCls: 'el-icon-menu', // 图标样式class
        name: routeNmae.zhongJiInsurance,
        component: ZhongJiInsurance,
        meta: {role: ['ordinary']},
        children: []
      },
    ]
  },
  {
    path: '/shouInsurance',
    iconCls: 'el-icon-item', // 图标样式class
    name: routeNmae.shouInsurance,
    component: Layout,
    alone: true,
    meta: {role: ['ordinary']},
    children: [
      {
        path: '/shouInsurance',
        iconCls: 'el-icon-menu', // 图标样式class
        name: routeNmae.shouInsurance,
        component: ShouInsurance,
        meta: {role: ['ordinary']},
        children: []
      },
    ]
  },
  {
    path: '/otherInsurance',
    iconCls: 'el-icon-item', // 图标样式class
    name: routeNmae.otherInsurance,
    component: Layout,
    alone: true,
    meta: {role: ['ordinary']},
    children: [
      {
        path: '/otherInsurance',
        iconCls: 'el-icon-menu', // 图标样式class
        name: routeNmae.otherInsurance,
        component: OtherInsurance,
        meta: {role: ['ordinary']},
        children: []
      },
    ]
  },
  {
    path: '/vote',
    iconCls: 'el-icon-program', // 图标样式class
    name: routeNmae.vote,
    hidden: true,
    component: Layout,
    children: [
      {
        path: '/vote',
        iconCls: 'el-icon-menu', // 图标样式class
        name: routeNmae.vote,
        component: Vote,
        children: []
      },
    ]
  },
  {
    path: '/history',
    iconCls: 'el-icon-program', // 图标样式class
    name: routeNmae.history,
    hidden: true,
    component: Layout,
    children: [
      {
        path: '/history',
        iconCls: 'el-icon-menu', // 图标样式class
        name: routeNmae.history,
        component: History,
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
