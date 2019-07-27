<template>
  <div class="q-pa-md">
    <div class="fixed-center">
      <div class="column q-my-md items-center">
        <q-avatar color="primary" size="100px">
          <img src="/assets/user.png">
        </q-avatar>
      </div>
      <div style="border-radius: 5px; width: 400px" class="q-pa-md">
        <q-input outlined v-model="usuario.email" label="E-mail" />
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
          <q-btn :disabled="usuario.senha === '' ? true : usuario.email === '' ? true : false" @click="login" style="height: 40px" color="primary" class="full-width" label="Entrar"></q-btn>
        </div>
      </div>
      <div class="row justify-center q-mt-sm">
        <span>
          Não tem uma conta?
        </span>
        <q-badge clickable class="q-ml-sm" @click="criarConta">
          Cadastre-se
        </q-badge>
      </div>
    </div>
  </div>
</template>

<script>
  import { Notify } from 'quasar'
  import Firebase from '../boot/firebase'
  import { required } from 'vuelidate'
export default {
  // name: 'PageName',
  data () {
    return {
      auth: Firebase.auth(),
      usuario: {},
      isPwd: true
    }
  },
  methods: {
    login: function () {
      this.auth.signInWithEmailAndPassword(this.usuario.email, this.usuario.senha).then((sucess) => {
        console.log('entrou:', sucess)
        this.$router.push('/Dashboard')
      }).catch((erro) => {
        console.log('erro:', erro)
        this.$q.notify({ message: erro.message, color: 'red', timeout: 1000 })
      })
    },
    criarConta: function () {
      this.$router.push('/CriarConta')
    }
  },
  validations: {
    usuario: {
      email: {
        required
      },
      senha: {
        required
      }
    }
  }
}
</script>

<style>
</style>
