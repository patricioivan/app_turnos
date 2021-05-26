<template>
<q-page>
  <div id="q-app">
    <div class="q-pa-md">
        <q-card class="my-card">
        <q-list class="bg-grey-10 text-white shadow-2 rounded-borders" style=" width: 100%;">
          <q-item>
            <q-item-section avatar>
              <q-avatar>
                <q-icon name="add_location" color="white" />
              </q-avatar>
            </q-item-section>
            <q-item-section>Agregar Ubicacion</q-item-section>
          </q-item>
          </q-list>
      <q-card-section>
        <q-form
          @submit="obtenerUbicacion"
          ref="UbicacionForm"
          class="q-gutter-lg "
          >

          <q-input 
            class="size-lg"
            color="positive"
            name="provincia"
            v-model="ubicacion.provincia"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Por favor escriba la provincia']"
            label="Provincia"
            ref="ubicacionProvincia">
                <template v-slot:prepend>
                <q-icon name="location_city" color="primary" />
                </template>
          </q-input>
          

          <q-input 
            class="size-lg"
            color="positive"
            name="localidad"
            v-model="ubicacion.localidad"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Por favor escriba la localidad']"
            label="Localidad"
            ref="ubicacionLocalidad">
                <template v-slot:prepend>
                <q-icon name="location_city" color="primary" />
                </template>
          </q-input>


           <q-input 
            class="size-lg"
            color="positive"
            name="calle"
            v-model="ubicacion.calle"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Por favor escriba la calle de la ubicacion']"
            label="Calle"
            ref="ubicacionCalle">
                <template v-slot:prepend>
                <q-icon name="add_road" color="primary" />
                </template>
          </q-input>

           <q-input 
            class="size-lg"
            color="positive"
            v-on:keyup="renderizarUbicacion"
            name="numero"
            v-mask="'#############'"
            v-model="ubicacion.numero"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Por favor escriba la altura de la calle']"
            label="Numero"
            ref="ubicacionNumero">
                <template v-slot:prepend>
                <q-icon name="money" color="primary" />
                </template>
          </q-input>

          <div v-if="esperarRenderizacion()" id="mapa q-pa-sm">
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
          <div>
            <q-btn label="Confirmar Ubicacion" type="submit" color="primary"/>
          </div>
        </q-form>
        
      </q-card-section>
    </q-card>
    </div>

  </div>
</q-page>
</template>

<script>
import * as VueGoogleMaps from 'vue2-google-maps'
import Vue from 'vue'
import axios from 'axios'
import VueMask from 'v-mask'
Vue.use(VueMask); 
import {mapState, mapGetters, mapActions} from 'vuex'
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDvvaO2p_Z1Z-6VJUFa712ucJI4XAH-N2E'
  }
})



export default {
  name: 'Ubicacion',
  data () {
    return {
       center: {
        lat: -26.799909,
        lng: -65.299272
      },
      zoom: 18,
      markers: [
        { 
          lat: -26.799909, 
          lng: -65.299272
          
        },
        
      ],
      options: {
        zoomControl: true,
        mapTypeControl: false, 
        scaleControl: false,
        streetViewControl: false, 
        fullscreenControl: true 
      },
      componentKey: 0,
      ubicacion: {

        provincia:'',
        localidad:'',
        calle:'',
        numero:'',
        longitude: '',
        latitude: '',
      }
    }
  },

    methods: {
      async esperarRenderizacion() {
        await setTimeout(()=> {
        },1000)

        return true 
      },
        ...mapActions({
      guardarUbicacion: 'guardarUbicacion',
    }),

      obtenerUbicacion() {

        const address = this.ubicacion.provincia+"+"+this.ubicacion.localidad+"+"+this.ubicacion.calle+"+"+this.ubicacion.numero;
        console.log(address)
        axios
        .get('https://maps.googleapis.com/maps/api/geocode/json?address='+address+'&key=AIzaSyDvvaO2p_Z1Z-6VJUFa712ucJI4XAH-N2E', {
          transformRequest: (data, headers) => {
            delete headers.common['x-auth'];
          }
        })
        .then(response => {
         console.log('Response ubicacion page: ', response)
          const coordenates = response.data.results[0].geometry.location


            const geolocation = {
                coords:{
                    longitude: coordenates.lng,
                    latitude: coordenates.lat,
                }
            }
          this.guardarUbicacion(geolocation)
          this.$router.push("/")
          return response.data.results[0].geometry.location
        })
       
      },
      renderizarUbicacion() {
        const address = this.ubicacion.provincia+"+"+this.ubicacion.localidad+"+"+this.ubicacion.calle+"+"+this.ubicacion.numero;
        console.log(address)
        axios
        .get('https://maps.googleapis.com/maps/api/geocode/json?address='+address+'&key=AIzaSyDvvaO2p_Z1Z-6VJUFa712ucJI4XAH-N2E', {
          transformRequest: (data, headers) => {
            delete headers.common['x-auth'];
          }
        })
        .then(response => {
          const coordenates = response.data.results[0].geometry.location
          this.ubicacion.longitude = coordenates.lng
          this.ubicacion.latitude = coordenates.lat 

          this.center.lat = coordenates.lat
          this.center.lng = coordenates.lng
          this.markers[0].lat = coordenates.lat
          this.markers[0].lng = coordenates.lng
          return response.data.results[0].geometry.location
        })
      },

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
  }

}
</script>

