<template>
  <q-page>
    <div class="full-width row q-my-md justify-around items-center">
      <div
        v-if="displayStatus === 'pending'"
        class="text-bolder text-h6">
        emprunts en cours
      </div>
      <div
        v-else-if="displayStatus === 'returned'"
        class="text-bolder text-h6">
        historique des emprunts
      </div>
    </div>
    <q-list>
      <q-item v-for="loan in displayedLoans" :key="loan.loanId">
        <div class="full-width row justify-around items-center">
          <div>
            {{ loan.materialId }}
          </div>
          <div>
            {{ loan.quantity }}
          </div>
          <div>
            {{ loan.loanDate }}
          </div>
          <q-btn
            color="primary"
            round
            icon="reply"
            size="sm"
            @click="() => returnMaterial({ loanId: loan.loanId })"
            v-if="loan.status === 'pending'"
          />
          <q-icon
            round
            color="primary"
            name="check_circle"
            size="md"
            v-else-if="loan.status === 'returned'"
          />
        </div>
      </q-item>
    </q-list>
    <q-page-sticky position="bottom-right" :offset="[10, 10]">
      <q-btn
        rounded
        icon="navigate_next"
        color="primary"
        @click="displayStatus = 'pending'"
        v-if="displayStatus !== 'pending'">
        en cours
      </q-btn>
      <q-btn
        rounded
        icon="navigate_next"
        color="primary"
        @click="displayStatus = 'returned'"
        v-if="displayStatus !== 'returned'">
        historique
      </q-btn>
    </q-page-sticky>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'PageLoans',
  data () {
    return {
      displayStatus: 'pending'
    }
  },

  computed: {
    ...mapGetters(['isConnected', 'loans']),
    displayedLoans () {
      const vm = this
      const filteredLoans = vm.loans.filter(loan => loan.status === vm.displayStatus)
      return filteredLoans
    }
  },

  methods: {
    ...mapActions(['returnMaterial'])
  },

  mounted () {
    if (!this.isConnected) this.$router.push('/')
  }
}
</script>
