<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="toolbar">
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
        >
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title>
          MyWork
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      content-class="drawer-menu"
    >
      <div class="column q-my-md items-center">
        <q-avatar size="100px">
          <img src="/assets/user.png">
        </q-avatar>
      </div>
      <div class="column items-center">
        <div clickable @click="routerPush('Dashboard')" :class="itemMenu">
          <div class="col-auto">
            <q-icon color="white" size="25px" class="q-mx-md" name="mdi-view-dashboard"></q-icon>
          </div>
          <div class="col-auto">
            <span style="font-size: 13pt; color: white">Dashborad</span>
          </div>
        </div>
        <div @click="routerPush('TarefasList')" :class="itemMenu">
          <div class="col-auto">
            <q-icon color="white" size="25px" class="q-mx-md" name="mdi-calendar-check"></q-icon>
          </div>
          <div class="col-auto">
            <span style="font-size: 13pt; color: white">Tarefas</span>
          </div>
        </div>
        <div :class="itemMenu">
          <div class="col-auto">
            <q-icon color="white" size="25px" class="q-mx-md" name="mdi-account"></q-icon>
          </div>
          <div class="col-auto">
            <span @click="routerPush('FuncionarioList')" style="font-size: 13pt; color: white">Funcionários</span>
          </div>
        </div>
        <div :class="itemMenu">
          <div class="col-auto">
            <q-icon color="white" size="25px" class="q-mx-md" name="mdi-clipboard-account"></q-icon>
          </div>
          <div @clickable @click="routerPush('DepartamentoList')" class="col-auto">
            <span style="font-size: 13pt; color: white">Departamentos</span>
          </div>
        </div>
        <div :class="itemMenu">
          <div class="col-auto">
            <q-icon color="white" size="25px" class="q-mx-md" name="mdi-human-greeting"></q-icon>
          </div>
          <div @click="routerPush('ClienteList')" class="col-auto">
            <span style="font-size: 13pt; color: white">Clientes</span>
          </div>
        </div>
        <div class="fixed-bottom q-ma-sm">
          <q-btn @click="sair" flat dense color="white" icon="mdi-logout" round></q-btn>
        </div>
      </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'

export default {
  name: 'MyLayout',
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop,
      itemColor: '',
      itemMenu: 'item-menu row justify-start items-center q-my-xs'
    }
  },
  methods: {
    openURL,
    routerPush (caminho) {
      console.log('entrou')
      this.$router.push(caminho)
    },
    sair: function () {
      this.$router.push('/')
    }
  }
}
</script>

<style>
  .item-menu {
    border-radius: 5px;
    height: 40px;
    width: 85%;
  }
  .item-menu:hover {
    background-color: rgba(0,0,0,0.45);
  }
  .drawer-menu {
    background-image: url('/assets/menu.jpg');
    background-repeat: no-repeat, repeat;
    background-size: cover;
  }
  .toolbar {
    background-image: linear-gradient(to right, #5F80A5, #35485e);
  }
</style>
