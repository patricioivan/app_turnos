<template>
  <q-page>
        <q-card>
       <q-card-section>
        <div>
      <q-chip size="15px" color="positive"  icon="search">
        Busqueda: {{this.$route.params.query}}
      </q-chip>
    </div>
       </q-card-section>
        <q-card-section v-if="!negocios_buscados">
            No hay negocios que coincidan con tu búsqueda.
        </q-card-section>
       <q-card-section v-else> 
      <div class=" fit row wrap justify-start items-start content-start">
        <negocio
          v-for="(negocio,componentKey) in negocios_buscados"
          :key="componentKey"
          :negocio="negocio"
          >
        </negocio>
      </div>
       </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex'
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
  },
    components: {
    'negocio' : require('components/Negocio.vue').default,
  },
       computed: {

     ...mapState({
      negocios_buscados: state => state.negocios_buscados,
    }),
    ...mapGetters(['negocios_buscados']),
  
    },
  methods: {
    ...mapActions({
      loadNegociosBuscado: 'loadNegociosBuscado',
    }),

   
  },
  mounted() {
        this.loadNegociosBuscado(this.$route.params.query)
    },

}

</script>
