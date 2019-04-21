/**
 * Created by WebStorm.
 * User: nirongxu
 * Date: 2018/12/8
 * Description: 文件描述
 */

import enLocale from 'element-ui/lib/locale/lang/en'
const en = {
  routeNmae: {
    home: 'home',
    systemSettings: 'systemSettings',
    adminSetting: 'adminSetting',
    roleSetting: 'roleSetting',
    productMain: 'productMain',
    cheInsurance: 'cheInsurance',
    caiChanInsurance: 'caiChanInsurance',
    shaoErInsurance: 'shaoErInsurance',
    jianKangInsurance: 'jianKangInsurance',
    otherInsurance: 'otherInsurance',
    lvYouInsurance: 'lvYouInsurance',
    yiWaiInsurance: 'yiWaiInsurance',
    zhongJiInsurance: 'zhongJiInsurance',
    shouInsurance: 'shouInsurance',
    history: 'history',
    program: 'program',
    votedUser: 'votedUser',
    vote: 'vote',
    comment: 'comment',
  },
  rightMenu: {
    close: 'close',
    closeOther: 'closeOther',
    closeAll: 'closeAll'
  },
  role: {
    superAdmin: 'superAdmin',
    admin: 'admin',
    ordinary: 'ordinary'
  },
  userDropdownMenu: {
    basicInfor: 'basicInfor',
    history: 'history',
    logout: 'logout'
  },

  ...enLocale   //  合并element-ui内置翻译
}

export default en
