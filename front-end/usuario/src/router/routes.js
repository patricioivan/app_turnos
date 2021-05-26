
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { name: 'index', path: '', component: () => import('pages/Index.vue') },
      { path: '/turnos', component: () => import('pages/TurnosPage.vue') },
      { path: '/favoritos', component: () => import('pages/FavoritosPage.vue') },
      { path: '/perfil', component: () => import('pages/PerfilPage.vue') },
      { path: '/ubicacion/cargar', component: () => import('pages/UbicacionPage.vue') },
      { name:'negocio.buscar', path: '/negocio/buscar/:query', component: () => import('pages/NegociosEncontradosPage.vue') },
      { name:'negocio.rubro.buscar', path: '/negocio/rubro/:_id/buscar', component: () => import('pages/NegociosEncontradosPorRubroPage.vue') },
      { name:'negocio.show', path: '/negocio/:id', component: () => import('pages/ShowNegocioPage.vue') },
      { name:'empresa.negocios.show', path: '/empresa/negocios/:id', component: () => import('pages/ShowNegociosEmpresa.vue') },
    ]
  },
  {
    path:'',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      { path: '/login', component: () => import('pages/LoginPage.vue') },
      { path: '/registrar', component: () => import('pages/RegisterPage.vue') }
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
