<template>
  <div class="column q-gutter-y-xl justify-center">
    {{ material }}
    <div class="materialName text-weight-bolder text-center">
      {{ material.name }}
    </div>
    <div class="text-center">
      Nombre de pièces en stock: {{ material.stock }}
    </div>
    <div class="row q-gutter-x-md justify-center">
      <div class="column justify-center">
        <q-btn
          round
          color="primary"
          icon="remove"
          @click="add(-1)"
        />
      </div>
      <q-input
        ref="quantity"
        style="width: 2em"
        v-model="quantity"
        mask="###"
        @blur="correctQuantity"
        @keypress.enter="correctQuantity" />
      <div class="column justify-center">
        <q-btn
          round
          color="primary"
          icon="add"
          @click="add(1)"
        />
      </div>
    </div>
    <div class="row q-gutter-x-xl justify-center">
      <q-btn
        round
        color="primary"
        icon="arrow_back"
        @click="$emit('back')"
      />
      <q-btn
        @click="handleLoan"
        rounded
        icon="check"
        color="primary"
        :disable="isOutOfBounds">
        Emprunter
      </q-btn>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'LoanForm',
  data () {
    return {
      quantity: '1'
    }
  },
  props: {
    material: {
      type: Object,
      required: true
    }
  },
  computed: {
    isBelow () {
      return this.quantity < 1
    },
    isAbove () {
      return this.quantity > this.material.stock
    },
    isOutOfBounds () {
      return this.isBelow || this.isAbove
    }
  },
  methods: {
    ...mapActions({
      loanMaterial: 'loanMaterial'
    }),
    correctQuantity () {
      this.$refs.quantity.blur()
      if (this.isAbove) {
        this.quantity = this.material.stock
        this.$q.notify({
          message: `Nombre de pièces en stock: ${this.material.stock}`,
          timeout: 2000
        })
      } else if (this.isBelow) {
        this.quantity = 1
        this.$q.notify({
          message: 'Il faut emprunter au moins un objet.',
          timeout: 2000
        })
      }
    },
    add (amount) {
      this.quantity = parseInt(this.quantity) + amount
      this.correctQuantity()
    },
    handleLoan () {
      this.loanMaterial({
        materialUuid: this.material.uuid,
        quantity: this.quantity
      })
        .then(() => {
          // this.$router.push('loans')
        })
    }
  }
}
</script>

<style lang="sass" scoped>
.materialName
  font-size: 2em
</style>
