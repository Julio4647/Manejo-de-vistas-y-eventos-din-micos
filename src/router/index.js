import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/components/Home.vue'
import Breadcrumb from 'vue-2-breadcrumbs';
import Formulario from '@/components/Formulario.vue'
import Paginacion from '@/components/Paginacion.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: Home },
  { path: '/formulario', component: Formulario },
  { path: '/paginacion', component: Paginacion }
]

const router = new VueRouter({
  routes
})
Vue.use(Breadcrumb, {
    template: '<breadcrumb :route-match="$route.matched"></breadcrumb>'
  });

export default router
