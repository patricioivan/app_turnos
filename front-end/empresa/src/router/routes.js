
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { name: 'mi-empresa', path: '/', component: () => import('pages/Index.vue') },
      { name: 'mis-negocios', path: '/mis-negocios', component: () => import('pages/NegociosPage.vue') },
      { name: 'estadisticas', path: '/estadisticas', component: () => import('pages/EstadisticasPage.vue') },
      { name: 'verificar', path: '/verificar-turnos', component: () => import('pages/VerificarPage.vue') },
      { name:'negocio.show', path: '/negocio/:id', component: () => import('pages/ShowNegocioPage.vue') },
    ]
  },
  {
    path:'',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      { path: '/login', component: () => import('pages/LoginPage.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
