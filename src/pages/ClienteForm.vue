<template>
  <q-page padding>
    <div :style="$q.platform.is.mobile ? 'width: 90vw' : 'width: 50vw'" class="q-ma-sm">
      <q-input outlined v-model="cliente.nome" label="Nome" />
    </div>
    <div :style="$q.platform.is.mobile ? 'width: 90vw' : 'width: 40vw'" class="q-ma-sm">
      <q-input outlined v-model="cliente.tel" label="Telefone" />
    </div>
    <q-footer v-if="$q.platform.is.mobile" class="bg-white q-pa-sm">
      <div class="row justify-center">
        <q-btn style="height: 40px" color="primary" class="full-width" icon="save" label="Salvar"></q-btn>
      </div>
    </q-footer>
    <q-page-sticky v-if="$q.platform.is.desktop" position="bottom-right" :offset="[18, 18]">
      <q-btn @click="salvarCliente()" round color="primary" icon="save"/>
    </q-page-sticky>
  </q-page>
</template>

<script>
import { db } from '../boot/firebase'
import { mapState, mapActions } from 'vuex'
export default {
  // name: 'PageName',
  data() {
    return {
      cliente: {}
    }
  },
  beforeMount: function () {
    if (this.entidade) {
      this.cliente = this.entidade
    }
  },
  computed: {
    ...mapState('entidade', ['entidade'])
  },
  methods: {
    ...mapActions('entidade', ['setEntidade']),
    salvarCliente: function () {
      if (!this.cliente.id) {
        db.collection('clientes').add(this.cliente)
          .then(() => {
            this.$router.push('/ClienteList')
            this.$q.notify({message: 'Registro salvo', color: 'green', timeout: 1000})
          })
          .catch(function (error) {
            this.$q.notify({message: error.message, color: 'red', timeout: 1000})
          })
      } else {
        let clienteRef = db.collection('clientes').doc(this.cliente.id);
        clienteRef.update(this.cliente)
          .then(() => {
            this.$router.push('/ClienteList')
            this.$q.notify({message: 'Registro salvo', color: 'green', timeout: 1000})
          })
          .catch(function (error) {
            this.$q.notify({message: error.message, color: 'red', timeout: 1000})
          })
      }
      this.setEntidade({})
    }
  }
}
</script>

<style>
</style>
