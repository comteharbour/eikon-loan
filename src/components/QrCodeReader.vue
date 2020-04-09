<template>
  <div>
    <q-toggle
      v-model="forceMaterial"
      color="warning"
      label="envoyer un identifiant de matériel prédéfini" />
    <qrcode-stream
      v-if="state==='WATCHING' || state==='INITIALIZING'"
      @decode="decode"
      @init="onInit"
      />
    <error-display
      v-else-if="state==='ERROR'"
      @refresh="$router.go($router.currentRoute)"
      :errorMessage="error" />
    <div v-else>
      <q-spinner />
      <div>
        {{ spinnerMessage }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { QrcodeStream } from 'vue-qrcode-reader'
import ErrorDisplay from 'components/ErrorDisplay'

export default {
  name: 'QrCodeReader',
  data () {
    return {
      state: 'INITIALIZING',
      error: null,
      forceMaterial: false
    }
  },
  computed: {
    spinnerMessage () {
      switch (this.state) {
        case 'INITIALIZING': return 'initialisation de la caméra...'
        case 'VERIFY_MATERIAL': return 'vérification de la disponibilité...'
        default: return ''
      }
    }
  },
  methods: {
    ...mapActions({
      verifyMaterial: 'verifyMaterial'
    }),
    decode (materialUuid) {
      const vm = this
      vm.state = 'VERIFY_MATERIAL'
      const verify = () => {
        if (vm.forceMaterial) return vm.verifyMaterial({ materialUuid: 'c364587d-725b-4603-95d0-fee32f0323ff' })
        else return vm.verifyMaterial(materialUuid)
      }
      verify()
        .then(response => {
          vm.$emit('materialVerified', response.material)
        })
        .catch(error => {
          vm.state = 'ERROR'
          switch (error) {
            case 'materialDoesNotExist': vm.error = 'Erreur: le QR-Code saisi ne figure pas dans la base de données.'; break
            default: vm.error = `Erreur inconnue: ${error}`
          }
        })
    },
    async onInit (promise) {
      try {
        await promise
        this.state = 'WATCHING'
      } catch (error) {
        this.state = 'ERROR'
        switch (error.name) {
          case 'NotAllowedError': this.error = "Erreur: vous devez autoriser l'utilisation de la caméra"; break
          case 'NotFoundError': this.error = 'Erreur: pas de caméra trouvée sur ce téléphone'; break
          case 'NotSupportedError': this.error = "Erreur: la connexion n'est pas sécurisée"; break
          case 'NotReadableError': this.error = 'Erreur: la caméra est-elle déjà utilisée?'; break
          case 'OverconstrainedError': this.error = 'Erreur: les caméras installées ne sont pas utilisables'; break
          case 'StreamApiNotSupportedError': this.error = "Erreur: l'utilisation de la caméra n'est pas autorisée dans ce navigateur"; break
          default: this.error = `Erreur inconnue: ${error.name}`
        }
      } finally {
        //
      }
    }
  },
  components: { QrcodeStream, ErrorDisplay }
}
</script>
