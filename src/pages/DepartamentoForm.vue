<template>
  <q-page padding>
    <div :style="$q.platform.is.mobile ? 'width: 90vw' : 'width: 50vw'" class="q-ma-sm">
      <q-input outlined v-model="departamento.nome" label="Nome" />
    </div>
    <div v-if="departamento.id" :style="$q.platform.is.mobile ? 'width: 90vw' : 'width: 40vw'" class="q-ma-sm">
      <q-select option-value="id" option-label="nome" outlined v-model="departamento.supervisor" :options="optionsFuncionarios" label="Supervisor" />
    </div>
    <q-footer v-if="$q.platform.is.mobile" class="bg-white q-pa-sm">
      <div class="row justify-center">
        <q-btn style="height: 40px" color="primary" class="full-width" icon="save" label="Salvar"></q-btn>
      </div>
    </q-footer>
    <q-page-sticky v-if="$q.platform.is.desktop" position="bottom-right" :offset="[18, 18]">
      <q-btn @click="salvarDepartamento" round color="primary" icon="save"/>
    </q-page-sticky>
  </q-page>
</template>

<script>
import { db } from '../boot/firebase'
import { mapState, mapActions } from 'vuex'
export default {
  // name: 'PageName',
  data () {
    return {
      departamento: {},
      optionsFuncionarios: []
    }
  },
  beforeMount: function () {
    this.loadFuncionarios()
    if (this.entidade) {
      this.departamento = this.entidade
    }
  },
  computed: {
    ...mapState('entidade', ['entidade'])
  },
  methods: {
    ...mapActions('entidade', ['setEntidade']),
    salvarDepartamento: function () {
      if (!this.departamento.id) {
        db.collection('departamentos').add(this.departamento)
          .then((cliente) => {
            this.$router.push('/DepartamentoList')
            this.$q.notify({ message: 'Registro salvo', color: 'green', timeout: 1000 })
          })
          .catch(function(error) {
            this.$q.notify({ message: error.message, color: 'red', timeout: 1000 })
          })
      } else {
        let departamentoRef = db.collection('departamentos').doc(this.departamento.id);
        departamentoRef.update(this.departamento)
          .then(() => {
            this.$router.push('/DepartamentoList')
            this.$q.notify({ message: 'Registro salvo', color: 'green', timeout: 1000 })
          })
          .catch(function(error) {
            this.$q.notify({ message: error.message, color: 'red', timeout: 1000 })
          })
      }
      this.setEntidade({})
    },
    loadFuncionarios: function () {
      this.optionsFuncionarios = []
      db.collection('funcionarios').get().then((querySnapshot) => {
        querySnapshot.forEach((array) => {
          let aux = array.data()
          aux.id = array.id
          if (this.departamento.id) {
            if (aux.departamento.id === this.departamento.id) {
              this.optionsFuncionarios.push(aux)
            }
          }
        })
      })
    }
  }
}
</script>

<style>
</style>
