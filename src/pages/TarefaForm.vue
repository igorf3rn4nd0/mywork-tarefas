<template>
  <q-page padding>
    <div :style="$q.platform.is.mobile ? 'width: 90vw' : 'width: 50vw'" class="q-ma-sm">
      <q-input outlined v-model="tarefa.titulo" label="Título" />
    </div>
    <div :style="$q.platform.is.mobile ? 'width: 90vw' : 'width: 50vw'" class="q-ma-sm">
      <q-input outlined v-model="tarefa.descricao" label="Descrição" />
    </div>
    <div class="row">
      <div :style="$q.platform.is.mobile ? 'width: 90vw' : 'width: 29vw'" class="col-auto q-ma-sm">
        <q-select @input="setDepartamento(tarefa.responsavel.departamento)" option-value="id" option-label="nome" outlined v-model="tarefa.responsavel" :options="optionsFuncionarios" label="Responsável" />
      </div>
      <div :style="$q.platform.is.mobile ? 'width: 90vw' : 'width: 20vw'" class="col-auto q-ma-sm">
        <q-select @input="loadFuncionarios(tarefa.departamento.id)" option-value="id" option-label="nome" outlined v-model="tarefa.departamento" :options="optionsDepartamentos" label="Departamento" />
      </div>
    </div>
    <div class="row">
      <div :style="$q.platform.is.mobile ? 'width: 90vw' : 'width: 29vw'" class="col-auto q-ma-sm">
        <q-select option-value="id" option-label="nome" outlined v-model="tarefa.cliente" :options="optionsClientes" label="Cliente" />
      </div>
      <div :style="$q.platform.is.mobile ? 'width: 90vw' : 'width: 20vw'" class="col-auto q-ma-sm">
        <q-input label="Data da entrega" outlined v-model="tarefa.dataEntrega" mask="date" :rules="['date']">
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                <q-date v-model="tarefa.dataEntrega" @input="() => $refs.qDateProxy.hide()" />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>
    </div>
    <q-footer v-if="$q.platform.is.mobile" class="bg-white q-pa-sm">
      <div class="row justify-center">
        <q-btn style="height: 40px" color="primary" class="full-width" icon="save" label="Salvar"></q-btn>
      </div>
    </q-footer>
    <q-page-sticky v-if="$q.platform.is.desktop" position="bottom-right" :offset="[18, 18]">
      <q-btn @click="salvarTarefa" round color="primary" icon="save"/>
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
      tarefa: {},
      optionsClientes: [],
      optionsDepartamentos: [],
      optionsFuncionarios: []
    }
  },
  beforeMount: function () {
    this.loadFuncionarios()
    this.loadClientes()
    this.loadDepartamentos()
    if (this.entidade) {
      this.tarefa = this.entidade
    }
  },
  computed: {
    ...mapState('entidade', ['entidade'])
  },
  methods: {
    ...mapActions('entidade', ['setEntidade']),
    salvarTarefa: function () {
      if (!this.tarefa.id) {
        db.collection('tarefas').add(this.tarefa)
          .then(() => {
            this.$router.push('/TarefasList')
            this.$q.notify({ message: 'Registro salvo', color: 'green', timeout: 1000 })
          })
          .catch(function(error) {
            this.$q.notify({ message: error.message, color: 'red', timeout: 1000 })
          })
      } else {
        let tarefaRef = db.collection('tarefas').doc(this.tarefa.id);
        tarefaRef.update(this.tarefa)
          .then(() => {
            this.$router.push('/TarefasList')
            this.$q.notify({ message: 'Registro salvo', color: 'green', timeout: 1000 })
          })
          .catch(function(error) {
            this.$q.notify({ message: error.message, color: 'red', timeout: 1000 })
          })
      }
      this.setEntidade({})
    },
    setDepartamento: function (departamento) {
      this.tarefa.departamento = departamento
    },
    loadDepartamentos: function () {
      this.optionsDepartamentos = []
      db.collection('departamentos').get().then((querySnapshot) => {
        querySnapshot.forEach((array) => {
          let aux = array.data()
          aux.id = array.id
          this.optionsDepartamentos.push(aux)
        })
      })
    },
    loadFuncionarios: function (idDepartamento) {
      this.optionsFuncionarios = []
      db.collection('funcionarios').get().then((querySnapshot) => {
        querySnapshot.forEach((array) => {
          let aux = array.data()
          aux.id = array.id
          if (idDepartamento) {
            if (aux.departamento.id === idDepartamento) {
              this.optionsFuncionarios.push(aux)
            } else {
              this.tarefa.responsavel = {}
            }
          } else {
            this.optionsFuncionarios.push(aux)
          }
        })
      })
    },
    loadClientes: function () {
      db.collection('clientes').get().then((querySnapshot) => {
        querySnapshot.forEach((clientesServer) => {
          let aux = clientesServer.data()
          aux.id = clientesServer.id
          this.optionsClientes.push(aux)
        })
      })
    }
  }
}
</script>

<style>
</style>
