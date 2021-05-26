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
            <q-item-section>Agregar Nueva Empresa</q-item-section>
          </q-item>
          </q-list>
      <q-card-section>
        <q-form
          @submit="submitForm"
          ref="EmpresaForm"
          class="q-gutter-lg "
          >
          <q-input 
            class="size-lg"
            color="positive"
            name="name"
            v-model="empresa.razonSocial"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Por favor escriba la razon social de la empresa']"
            label="Razon Social empresa"
            ref="razonSocial">
                <template v-slot:prepend>
                <q-icon name="add_business" color="primary" />
                </template>
          </q-input>

          <q-input 
            class="size-lg"
            color="positive"
            name="Nombre de la Empresa"
            v-model="empresa.nombre"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Por favor escriba el nombre de la empresa']"
            label="Nombre de la Empresa"
            ref="empresaNombre">
                <template v-slot:prepend>
                <q-icon name="local_convenience_store" color="primary" />
                </template>
          </q-input>

           <q-input 
            class="size-lg"
            color="positive"
            name="CUIL"
            v-model="empresa.cuil"
            v-mask="'###########'"
            lazy-rules
            :rules="[ val => val && val.length > 10 || 'CUIL debe tener 11 caracteres']"
            label="CUIL"
            ref="empresaCuil">
                <template v-slot:prepend>
                <q-icon name="perm_identity" color="primary" />
                </template>
          </q-input>

    
          <q-input 
            class="size-lg"
            color="positive"
            name="provincia"
            v-model="empresa.provincia"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Por favor escriba la provincia']"
            label="Provincia"
            ref="empresaProvincia">
                <template v-slot:prepend>
                <q-icon name="location_city" color="primary" />
                </template>
          </q-input>
          

          <q-input 
            class="size-lg"
            color="positive"
            name="localidad"
            v-model="empresa.localidad"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Por favor escriba la localidad']"
            label="Localidad"
            ref="empresaLocalidad">
                <template v-slot:prepend>
                <q-icon name="location_city" color="primary" />
                </template>
          </q-input>


           <q-input 
            class="size-lg"
            color="positive"
            name="calle"
            v-model="empresa.calle"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Por favor escriba la calle de la empresa']"
            label="Calle"
            ref="empresaCalle">
                <template v-slot:prepend>
                <q-icon name="add_road" color="primary" />
                </template>
          </q-input>

           <q-input 
            class="size-lg"
            @blur="obtenerUbicacion"
            color="positive"
            name="numero"
            v-model="empresa.numero"
            v-mask="'#######'"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Por favor escriba la altura de la calle']"
            label="Numero"
            ref="empresaNumero">
                <template v-slot:prepend>
                <q-icon name="money" color="primary" />
                </template>
          </q-input>

          <q-input 
            class="size-lg"
            color="positive"
            name="departamento"
            v-model="empresa.departamento"
            lazy-rules
            label="Departamento"
            ref="empresaDepartamento">
                <template v-slot:prepend>
                <q-icon name="location_city" color="primary" />
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

          <q-input 
            class="size-lg"
            color="positive"
            v-model="empresa.email" 
            label="Email"
            lazy-rules
            :rules="[val => isValidEmail(val) || 'Escriba un email correcto']"
            ref="email">
            <template v-slot:prepend>
            <q-icon name="mail" color="primary"/>
            </template>
          </q-input>
          <q-input 
            class="size-lg"
            color="positive"
            type="password" 
            v-model="empresa.password" 
            lazy-rules
             :rules="[ val => val && val.length > 7 || 'Contraseña minima de 8 caracteres']"
            label="Contraseña"
            ref="contraseña">
              <template v-slot:prepend>
              <q-icon name="password" color="primary" />
              </template>
           </q-input>
           
           <!-- <q-select 
           v-model="empresa.rubro" 
           :options="rubros" 
            color="positive"
           :value="$store.state.rubros._id"
           label="Lista de Rubros"
           :rules="[val => val || 'Elija el rubro']"
           option-label="nombre" option-value="_id"
           >
           <template v-slot:prepend>
              <q-icon name="list" color="primary" />
              </template>
           </q-select> -->
           
          

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
import VueMask from 'v-mask'
Vue.use(VueMask); 
import axios from 'axios'
import {mapState, mapGetters, mapActions} from 'vuex'
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDvvaO2p_Z1Z-6VJUFa712ucJI4XAH-N2E'
  }
})



export default {
  name: 'AgregarEmpresa',
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
      empresa: {
        razonSocial: '',
        nombre: '',
        cuil:'',
        provincia:'',
        localidad:'',
        calle:'',
        numero:'',
        departamento:'',
        longitude: '',
        latitude: '',
        email: '',
        password: '',
      }
    }
  },
    computed: {
  
    ...mapState({
      rubros: state =>  state.rubros
    }),
    
    ...mapGetters(['rubros']),
    
    
    },
  components: {
    'empresa' : require('components/Empresas/FormEmpresa.vue').default
  },
    methods: {
      async esperarRenderizacion() {
        await setTimeout(()=> {
        },1000)

        return true 
      },


      obtenerUbicacion() {

        const address = this.empresa.provincia+"+"+this.empresa.localidad+"+"+this.empresa.calle+"+"+this.empresa.numero;
        console.log(address)
        axios
        .get('https://maps.googleapis.com/maps/api/geocode/json?address='+address+'&key=AIzaSyDvvaO2p_Z1Z-6VJUFa712ucJI4XAH-N2E', {
          transformRequest: (data, headers) => {
            delete headers.common['x-auth'];
          }
        })
        .then(response => {
          const coordenates = response.data.results[0].geometry.location
          this.empresa.longitude = coordenates.lng
          this.empresa.latitude = coordenates.lat 

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
            .post('http://ec2-18-235-243-39.compute-1.amazonaws.com:3000/api/empresas', 
            { 
                razonSocial: this.empresa.razonSocial,
                nombre: this.empresa.nombre,
                cuil:this.empresa.cuil,
                provincia:this.empresa.provincia,
                localidad:this.empresa.localidad,
                calle:this.empresa.calle,
                numero:this.empresa.numero,
                departamento:this.empresa.departamento,
                longitude: this.empresa.longitude,
                latitude: this.empresa.latitude,
                email: this.empresa.email,
                password: this.empresa.password,
            })
            
              this.$q.notify({
              color: 'green-4',
              textColor: 'white',
              icon: 'cloud_done',
              message: "Empresa agregada correctamente"})

              this.$router.push("/empresa/"+response.data.empresa._id)
            } catch (error) {
            this.$q.notify({
              color: 'red-4',
              textColor: 'white',
              icon: 'cloud_done',
              message: error.response.data.mensaje
            })
        }

      },
      isValidEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
         return re.test(String(email).toLowerCase());
      },

      obtenerID(id) {
        console.log("ID =", id )
      },
    ...mapActions({
      loadRubros: 'loadRubros',
    })
    },
      beforeCreate: function() {
      
      // navigator.geolocation.getCurrentPosition
      // (position => {
      //   console.log('position: ' , position)
      //   this.center.lat = position.coords.latitude
      //   this.center.lng = position.coords.longitude
      //   this.markers[0].lat = position.coords.latitude
      //   this.markers[0].lng = position.coords.longitude
      // })
   
  },
   mounted()   {
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

