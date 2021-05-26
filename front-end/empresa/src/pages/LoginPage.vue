<template>
  <q-page class="flex flex-center">
    <login/>
  </q-page>
</template>


<script>

import Login from 'src/components/Auth/Login.vue'

export default {
  
  name: 'LoginPage',
  data () {
      return {


      }
  },
  components: {
      'login' : require('components/Auth/Login.vue').default
  }
}
</script>

