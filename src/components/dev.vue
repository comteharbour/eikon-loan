<template>
  <div>
    {{ loans }}
  </div>
</template>

<script>
export default {
  data () {
    return {
      loans: null
    }
  },
  mounted () {
    const vm = this
    this.$axios
      .get('https://loan-eikon-it.frogfish.dev/api/users')
      .then(response => {
        vm.loans = response.data
      })
  }
}
</script>
