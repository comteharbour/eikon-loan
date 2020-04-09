<template>
  <div
    class="column justify-center items-center">
    <div class="errorMessage q-pa-md q-ma-xl">
      {{ errorMessage }}
    </div>
    <q-btn
      icon="refresh"
      color="primary"
      round
      size="xl"
      @click="$emit('refresh')" />
  </div>
</template>

<script>
export default {
  name: 'ErrorDisplay',
  props: {
    errorMessage: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="sass" scoped>
.errorMessage
  background-color: $warning
  color: $negative
  font-size: 2em
  font-weight: bold
</style>
