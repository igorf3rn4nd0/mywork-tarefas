<template>
  <q-page padding>
    <div class="row justify-center">
      <div v-for="tarefa in tarefas" :key="tarefa.id" :style="$q.platform.is.mobile ? 'width: 90%; border-radius: 10px' : 'width: 40%; border-radius: 10px'" class="shadow-3 q-mb-sm q-mx-md">
        <div class="row q-pa-xs reverse">
          <q-btn round flat dense icon="mdi-dots-vertical">
            <q-menu content-style="width: 120px">
              <div class="column items-start">
                <q-btn v-close-popup @click="rejeitarTarefa" flat no-caps class="q-mb-sm" dense icon="mdi-undo" color="red" label="Rejeitar"></q-btn>
                <q-btn v-close-popup @click="atribuirTarefa" flat no-caps class="q-mb-sm" dense icon="mdi-account-arrow-right" color="blue" label="Atribuir"></q-btn>
                <q-btn v-close-popup @click="encaminharTarefa" flat no-caps class="q-mb-sm" dense icon="mdi-send" color="blue" label="Encaminhar"></q-btn>
                <q-btn v-close-popup @click="resolverTarefa" flat no-caps class="q-mb-sm" dense icon="mdi-check" color="green" label="Resolver"></q-btn>
              </div>
            </q-menu>
          </q-btn>
        </div>
        <div class="column items-center q-mb-sm">
          <span style="font-size: 14pt">{{tarefa.titulo}}</span>
        </div>
        <q-separator inset></q-separator>
        <div class="q-mt-sm q-pa-md ">
          <div class="row q-mb-sm justify-between">
            <span style="font-size: 14pt; color: rgba(0,0,0,0.29)">Entrega:</span>
            <span style="font-size: 12pt">{{tarefa.dataEntrega}}</span>
          </div>
          <div class="row q-mb-sm justify-between">
            <span style="font-size: 14pt; color: rgba(0,0,0,0.29)">Cliente:</span>
            <span style="font-size: 12pt">{{tarefa.cliente.nome}}</span>
          </div>
          <div class="row q-mb-sm justify-between">
            <span style="font-size: 14pt; color: rgba(0,0,0,0.29)">Descrição:</span>
            <span style="font-size: 12pt">{{tarefa.descricao}}</span>
          </div>
        </div>
      </div>
    </div>
    <atribuicao-tarefa ref="atribuicao"></atribuicao-tarefa>
    <encaminhar-tarefa ref="encaminhar"></encaminhar-tarefa>
  </q-page>
</template>

<script>
  import { db } from '../boot/firebase'
  import AtribuicaoTarefa from '../components/AtribuicaoTarefa'
  import EncaminharTarefa from '../components/EncaminharTarefa'
export default {
  // name: 'PageName',
  components: { AtribuicaoTarefa, EncaminharTarefa },
  data () {
    return {
      tarefas: []
    }
  },
  beforeMount: function () {
    this.loadTarefas()
  },
  methods: {
    loadTarefas: function () {
      db.collection('tarefas').get().then((querySnapshot) => {
        querySnapshot.forEach((array) => {
          let aux = array.data()
          aux.id = array.id
          this.tarefas.push(aux)
        })
      })
    },
    atribuirTarefa: function () {
      this.$refs.atribuicao.abrir()
    },
    encaminharTarefa: function () {
      this.$refs.encaminhar.abrir()
    },
    assumirTarefa: function () {
      this.$q.dialog({
        title: 'Assumir Tarefa',
        message: 'Deseja assumir essa tarefa?',
        cancel: true,
        persistent: true
      }).onOk(() => {
      }).onCancel(() => {
      })
    },
    resolverTarefa: function () {
      this.$q.dialog({
        title: 'Resolver Tarefa',
        message: 'Deseja marcar essa tarefa como resolvida?',
        cancel: true,
        persistent: true
      }).onOk(() => {
      }).onCancel(() => {
      })
    },
    rejeitarTarefa: function () {
      this.$q.dialog({
        title: 'Rejeitar Tarefa',
        message: 'Informe o motivo:',
        prompt: {
          model: '',
          type: 'text' // optional
        },
        cancel: true,
        persistent: true
      }).onOk(motivo => {
        console.log(motivo)
      }).onCancel(() => {
      })
    }
  }
}
</script>

<style>
</style>
