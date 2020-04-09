function beforeEach (router) {
  router.beforeEach((to, from, next) => {
    const isConnected = router.app.$store.getters.isConnected
    if (isConnected) {
      if (to.name === 'Home' || to.name === 'Signup' || to.name === 'Login') {
        next({ name: 'DoLoan' })
      } else {
        next()
      }
    } else {
      if (to.name !== 'Home' && to.name !== 'Signup' && to.name !== 'Login') {
        next({ name: 'Home' })
      } else {
        next()
      }
    }
  })
}

export default router => {
  beforeEach(router)
}
