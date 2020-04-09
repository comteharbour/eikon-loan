
const routes = [
  {
    path: '/',
    component: () => import('layouts/Layout.vue'),
    children: [
      {
        name: 'Home',
        path: '',
        component: () => import('pages/Index.vue')
      },
      {
        name: 'Signup',
        path: 'signup',
        component: () => import('pages/Signup.vue')
      },
      {
        name: 'Login',
        path: 'login',
        component: () => import('pages/Login.vue')
      },
      {
        name: 'Loans',
        path: 'loans',
        component: () => import('pages/Loans.vue')
      },
      {
        name: 'DoLoan',
        path: 'doLoan',
        component: () => import('pages/DoLoan.vue')
      }
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
