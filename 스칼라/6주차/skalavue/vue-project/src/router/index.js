import { createRouter, createWebHistory } from 'vue-router'
import WeatherHomeView from '../views/WeatherHomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: WeatherHomeView, // 메인 화면은 바로 로딩
    },
    {
      path: '/about',
      name: 'about',
      // 요구사항 1: 지연 로딩 (Lazy Loading) 적용
      component: () => import('../views/WeatherAboutView.vue'),
    },
    {
      path: '/weather/:id', // 동적 라우팅 (:id)
      name: 'detail',
      component: () => import('../views/WeatherDetailView.vue'),
    },
    {
      path: '/gwangju-special', // ⭐ 요구사항 6: 나만의 추가 라우트 (광주 특보)
      name: 'gwangju',
      component: () => import('../views/WeatherGwangjuView.vue'),
    },
    {
      path: '/:pathMatch(.*)*', // 요구사항 1: Catch-all (없는 주소 처리)
      name: 'not-found',
      component: () => import('../views/NotFoundView.vue'),
    },
  ],
})

export default router
