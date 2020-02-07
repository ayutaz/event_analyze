import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store/index.js'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      title: 'ホーム'
    }
  },
  {
    path: '/add',
    name: 'add',
    component: () => import('../views/Add.vue'),
    meta: {
      title: '追加'
    }
  },
  {
    path: '/delete',
    name: 'delete',
    component: () => import('../views/Delete.vue'),
    meta: {
      title: '削除'
    }
  },
  {
    path: '/edit/:id',
    name: 'edit',
    component: () => import('../views/Edit.vue'),
    meta: {
      title: '編集'
    }
  },
  {
    path: '/help',
    name: 'help',
    component: () => import('../views/Help.vue'),
    meta: {
      title: 'ヘルプ'
    }
  },
  // NOTE:ここから，管理画面のurl
  {
    path: '/admin',
    name: 'adminIndex',
    component: () => import('../views/Admin/Index.vue'),
    meta: {
      title: '管理画面'
    }
  },
  {
    path: '/admin/add',
    name: 'adminAdd',
    component: () => import('../views/Admin/Add.vue'),
    meta: {
      title: '商品の追加'
    }
  },
  {
    path: '/admin/delete',
    name: 'adminDelete',
    component: () => import('../views/Admin/Delete.vue'),
    meta: {
      title: '商品の削除'
    }
  },
  {
    path: '/admin/edit',
    component: () => import('../views/Admin/Edit.vue'),
    meta: '商品の編集'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

router.afterEach((to, from) => {
  if (to.meta && to.meta.title) {
    store.dispatch('changePage', to.meta.title)
  }
})
