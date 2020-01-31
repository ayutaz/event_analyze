import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/add',
    name: 'add',
    component: () => import('../views/Add.vue')
  },
  {
    path: '/delete',
    name: 'delete',
    component: () => import('../views/Delete.vue')
  },
  {
    path: '/edit',
    name: 'edit',
    component: () => import('../views/Edit.vue')
  },
  {
    path: '/list',
    name: 'list',
    component: () => import('../views/List.vue')
  },
  {
    path: '/help',
    name: 'help',
    component: () => import('../views/Help.vue')
  },
  // NOTE:ここから，管理画面のurl
  {
    path: '/admin',
    name: 'adminIndex',
    component: () => import('../views/Admin/Index.vue')
  },
  {
    path: '/admin/add',
    name: 'adminAdd',
    component: () => import('../views/Admin/Add.vue')
  },
  {
    path: '/admin/delete',
    name: 'adminDelete',
    component: () => import('../views/Admin/Delete.vue')
  },
  {
    path: '/admin/edit',
    component: () => import('../views/Admin/Edit.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
