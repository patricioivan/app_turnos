<template>
  <q-page>
    <div class="col q-pa-md">
      <q-input v-on:keyup.enter="buscar()" bottom-slots v-model="query" label="Buscar" counter maxlength="30" >
        <template v-slot:before>
          <q-icon name="business" />
        </template>

        <template v-slot:append>
          <q-icon v-if="query !== ''" name="close" @click="query = ''" class="cursor-pointer" />
          <q-icon name="search" />
        </template>
     
        <template v-slot:hint>
          Encuentra negocios cercanos
        </template>
      </q-input>
    </div>
     <q-card class="my-card">
       <q-card-section>
        <div>
     <q-list class="bg-yellow-10 text-white shadow-2 rounded-borders" style=" width: 100%;">
            <q-item>
              <q-item-section avatar>
                <q-avatar>
                  <q-icon name="local_offer" color="white" />
                </q-avatar>
              </q-item-section>
              <q-item-section class="text-h6">Rubros</q-item-section>
            </q-item>
          </q-list>
    </div>
       </q-card-section>
        <q-card-section> 
          <div class=" row">
                  <rubro
                  v-for="(rubro,componentKey) in rubros"
                  :key="componentKey"
                  :rubro="rubro"
                  >
                  </rubro>
          </div>  
        </q-card-section>
    

    </q-card>    
    <q-card>
      <q-card-section>
        <div>
          <q-list class="bg-yellow-10 text-white shadow-2 rounded-borders" style=" width: 100%;">
            <q-item>
              <q-item-section avatar>
                <q-avatar>
                  <q-icon name="location_on" color="white" />
                </q-avatar>
              </q-item-section>
              <q-item-section class="text-h6">Mi Ubicación</q-item-section>
            </q-item>
          </q-list>
        </div>
       </q-card-section>
      <q-card-section>
      <div id="mapa q-pa-sm">
      <gmap-map
        :center="center"
        :zoom="zoom"
        :options="options"
        style="width: 100%; height: 450px;">
        <gmap-marker v-for="(marker) in markers"
          :key="marker.key"
          :position="marker"

        >
        </gmap-marker>
      </gmap-map>
      </div>
      </q-card-section>    
    </q-card>
    <q-card>
       <q-card-section>
        <div>
      <q-list class="bg-yellow-10 text-white shadow-2 rounded-borders" style=" width: 100%;">
            <q-item>
              <q-item-section avatar>
                <q-avatar>
                  <q-icon name="business" color="white" />
                </q-avatar>
              </q-item-section>
              <q-item-section class="text-h6">Negocios Cercanos</q-item-section>
            </q-item>
          </q-list>
    </div>
       </q-card-section>
       <q-card-section> 
      <div class=" fit row wrap justify-start items-start content-start">
        <negocio
          v-for="(negocio,componentKey) in negocios"
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
import Rubro from 'src/components/Rubros/Rubro.vue'
import Negocio from 'src/components/Negocio.vue'
import {mapState, mapGetters, mapActions} from 'vuex'

import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDvvaO2p_Z1Z-6VJUFa712ucJI4XAH-N2E'
  }
})
export default {
  name: 'PageIndex',
  
  data () {
    return {
      slide:1,
      query: '',
      center: {
        lat: null,
        lng: null
      },
      zoom: 18,
      markers: [
        { 
          lat: null, 
          lng: null
          
        },
        
      ],
      options: {
        zoomControl: true,
        mapTypeControl: false, 
        scaleControl: false,
        streetViewControl: false, 
        fullscreenControl: true 
      },
    }
  },
  components: {
    'negocio' : require('components/Negocio.vue').default,
    'rubro' : require('components/Rubros/Rubro.vue').default

  },
 
     computed: {

     ...mapState({
      negocios: state => state.negocios,
      rubros: state => state.rubros,
    }),
    ...mapGetters(['negocios','rubros']),
  
    },
  methods: {
    ...mapActions({
      guardarUbicacion: 'guardarUbicacion',
      loadNegocios: 'loadNegocios',
      loadRubros: 'loadRubros'
    }),
    buscar() {
      this.$router.push({ name: 'negocio.buscar', params: { query: this.query }})
    },
  },
  mounted() {
        this.loadRubros()
        this.loadNegocios()
        // console.log('LATITUDE MOUNTED:', parseFloat(localStorage.getItem('lat')))
        this.center.lat = parseFloat(localStorage.getItem('lat'))
        this.center.lng = parseFloat(localStorage.getItem('long'))
        this.markers[0].lat = parseFloat(localStorage.getItem('lat'))
        this.markers[0].lng = parseFloat(localStorage.getItem('long'))

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

      if (!localStorage.getItem('long') && !localStorage.getItem('lat')) {
                        this.$router.push("/ubicacion/cargar");
                    } else {

                      this.center.lat = parseFloat(localStorage.getItem('lat'))
                      this.center.lng = parseFloat(localStorage.getItem('long'))
                      this.markers[0].lat = parseFloat(localStorage.getItem('lat'))
                      this.markers[0].lng = parseFloat(localStorage.getItem('long'))
                    }
  }
 
}

</script>

