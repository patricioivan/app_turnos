<template>
  <q-page>
        <q-card>

       <q-card-section> 
      <div v-if="negocios_empresa" class=" fit row wrap justify-start items-start content-start">
        <q-list class="bg-grey-10 text-white shadow-2 rounded-borders" style=" width: 100%;">
            <q-item>
              <q-item-section avatar>
                <q-avatar>
                  <q-icon name="add_business" color="white" />
                </q-avatar>
              </q-item-section>
              <q-item-section>Otras sucursales</q-item-section>
            </q-item>
          </q-list>
        <negocio
          v-for="(negocio,componentKey) in negocios_empresa"
          :key="componentKey"
          :negocio="negocio"
          >
        </negocio>
      </div>
      <div v-else>
           <q-badge outline color="primary" label="Esta empresa no tiene sucursales" />
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
      negocios_empresa: state => state.negocios_empresa,
    }),
    ...mapGetters(['negocios_empresa']),
  
    },
  methods: {
    ...mapActions({
      loadNegociosEmpresa: 'loadNegociosEmpresa',
    }),

   
  },
  mounted() {
        this.loadNegociosEmpresa(this.$route.params.id)
    },

}

</script>
