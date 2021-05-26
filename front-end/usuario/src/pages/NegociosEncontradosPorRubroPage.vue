<template>
  <q-page>
        <q-card>
          <q-card-section>
        <div v-if="!negocios_buscados">
            No hay negocios en este rubro.

        </div>
      <div v-else class=" fit row wrap justify-start items-start content-start">
         <q-list class="bg-grey-10 text-white shadow-2 rounded-borders" style=" width: 100%;">
            <q-item>
              <q-item-section avatar>
                <q-avatar>
                  <q-icon name="business" color="white" />
                </q-avatar>
              </q-item-section>
              <q-item-section>Negocios de este rubro</q-item-section>
            </q-item>
          </q-list>
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
  name: 'PageRubroNegocio',
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
      loadNegocioPorRubro: 'loadNegocioPorRubro',
    }),

   
  },
  mounted() {
        this.loadNegocioPorRubro(this.$route.params._id)
    },

}

</script>
