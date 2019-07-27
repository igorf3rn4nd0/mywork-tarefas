<template>
  <q-page class="bg-grey-1" padding>
    <div>
      <q-table
        title="Tarefas"
        :data="tarefas"
        :columns="columns"
        row-key="id"
        selection="multiple"
        :selected.sync="selectedRow"
      >
        <template v-if="selectedRow.length > 0" v-slot:top-right>
          <q-btn round flat dense icon="mdi-dots-vertical">
            <q-menu content-style="width: 120px">
              <div class="column items-start">
                <q-btn v-close-popup @click="editarTarefa" flat no-caps class="q-mb-sm" dense icon="mdi-pencil" color="grey-8" label="Editar"></q-btn>
                <q-btn v-close-popup @click="cancelarTarefa" flat no-caps class="q-mb-sm" dense icon="mdi-close" color="red" label="Cancelar"></q-btn>
                <q-btn v-close-popup @click="atribuirTarefa" flat no-caps class="q-mb-sm" dense icon="mdi-account-arrow-right" color="blue" label="Atribuir"></q-btn>
                <q-btn v-close-popup @click="encaminharTarefa" flat no-caps class="q-mb-sm" dense icon="mdi-send" color="blue" label="Encaminhar"></q-btn>
              </div>
            </q-menu>
          </q-btn>
        </template>
      </q-table>
    </div>
    <atribuicao-tarefa ref="atribuicao"></atribuicao-tarefa>
    <encaminhar-tarefa ref="encaminhar"></encaminhar-tarefa>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn @click="novaTarefa" round color="primary" icon="mdi-plus"/>
    </q-page-sticky>
  </q-page>
</template>

<script>
  import AtribuicaoTarefa from '../components/AtribuicaoTarefa'
  import EncaminharTarefa from '../components/EncaminharTarefa'
  import { db } from '../boot/firebase'
  import { mapActions } from 'vuex'
export default {
  // name: 'PageName',
  components: { AtribuicaoTarefa, EncaminharTarefa },
  data () {
    return {
      tarefas: [],
      columns: [
        { name: 'titulo', align: 'left', label: 'Título', field: 'titulo', sortable: true },
        { name: 'cliente', align: 'left', label: 'Cliente', sortable: true, field: row => row.cliente ? row.cliente.nome : ''},
        { name: 'responsavel', align: 'left', label: 'Responsável', sortable: true, field: row => row.responsavel ? row.responsavel.nome : '' },
        { name: 'departamento', align: 'left', label: 'Departamento', sortable: true, field: row => row.departamento ? row.departamento.nome : '' },
        { name: 'dataEntrega', align: 'left', label: 'Entrega', field: 'dataEntrega', sortable: true }
        // { name: 'descricao', align: 'left', label: 'Descrição', field: 'descricao', sortable: true },
      ],
      selectedRow: []
    }
  },
  beforeMount: function () {
    this.loadTarefas()
    console.log(this.tarefas)
  },
  methods: {
    ...mapActions('entidade', ['setEntidade']),
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
    cancelarTarefa: function () {
      this.$q.dialog({
        title: 'Cancelar Tarefa',
        message: 'Deseja cancelar essa tarefa?',
        cancel: true,
        persistent: true
      }).onOk(() => {
      }).onCancel(() => {
      })
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
    },
    editarTarefa: function () {
      this.setEntidade(this.selectedRow[0])
      this.$router.push('/TarefaForm')
    },
    novaTarefa: function () {
      this.$router.push('/TarefaForm')
    }
  }
}
</script>

<style>
</style>
