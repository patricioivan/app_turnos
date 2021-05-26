<template>

</template>

<script>
import { mapActions, mapGetters} from "vuex";


export default {
  name: "Search",
  data() {
    return {
         query:"",
      };
  
  },
  methods: {
      buscarEmpresas() {
          console.log(this.query)
      }


  }

};
</script>

<style>

</style>