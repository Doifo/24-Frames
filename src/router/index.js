import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Homepage from '@/views/Homepage'
import Login from '@/views/Login'
import Search from '@/views/Search'
import Upload from '@/views/Upload'
import Detail from '@/views/Detail'
import Me from '@/views/Me'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/helloworld',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/',
      component: Login
    },
    {
      path: '/homepage',
      component: Homepage
    },
    {
      path: '/search',
      component: Search
    },
    {
      path: '/upload',
      component: Upload
    },
    {
      path:'/detail/:id',
      component:Detail
    },
    {
      path:'/me',
      component:Me
    }
  ],
  mode: 'history'
})
