import Vue from 'vue'
import Router from 'vue-router'
// import i18n from 'components/lang'
Vue.use(Router)

const routes = [
  {
    path: '/',
    component: () => import('../app/Home.vue').then(m => m.default)
  },
  {
    path: '/game',
    name: 'game',
    component: () => import('../app/game/game.vue').then(m => m.default)
  },
  {
    path: '/gmap',
    name: 'gmap',
    component: () => import('../app/gmap/gmap.vue').then(m => m.default)
  },
  {
    path: '/gmapstreet',
    name: 'gmapstreet',
    component: () => import('../app/gmap/gmapstreet.vue').then(m => m.default)
  },
  {
    path: '/showinfo',
    name: 'showinfo',
    component: () => import('../app/showinfo/showinfo.vue').then(m => m.default)
  },
  {
    path: '/showdata',
    name: 'showdata',
    component: () => import('../app/showdata/showdata.vue').then(m => m.default)
  },
  {
    path: '/a',
    name: 'a',
    component: () => import('../components/a/a.vue').then(m => m.default)
  },
  {
    path: '/ab',
    name: 'ab',
    component: () => import('../components/ab/ab.vue').then(m => m.default)
  },
  {
    path: '/abc',
    name: 'abc',
    component: () => import('../components/abc/abc.vue').then(m => m.default)
  }
  ,
  {
    path: '/abcd',
    name: 'abcd',
    component: () => import('../components/abc/abcd.vue').then(m => m.default)
  }
]

const router = new Router({
  routes
})

export default router

