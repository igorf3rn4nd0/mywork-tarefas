<template>
  <q-page class="bg-grey-1" padding>
    <div>
      <q-table
        title="Departamentos"
        :data="departamentos"
        :columns="columns"
        row-key="id"
        selection="multiple"
        :selected.sync="selectedRow"
      >
        <template v-if="selectedRow.length > 0" v-slot:top-right>
          <q-btn @click="editarDepartamento" flat no-caps class="q-mx-sm" dense icon="mdi-pencil" color="grey-8" label="Editar"></q-btn>
          <q-btn @click="excluirDepartamento" flat no-caps class="q-mx-sm" dense icon="mdi-delete" color="red" label="Excluir"></q-btn>
        </template>
      </q-table>
    </div>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn @click="novoDepartamento" round color="primary" icon="mdi-plus"/>
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
      departamentos: [],
      columns: [
        { name: 'nome', align: 'left', label: 'Nome', field: 'nome', sortable: true },
        { name: 'supervisor', align: 'left', label: 'Supervisor', field: 'supervisor', sortable: true },
      ],
      selectedRow: []
    }
  },
  beforeMount: function () {
    this.loadDepartamentos()
  },
  methods: {
    ...mapActions('entidade', ['setEntidade']),
    novoDepartamento: function () {
      this.$router.push('/DepartamentoForm')
    },
    loadDepartamentos: function () {
      db.collection('departamentos').get().then((querySnapshot) => {
        querySnapshot.forEach((array) => {
          let aux = array.data()
          aux.id = array.id
          this.departamentos.push(aux)
        })
      })
    },
    excluirDepartamento: function () {
      this.$q.dialog({
        title: 'Excluir Departamento',
        message: 'Deseja realmente excluir esse departamento?',
        cancel: true,
        persistent: true
      }).onOk(() => {
      }).onCancel(() => {
      })
    },
    editarDepartamento: function () {
      this.setEntidade(this.selectedRow[0])
      this.$router.push('/DepartamentoForm')
    }
  }
}
</script>

<style>
</style>
