<template>
  <q-page class="bg-grey-1" padding>
    <div>
      <q-table
        title="Funcionários"
        :data="funcionarios"
        :columns="columns"
        row-key="id"
        selection="multiple"
        :selected.sync="selectedRow"
      >
        <template v-if="selectedRow.length > 0" v-slot:top-right>
          <q-btn round flat dense icon="mdi-dots-vertical">
            <q-menu content-style="width: 120px">
              <div class="column items-start">
                <q-btn @click="editarFuncionario" v-close-popup flat no-caps class="q-mb-sm" dense icon="mdi-pencil" color="grey-8" label="Editar"></q-btn>
                <q-btn @click="desabilitarFuncionario" v-close-popup flat no-caps class="q-mb-sm" dense icon="mdi-close" color="red" label="Desabilitar"></q-btn>
                <q-btn @click="habilitarFuncionario" v-close-popup flat no-caps class="q-mb-sm" dense icon="mdi-rotate-left" color="green" label="Habilitar"></q-btn>
              </div>
            </q-menu>
          </q-btn>
        </template>
      </q-table>
    </div>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn @click="novoFuncionario" round color="primary" icon="mdi-plus"/>
    </q-page-sticky>
  </q-page>
</template>

<script>
import { db } from '../boot/firebase'
import { mapActions } from 'vuex'
export default {
  // name: 'PageName',
  data () {
    return {
      funcionarios: [],
      columns: [
        { name: 'nome', align: 'left', label: 'Nome', field: 'nome', sortable: true },
        { name: 'departamento', align: 'left', label: 'Departamento', sortable: true, field: row => row.departamento ? row.departamento.nome : '' },
        { name: 'email', align: 'left', label: 'E-mail', field: 'email', sortable: true },
      ],
      selectedRow: []
    }
  },
  beforeMount: function () {
    this.loadFuncionarios()
  },
  methods: {
    ...mapActions('entidade', ['setEntidade']),
    loadFuncionarios: function () {
      db.collection('funcionarios').get().then((querySnapshot) => {
        querySnapshot.forEach((array) => {
          let aux = array.data()
          aux.id = array.id
          this.funcionarios.push(aux)
        })
      })
    },
    novoFuncionario: function () {
      this.$router.push('/FuncionarioForm')
    },
    habilitarFuncionario: function () {
      this.$q.dialog({
        title: 'Habilitar Funcionário',
        message: 'Deseja Habilitar esse funcionário?',
        cancel: true,
        persistent: true
      }).onOk(() => {
      }).onCancel(() => {
      })
    },
    desabilitarFuncionario: function () {
      this.$q.dialog({
        title: 'Desabilitar Funcionário',
        message: 'Deseja desabilitar esse funcionário?',
        cancel: true,
        persistent: true
      }).onOk(() => {
      }).onCancel(() => {
      })
    },
    editarFuncionario: function () {
      this.setEntidade(this.selectedRow[0])
      this.$router.push('/FuncionarioForm')
    }
  }
}
</script>

<style>
</style>
