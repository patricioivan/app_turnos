<template>
<div>
        <q-card>
          <q-card-section>
        <div v-if="negociosFavoritos.length == 0">
          <q-list bordered padding class="rounded-borders" >
                 
                <q-item class="q-pa-md">
                  No tienes negocios favoritos 
                </q-item>
              
          </q-list>
        </div>
        <div v-else class=" fit row wrap justify-start items-start content-start">
          <q-list class="bg-grey-10 text-white shadow-2 rounded-borders" style=" width: 100%;">
            <q-item>
              <q-item-section avatar>
                <q-avatar>
                  <q-icon name="favorite" color="white" />
                </q-avatar>
              </q-item-section>
              <q-item-section>Favoritos</q-item-section>
            </q-item>
          </q-list>
        <negocio
          v-for="(favorito,componentKey) in negociosFavoritos"
          :key="componentKey"
          :negocio="favorito.negocio"
          >
        </negocio>
      </div>
      </q-card-section>
      </q-card>
</div>
</template>

<script>
import Negocio from 'src/components/Negocio.vue'
import {mapState, mapGetters, mapActions} from 'vuex'
export default {
    name: 'PageFavoritos',

    components: {
    'negocio' : require('components/Negocio.vue').default,

  },
     computed: {

     ...mapState({
      negociosFavoritos: state => state.negociosFavoritos,

    }),
    ...mapGetters(['negociosFavoritos']),
  
    },
  methods: {
    ...mapActions({
      loadNegociosFavoritos: 'loadNegociosFavoritos',
    }),

  },
  mounted() {
        this.loadNegociosFavoritos()
        console.log("negocios fav:", this.negociosFavoritos)
    },

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
