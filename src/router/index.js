import Vue from 'vue'
import Router from 'vue-router'
import Editor from '../components/Editor'
import Admin from '../components/Admin'
import Publish from '../components/Publish'
import AddAccount from '../components/menu/addAccount'
import AdminAccount from '../components/menu/adminAccount'
import HeadlineCom from '../components/release/headlineCom'
import HundredCom from '../components/release/hundredCom'
import NeteaseCom from '../components/release/neteaseCom'
import PenguinsCom from '../components/release/penguinsCom'
import UcCom from '../components/release/ucCom'
import EditCom from '../components/release/editCom'

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/editor',
      name: 'Editor',
      component: Editor,
      redirect: '/editor/edit',
      children: [
        {
          path: '/editor/edit',
          component: EditCom
        },
        {
          path: '/editor/headline',
          component: HeadlineCom
        },
        {
          path: '/editor/hundred',
          component: HundredCom
        },
        {
          path: '/editor/netease',
          component: NeteaseCom
        },
        {
          path: '/editor/penguins',
          component: PenguinsCom
        },
        {
          path: '/editor/uc',
          component: UcCom
        }
      ]
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin,
      redirect: '/admin/addaccount',
      children: [
        {
          path: '/admin/addaccount',
          component: AddAccount
        },
        {
          path: '/admin/adminaccount',
          component: AdminAccount
        }
      ]
    },
    {
      path: '/publish',
      name: 'Publish',
      component: Publish
    },
    {
      path: '*',
      component: Editor
    }
  ]
})
