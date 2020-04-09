<template>
  <q-layout view="hHh LpR lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
          :disable="!isConnected"
        />

        <q-toolbar-title>
          Je m'appelle RETOUR !
        </q-toolbar-title>
        <q-toggle
          :value="$store.getters.isConnected"
          @input="$store.commit('toggleConnect')" color="warning"
          label="forcer la connection"
          left-label />
      </q-toolbar>
    </q-header>

    <q-drawer
      overlay
      elevated
      v-model="leftDrawerOpen"
      content-class="bg-secondary"
    >
      <q-list>
        <navigation-link
          title="Se déconnecter"
          to="/"
          :action="handleLogout"
        />
        <navigation-link
          title="Emprunter"
          to="/doLoan"
        />
        <navigation-link
          title="Mes emprunts"
          to="/loans"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import navigationLink from 'components/NavigationLink'

export default {
  name: 'MainLayout',

  data () {
    return {
      leftDrawerOpen: false
    }
  },

  computed: {
    ...mapGetters(['isConnected'])
  },

  methods: {
    ...mapActions(['logout', 'checkIfConnected']),
    handleLogout () {
      const vm = this
      vm.logout()
        .then(() => {
          vm.leftDrawerOpen = false
        })
    },
    goToDoLoan () {
      this.$router.push('/doLoan')
    },
    goToLoans () {
      this.$router.push('/loans')
    }
  },

  components: { navigationLink }

  // mounted () {
  //   const vm = this
  //   vm.checkIfConnected()
  //     .then(response => {
  //       if (response) vm.$router.push('/doLoan')
  //       else vm.$router.push('/')
  //     })
  // }
}
</script>
