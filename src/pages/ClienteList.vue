<template>
  <q-page class="bg-grey-1" padding>
    <div>
      <q-table
        title="Clientes"
        :data="clientes"
        :columns="columns"
        row-key="id"
        selection="multiple"
        :selected.sync="selectedRow"
      >
        <template v-if="selectedRow.length > 0" v-slot:top-right>
          <q-btn @click="editarCliente" flat no-caps class="q-mx-sm" dense icon="mdi-pencil" color="grey-8" label="Editar"></q-btn>
          <q-btn @click="excluirCliente" flat no-caps class="q-mx-sm" dense icon="mdi-delete" color="red" label="Excluir"></q-btn>
        </template>
      </q-table>
    </div>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn @click="novoCliente" round color="primary" icon="mdi-plus"/>
    </q-page-sticky>
  </q-page>
</template>

<script>
  import { mapActions } from 'vuex'
  import { db } from '../boot/firebase'
export default {
  // name: 'PageName',
  data () {
    return {
      clientes: [],
      columns: [
        { name: 'nome', align: 'left', label: 'Nome', field: 'nome', sortable: true },
        { name: 'tel', align: 'left', label: 'Telefone', field: 'tel', sortable: true },
      ],
      selectedRow: []
    }
  },
  beforeMount: function () {
    this.loadClientes()
  },
  methods: {
    ...mapActions('entidade',['setEntidade']),
    novoCliente: function () {
      this.$router.push('/ClienteForm')
    },
    loadClientes: function () {
      db.collection('clientes').get().then((querySnapshot) => {
        querySnapshot.forEach((clientesServer) => {
          let aux = clientesServer.data()
          aux.id = clientesServer.id
          this.clientes.push(aux)
        })
      })
    },
    excluirCliente: function () {
      this.$q.dialog({
        title: 'Excluir Cliente',
        message: 'Deseja realmente excluir esse entidade?',
        cancel: true,
        persistent: true
      }).onOk(() => {
      }).onCancel(() => {
      })
    },
    editarCliente: function () {
      this.setEntidade(this.selectedRow[0])
      this.$router.push('/ClienteForm')
    }
  }
}
</script>

<style>
</style>
