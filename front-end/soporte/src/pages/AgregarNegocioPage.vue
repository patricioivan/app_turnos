<template>
<q-page>
  <div id="q-app">
    <div class="q-pa-md">
        <q-card class="my-card">
          <q-list class="bg-grey-10 text-white shadow-2 rounded-borders" style=" width: 100%;">
            <q-item>
              <q-item-section avatar>
                <q-avatar>
                  <q-icon name="add_business" color="white" />
                </q-avatar>
              </q-item-section>
              <q-item-section>Agregar Nuevo Negocio</q-item-section>
            </q-item>
          </q-list>
      <q-card-section>
        <q-form
          @submit="submitForm"
          ref="NegocioForm"
          class="q-gutter-lg "
          >
         

          <q-input 
            class="size-lg"
            color="positive"
            name="Nombre de la Empresa"
            v-model="negocio.nombre"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Por favor escriba el nombre del negocio']"
            label="Nombre del negocio"
            ref="negocioNombre">
                <template v-slot:prepend>
                <q-icon name="local_convenience_store" color="primary" />
                </template>
          </q-input>

          <q-input 
            class="size-lg"
            color="positive"
            name="provincia"
            v-model="negocio.provincia"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Por favor escriba la provincia']"
            label="Provincia"
            ref="negocioProvincia">
                <template v-slot:prepend>
                <q-icon name="location_city" color="primary" />
                </template>
          </q-input>
          

          <q-input 
            class="size-lg"
            color="positive"
            name="localidad"
            v-model="negocio.localidad"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Por favor escriba la localidad']"
            label="Localidad"
            ref="negocioLocalidad">
                <template v-slot:prepend>
                <q-icon name="location_city" color="primary" />
                </template>
          </q-input>


           <q-input 
            class="size-lg"
            color="positive"
            name="calle"
            v-model="negocio.calle"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Por favor escriba la calle de la negocio']"
            label="Calle"
            ref="negocioCalle">
                <template v-slot:prepend>
                <q-icon name="add_road" color="primary" />
                </template>
          </q-input>

           <q-input 
            class="size-lg"
            @blur="obtenerUbicacion"
            color="positive"
            name="numero"
            v-mask="'###########'"
            v-model="negocio.numero"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Por favor escriba la altura de la calle']"
            label="Numero"
            ref="negocioNumero">
                <template v-slot:prepend>
                <q-icon name="money" color="primary" />
                </template>
          </q-input>

          <q-input 
            class="size-lg"
            color="positive"
            name="departamento"
            v-model="negocio.departamento"
            lazy-rules
            label="Departamento"
            ref="negocioDepartamento">
                <template v-slot:prepend>
                <q-icon name="location_city" color="primary" />
                </template>
          </q-input>
     
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

           <q-select 
           v-model="negocio.rubros" 
           :options="rubros"
           multiple 
            color="positive"
           :value="$store.state.rubros._id"
           label="Lista de Rubros"
           :rules="[val => val.length > 0 || 'Elija el rubro']"
           option-label="nombre" option-value="_id"
           >
           <template v-slot:prepend>
              <q-icon name="list" color="primary" />
              </template>
           </q-select>
          <div>
            <q-btn label="Agregar" type="submit" color="primary"/>
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
  name: 'AgregarNegocio',
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
      negocio: {
        nombre: '',
        provincia:'',
        localidad:'',
        calle:'',
        numero:'',
        departamento:'',
        longitude: '',
        latitude: '',
        rubros: [],
      }
    }
  },
      computed: {
  
    ...mapState({
      rubros: state =>  state.rubros
    }),
    
    ...mapGetters(['rubros']),
    
    
    },
    methods: {
          ...mapActions({
      loadRubros: 'loadRubros',
    }),
      obtenerUbicacion() {

        const address = this.negocio.provincia+"+"+this.negocio.localidad+"+"+this.negocio.calle+"+"+this.negocio.numero;
        console.log(address)
        axios
        .get('https://maps.googleapis.com/maps/api/geocode/json?address='+address+'&key=AIzaSyDvvaO2p_Z1Z-6VJUFa712ucJI4XAH-N2E', {
          transformRequest: (data, headers) => {
            delete headers.common['x-auth'];
          }
        })
        .then(response => {
          const coordenates = response.data.results[0].geometry.location
          this.negocio.longitude = coordenates.lng
          this.negocio.latitude = coordenates.lat 

          this.center.lat = coordenates.lat
          this.center.lng = coordenates.lng
          this.markers[0].lat = coordenates.lat
          this.markers[0].lng = coordenates.lng
          return response.data.results[0].geometry.location
        })
       
      },

      async submitForm() {
        try {
          const response = await axios
            .post('http://ec2-18-235-243-39.compute-1.amazonaws.com:3000/api/empresas/'+this.$route.params.id+'/negocios', 
            { 
                nombre: this.negocio.nombre,
                provincia:this.negocio.provincia,
                localidad:this.negocio.localidad,
                calle:this.negocio.calle,
                numero:this.negocio.numero,
                departamento:this.negocio.departamento,
                longitude: this.negocio.longitude,
                latitude: this.negocio.latitude,
                rubros: this.negocio.rubros

            })
              this.$q.notify({
              color: 'green-4',
              textColor: 'white',
              icon: 'cloud_done',
              message: "Negocio agregado correctamente"
            })
             this.$router.push("/negocio/"+response.data.negocio._id)
        } catch (error) {
            this.$q.notify({
              color: 'red-4',
              textColor: 'white',
              icon: 'cloud_done',
              message: error.response.data.mensaje
            })
        }

      },
    },
        mounted() {
       this.loadRubros()
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

