<template>
  <q-page class="flex flex-center">
  Historial
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
    async created() 
  {
    if (!this.$store.state.auth.status.loggedIn)
    {
      this.$router.push("/login").catch(error => {
        if (error.name != "NavigationDuplicated") {
          throw error;
        }
       });
    }
    if (!localStorage.getItem('long') && !localStorage.getItem('lat')) 
    {
          this.$router.push("/ubicacion/cargar");  
    }
  }
}

</script>
