<template>
  <q-page class="flex flex-center">
    <div
      class="fit column q-gutter-y-md content-center">
      <div class="row justify-center">
        <q-input
          autofocus
          label="e-mail"
          v-model="email"
          filled
          :error="$v.email.$error"
          @blur="$v.email.$touch">
          <template v-slot:prepend>
            <q-icon name="email" />
          </template>
          <template v-slot:append>
            <q-icon v-if="$v.email.$invalid" name="blank" />
            <q-icon v-else name="check" />
          </template>
        </q-input>
      </div>
      <div class="row justify-between">
        <q-btn
          round
          color="primary"
          icon="arrow_back"
          @click="$router.push('/')"
        />
        <q-btn
          :disable="$v.email.$invalid"
          @click="handleLogin"
          rounded
          color="primary">
          Se connecter
        </q-btn>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapActions } from 'vuex'
import { email, required } from 'vuelidate/lib/validators'

export default {
  name: 'PageLogin',
  data () {
    return {
      email: '2@2.com',
      password: '222222'
    }
  },
  methods: {
    ...mapActions(['login']),
    handleLogin () {
      const vm = this
      vm.login({
        email: vm.email,
        password: vm.password
      })
        .then(() => {
          vm.$router.push('/')
        })
    }
  },
  validations: {
    email: {
      required,
      email
    }
  }
}
</script>
