
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/', component: () => import('pages/Home.vue') },
      { path: '/rubro/crear', component: () => import('pages/AgregarRubroPage.vue') },
      { path: '/empresa/crear', component: () => import('pages/AgregarEmpresaPage.vue') },
      { path: '/empresa/buscar', component: () => import('pages/BuscarEmpresaPage.vue') },
      { path: '/registrar', component: () => import('pages/RegistrarPage.vue') },
      { path: '/usuario/buscar', component: () => import('pages/BuscarUsuarioPage.vue') },
      { name:'usuario.show', path: '/user/:id', component: () => import('pages/ShowUserPage.vue') },
      { name:'empresa.show', path: '/empresa/:id', component: () => import('pages/ShowEmpresaPage.vue') },
      { name:'negocio.show', path: '/negocio/:id', component: () => import('pages/ShowNegocioPage.vue') },
      { name:'empresa.agregar_negocio', path: '/empresa/:id/negocio/add', component: () => import('pages/AgregarNegocioPage.vue') },
      { name:'negocio.agregar_horario', path: '/negocio/:id/jornada/add', component: () => import('pages/AgregarHorarioPage.vue') },
      { name:'negocio.agregar_fecha_no_laboral', path: '/negocio/:id/dianolaboral/add', component: () => import('pages/AgregarDiaNoLaboralPage.vue') },
      { name:'negocio.edit', path: '/negocio/:id/edit', component: () => import('pages/EditNegocioPage.vue') },
    
    ],
  },
  {
    path:'',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      { path: '/login', component: () => import('pages/LoginPage.vue') }
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
