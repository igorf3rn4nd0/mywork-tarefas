<template>
  <q-page padding>
    <div :style="$q.platform.is.mobile ? 'width: 90vw' : 'width: 50vw'" class="q-ma-sm">
      <q-input outlined v-model="funcionario.nome" label="Nome" />
    </div>
    <div :style="$q.platform.is.mobile ? 'width: 90vw' : 'width: 50vw'" class="q-ma-sm">
      <q-input outlined v-model="funcionario.email" label="E-mail" />
    </div>
    <div class="row">
      <div :style="$q.platform.is.mobile ? 'width: 90vw' : 'width: 28vw'" class="col-auto q-ma-sm">
        <q-input outlined v-model="funcionario.login" label="Login" />
      </div>
      <div :style="$q.platform.is.mobile ? 'width: 90vw' : 'width: 20vw'" class="col-auto q-ma-sm">
        <q-input outlined v-model="funcionario.senha" label="Senha" />
      </div>
    </div>
    <div :style="$q.platform.is.mobile ? 'width: 90vw' : 'width: 29vw'" class="q-ma-sm">
      <q-select option-value="id" option-label="nome" outlined v-model="funcionario.departamento" :options="optionsDepartamentos" label="Departamento" />
    </div>
    <div :style="$q.platform.is.mobile ? 'width: 90vw' : 'width: 20vw'" class="column items-start q-ml-md">
      <q-toggle
        v-model="funcionario.administrador"
        color="primaru"
        label="Administrador"
        left-label
      />
      <q-toggle
        v-model="funcionario.supervisor"
        color="primaru"
        label="Supervisor"
        left-label
      />
    </div>
    <q-footer v-if="$q.platform.is.mobile" class="bg-white q-pa-sm">
      <div class="row justify-center">
        <q-btn style="height: 40px" color="primary" class="full-width" icon="save" label="Salvar"></q-btn>
      </div>
    </q-footer>
    <q-page-sticky v-if="$q.platform.is.desktop" position="bottom-right" :offset="[18, 18]">
      <q-btn @click="salvarFuncionario" round color="primary" icon="save"/>
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
      funcionario: {},
      optionsDepartamentos: []
    }
  },
  beforeMount: function () {
    this.loadDepartamentos()
    if (this.entidade) {
      this.funcionario = this.entidade
    }
  },
  computed: {
    ...mapState('entidade', ['entidade'])
  },
  methods: {
    ...mapActions('entidade', ['setEntidade']),
    salvarFuncionario: function () {
      if (!this.funcionario.id) {
        db.collection('funcionarios').add(this.funcionario)
          .then(() => {
            this.$router.push('/FuncionarioList')
            this.$q.notify({ message: 'Registro salvo', color: 'green', timeout: 1000 })
          })
          .catch(function(error) {
            this.$q.notify({ message: error.message, color: 'red', timeout: 1000 })
          })
      } else {
        let funcionarioRef = db.collection('funcionarios').doc(this.funcionario.id);
        funcionarioRef.update(this.funcionario)
          .then(() => {
            this.$router.push('/FuncionarioList')
            this.$q.notify({ message: 'Registro salvo', color: 'green', timeout: 1000 })
          })
          .catch(function(error) {
            this.$q.notify({ message: error.message, color: 'red', timeout: 1000 })
          })
      }
      this.setEntidade({})
    },
    loadDepartamentos: function () {
      db.collection('departamentos').get().then((querySnapshot) => {
        querySnapshot.forEach((array) => {
          let aux = array.data()
          aux.id = array.id
          this.optionsDepartamentos.push(aux)
        })
      })
    }
  }
}
</script>

<style>
</style>
