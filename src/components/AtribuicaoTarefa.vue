<template>
  <q-dialog @show="loadFuncionarios" ref="atribuicao">
    <q-card class="bg-white q-pa-md ">
      <q-card-section>
        <div class="row justify-center">
          <span style="font-size: 14pt">Selecione um responsável</span>
        </div>
        <q-scroll-area class="q-my-lg" style="height: 150px; width: 250px;">
          <div v-for="funcionario in funcionarios" :key="funcionario.id" class="row items-center">
            <q-radio v-model="idFuncionario" :val="funcionario.id" />
            <span class="q-ml-md" style="font-size: 12pt">{{funcionario.nome}}</span>
          </div>
        </q-scroll-area>
      </q-card-section>
      <div class="row justify-end">
        <q-btn dense flat icon="mdi-account-arrow-right" color="blue" no-caps label="Atribuir"></q-btn>
      </div>
    </q-card>
  </q-dialog>
</template>

<script>
  import { db } from '../boot/firebase'
export default {
  // name: 'ComponentName',
  data () {
    return {
      idFuncionario: '',
      funcionarios: []
    }
  },
  methods: {
    loadFuncionarios: function () {
      this.loadFuncionarios()
    },
    abrir: function () {
      this.$refs.atribuicao.show()
    },
    loadFuncionarios: function () {
      db.collection('funcionarios').get().then((querySnapshot) => {
        querySnapshot.forEach((array) => {
          let aux = array.data()
          aux.id = array.id
          this.funcionarios.push(aux)
        })
      })
    },
  }
}
</script>

<style>
</style>
