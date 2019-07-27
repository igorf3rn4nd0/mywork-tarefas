<template>
  <div class="q-pa-md">
    <div class="fixed-center">
      <div class="column q-my-md items-center">
        <q-avatar color="primary" size="100px">
          <img src="/assets/user.png">
        </q-avatar>
      </div>
      <div style="border-radius: 5px; width: 400px" class="q-pa-md">
        <q-input class="q-my-md" outlined v-model="usuario.nome" label="Nome" />
        <q-input outlined v-model="usuario.email" label="E-mail" />
        <q-input class="q-my-md" outlined v-model="usuario.login" label="Login" />
        <q-input label="Senha" class="q-my-md"  v-model="usuario.senha" outlined :type="isPwd ? 'password' : 'text'">
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>
        <div style="margin-top: 50px" class="row justify-center">
          <q-btn @click="cadastrar" style="height: 40px" color="primary" class="full-width" label="Cadastrar"></q-btn>
        </div>
      </div>
      <div class="row justify-center q-mt-sm">
        <q-badge clickable class="q-ml-sm" @click="backToLogin">
          Voltar
        </q-badge>
      </div>
    </div>
  </div>
</template>

<script>
  import { Notify } from 'quasar'
  import Firebase from '../boot/firebase'
export default {
  // name: 'PageName',
  data () {
    return {
      auth: Firebase.auth(),
      usuario: {},
      isPwd: false
    }
  },
  methods: {
    cadastrar: function () {
      this.auth.createUserWithEmailAndPassword(this.usuario.email, this.usuario.senha).then((sucess) => {
        this.$router.push('/Dashboard')
      }).catch((erro) => {
        this.$q.notify({ message: erro.message, color: 'red', timeout: 1000 })
      })
    },
    backToLogin: function () {
      this.$router.push('/')
    }
  }
}
</script>

<style>
</style>
