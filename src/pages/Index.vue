<template>
  <q-page class="flex flex-center">
    <div
      class="fit column q-gutter-xl content-center">
      <div class="row justify-center">
        <q-btn
          size="xl"
          color="primary"
          rounded
          @click="$router.push('/login')">
          Se connecter
        </q-btn>
      </div>
      <div class="row justify-center">
        <q-btn
          size="xl"
          color="primary"
          rounded
          @click="$router.push('/signup')">
          S'inscrire
        </q-btn>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex'
}
</script>
