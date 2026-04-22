import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
    meta: { title: '總覽', tab: 'home' },
  },
  {
    path: '/itinerary',
    name: 'itinerary',
    component: () => import('@/views/ItineraryView.vue'),
    meta: { title: '行程', tab: 'itinerary' },
  },
  {
    path: '/itinerary/day/:dayId',
    name: 'day',
    component: () => import('@/views/DayView.vue'),
    meta: { title: '單日行程', tab: 'itinerary' },
    props: true,
  },
  {
    path: '/poi/:poiId',
    name: 'poi',
    component: () => import('@/views/PoiDetailView.vue'),
    meta: { title: '景點詳情', tab: 'itinerary' },
    props: true,
  },
  {
    path: '/travel',
    name: 'travel',
    component: () => import('@/views/TravelView.vue'),
    meta: { title: '航班與住宿', tab: 'travel' },
  },
  {
    path: '/travel/flights',
    name: 'flights',
    component: () => import('@/views/FlightsView.vue'),
    meta: { title: '航班資訊', tab: 'travel' },
  },
  {
    path: '/travel/hotels',
    name: 'hotels',
    component: () => import('@/views/HotelsView.vue'),
    meta: { title: '住宿資訊', tab: 'travel' },
  },
  {
    path: '/info',
    name: 'info',
    component: () => import('@/views/InfoView.vue'),
    meta: { title: '實用資訊', tab: 'info' },
  },
  {
    path: '/info/visa',
    component: () => import('@/views/info/VisaView.vue'),
    meta: { title: '簽證', tab: 'info' },
  },
  {
    path: '/info/currency',
    component: () => import('@/views/info/CurrencyView.vue'),
    meta: { title: '匯率與換匯', tab: 'info' },
  },
  {
    path: '/info/weather',
    component: () => import('@/views/info/WeatherView.vue'),
    meta: { title: '氣候與穿著', tab: 'info' },
  },
  {
    path: '/info/etiquette',
    component: () => import('@/views/info/EtiquetteView.vue'),
    meta: { title: '文化禮儀', tab: 'info' },
  },
  {
    path: '/info/sim',
    component: () => import('@/views/info/SimView.vue'),
    meta: { title: '通訊 SIM', tab: 'info' },
  },
  {
    path: '/info/safety',
    component: () => import('@/views/info/SafetyView.vue'),
    meta: { title: '安全資訊', tab: 'info' },
  },
  {
    path: '/info/checklist',
    component: () => import('@/views/info/ChecklistView.vue'),
    meta: { title: '行前檢查清單', tab: 'info' },
  },
  {
    path: '/budget',
    name: 'budget',
    component: () => import('@/views/BudgetView.vue'),
    meta: { title: '預算', tab: 'budget' },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) return savedPosition;
    return { top: 0 };
  },
});

router.afterEach((to) => {
  const title = to.meta.title as string | undefined;
  document.title = title ? `${title} · 東南亞七日` : '東南亞七日';
});

export default router;
