import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const LandingPage = () => import('@/components/LandingPage/LandingPage.vue')
const RoomMenu = () => import('@/components/RoomMenu/RoomMenu.vue')
const TransmissionRoom = () => import('@/components/TransmissionRoom/TransmissionRoom.vue')

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: LandingPage
    },
    {
      path: '/RoomMenu/:searching',
      name: 'room-menu',
      component: RoomMenu
    },
    {
      path: '/TransmissionRoom',
      name: 'control-room',
      component: TransmissionRoom
    }
  ]
})
