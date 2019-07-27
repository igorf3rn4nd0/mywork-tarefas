<template>
  <q-dialog @show="loadDepartamentos" ref="encaminhar">
    <q-card class="bg-white q-pa-md ">
      <q-card-section>
        <div class="row justify-center">
          <span style="font-size: 14pt">Selecione um departamento</span>
        </div>
        <q-scroll-area class="q-my-lg" style="height: 150px; width: 250px;">
          <div v-for="departamento in departamentos" :key="departamento.id" class="row items-center">
            <q-radio v-model="idDepartamento" :val="departamento.id" />
            <span class="q-ml-md" style="font-size: 12pt">{{departamento.nome}}</span>
          </div>
        </q-scroll-area>
      </q-card-section>
      <div class="row justify-end">
        <q-btn dense flat icon="mdi-send" color="blue" no-caps label="Encaminhar"></q-btn>
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
      idDepartamento: '',
      departamentos: []
    }
  },
  methods: {
    abrir: function () {
      this.$refs.encaminhar.show()
    },
    loadDepartamentos: function () {
      db.collection('departamentos').get().then((querySnapshot) => {
        querySnapshot.forEach((array) => {
          let aux = array.data()
          aux.id = array.id
          this.departamentos.push(aux)
        })
      })
    }
  }
}
</script>

<style>
</style>
