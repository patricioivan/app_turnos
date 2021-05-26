<template>
  <q-layout view="hhr lpR fFr">

    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg">
          </q-avatar>
         Turnos App
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    
    <q-page-container>
      <router-view />
      
    </q-page-container>

  </q-layout>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>