<template>
<div>
  
       <q-chip  
       @click="buscarRubro(rubro)"
       clickable 
       class="q-pa-md">
        <q-avatar>
          <img src="https://cdn4.iconfinder.com/data/icons/seo-internet-marketing-27/160/local-business-512.png">
        </q-avatar>
         {{rubro.nombre}}
      </q-chip>
</div>     


</template>

<script>
export default {
    props: ['rubro','id'],
     methods: 
     {
       buscarRubro(rubro) {
         console.log("Rubro nombre", rubro.nombre)
           this.$router.push({ name: 'negocio.rubro.buscar', params: { _id: rubro._id }})
       }
     }


}
</script>