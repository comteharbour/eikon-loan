<template>
  <q-page class="flex flex-center">
    <qr-code-reader v-if="state==='SCANNING'" @materialVerified="displayForm" />
    <loan-form v-else
      :material="material"
      @back="state = 'SCANNING'" />
  </q-page>
</template>

<script>
import QrCodeReader from 'components/QrCodeReader'
import LoanForm from 'components/LoanForm'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'PageDoLoan',

  data () {
    return {
      state: 'SCANNING',
      material: {}
    }
  },

  computed: {
    ...mapGetters(['isConnected'])
  },

  methods: {
    ...mapActions(['loanMaterial']),
    displayForm (material) {
      // gérer les données reçues
      this.material = material
      this.state = 'FILLING_FORM'
    }
  },

  components: {
    QrCodeReader,
    LoanForm
  }
}
</script>
