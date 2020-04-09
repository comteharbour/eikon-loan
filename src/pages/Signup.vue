<template>
  <q-page class="flex flex-center">
    <div
      class="fit column q-gutter-y-md content-center">
      <div class="row justify-center">
        <q-input
          autofocus
          label="Prénom"
          v-model="firstName"
          filled
          :error="$v.firstName.$error"
          @blur="$v.firstName.$touch">
          <template v-slot:prepend>
            <q-icon name="email" />
          </template>
          <template v-slot:append>
            <q-icon v-if="$v.firstName.$invalid" name="blank" />
            <q-icon v-else name="check" />
          </template>
        </q-input>
      </div>
      <div class="row justify-center">
        <q-input
          label="Nom"
          v-model="lastName"
          filled
          :error="$v.lastName.$error"
          @blur="$v.lastName.$touch">
          <template v-slot:prepend>
            <q-icon name="email" />
          </template>
          <template v-slot:append>
            <q-icon v-if="$v.lastName.$invalid" name="blank" />
            <q-icon v-else name="check" />
          </template>
        </q-input>
      </div>
      <div class="row justify-center">
        <q-input
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
      <div class="row justify-center">
        <q-input
          label="Mot de passe"
          v-model="password"
          filled
          :error="$v.password.$error"
          @blur="$v.password.$touch">
          <template v-slot:prepend>
            <q-icon name="lock" />
          </template>
          <template v-slot:append>
            <q-icon v-if="$v.password.$invalid" name="blank" />
            <q-icon v-else name="check" />
          </template>
        </q-input>
      </div>
      <div class="row justify-center">
        <q-input
          label="Confirmez le mot de passe"
          v-model="confirmPassword"
          filled
          :error="$v.confirmPassword.$error"
          @blur="$v.confirmPassword.$touch">
          <template v-slot:prepend>
            <q-icon name="lock" />
          </template>
          <template v-slot:append>
            <q-icon v-if="$v.confirmPassword.$invalid" name="blank" />
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
          @click="handleSignup"
          rounded
          color="primary">
          S'inscrire
        </q-btn>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapActions } from 'vuex'
import { email, required, minLength } from 'vuelidate/lib/validators'

export default {
  name: 'PageSignup',
  data () {
    return {
      firstName: '2',
      lastName: '2',
      email: '2@2.com',
      password: '22222222',
      confirmPassword: '22222222'
    }
  },
  methods: {
    ...mapActions(['signup']),
    handleSignup () {
      const vm = this
      vm.signup({
        firstName: vm.firstName,
        lastName: vm.lastName,
        email: vm.email,
        password: vm.password
      })
        .then((response) => {
          console.log(response)
          vm.$router.push('/')
        })
        .catch(error => console.log(error))
    }
  },
  validations: {
    firstName: {
      required
    },
    lastName: {
      required
    },
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(6)
    },
    confirmPassword: {
      required,
      matchPassword: function () {
        return this.confirmPassword === this.password
      }
    }
  }
}
</script>
