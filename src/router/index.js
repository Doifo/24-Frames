import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Homepage from '@/views/Homepage'
import Movies from '@/views/Movies'
import Search from '@/views/Search'
import Upload from '@/views/Upload'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/helloworld',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/login',
      component: Homepage
    },
    {
      path: '/homepage',
      component: Movies
    },
    {
      path: '/search',
      component: Search
    },
    {
      path: '/upload',
      component: Upload
    }
  ],
  mode: 'history'
})
