/**
 * Created by WebStorm.
 * User: nirongxu
 * Date: 2018/12/8
 * Description: 文件描述
 */
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
const cn = {
  routeNmae: {
    home: '主页',
    systemSettings: '系统设置',
    adminSetting: '管理员设置',
    roleSetting: '权限设置',
    productMain: '产品管理',
    cheInsurance: '车险',
    caiChanInsurance: '财产险',
    jianKangInsurance: '健康险',
    lvYouInsurance: '旅游险',
    otherInsurance: '其他险',
    shaoErInsurance: '少儿险',
    yiWaiInsurance: '意外险',
    zhongJiInsurance: '重疾险',
    shouInsurance: '寿险',
    history: '历史记录',
    program: '产品方案管理',
    votedUser: '投票用户',
    vote: '投票页面',
    comment: '评价页面',
  },
  rightMenu: {
    close: '关闭',
    closeOther: '关闭其他',
    closeAll: '全部关闭'
  },
  role: {
    superAdmin: '超级管理员',
    admin: '管理员',
    ordinary: '普通用户'
  },
  userDropdownMenu: {
    basicInfor: '基本资料',
    history: '历史记录',
    logout: '退出'
  },

  ...zhLocale   //  合并element-ui内置翻译
}

export default cn
