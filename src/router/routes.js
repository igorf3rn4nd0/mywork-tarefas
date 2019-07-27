
const routes = [
  { path: '/', component: () => import('pages/Login.vue') },
  { path: '/CriarConta', component: () => import('pages/CriarConta.vue') },
  {
    path: '/', component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/TarefasList', component: () => import('pages/TarefasList.vue') },
      { path: '/TarefaForm', component: () => import('pages/TarefaForm.vue') },
      { path: '/DepartamentoList', component: () => import('pages/DepartamentoList.vue') },
      { path: '/DepartamentoForm', component: () => import('pages/DepartamentoForm.vue') },
      { path: '/FuncionarioList', component: () => import('pages/FuncionarioList.vue') },
      { path: '/FuncionarioForm', component: () => import('pages/FuncionarioForm.vue') },
      { path: '/Dashboard', component: () => import('pages/Dashboard.vue') },
      { path: '/ClienteList', component: () => import('pages/ClienteList.vue') },
      { path: '/ClienteForm', component: () => import('pages/ClienteForm.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
