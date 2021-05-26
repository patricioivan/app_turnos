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
              <q-item-section>Editar {{negocio_edit.nombre}}</q-item-section>
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
            
            v-model="negocio_edit.nombre"
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
            v-model="negocio_edit.provincia"
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
            
            v-model="negocio_edit.localidad"
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
            
            v-model="negocio_edit.calle"
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
            color="positive"
            name="numero"
            v-mask="'###########'"
            v-model="negocio_edit.numero"
            lazy-rules
            :rules="[ val => val > 0 || 'Por favor escriba la altura de la calle']"
            label="Numero"
            >
                <template v-slot:prepend>
                <q-icon name="money" color="primary" />
                </template>
          </q-input>

          <q-input 
            class="size-lg"
            color="positive"
            name="departamento"
            
            v-model="negocio_edit.departamento"
            lazy-rules
            label="Departamento"
            ref="negocioDepartamento">
                <template v-slot:prepend>
                <q-icon name="location_city" color="primary" />
                </template>
          </q-input>

           <q-select 
           v-model="negocio_edit.rubros" 
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
            <q-btn label="Editar" type="submit" color="primary"/>
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
  name: 'EditarNegocio',
  data () {
    return {

      componentKey: 0,
      negocio_editf: {
        nombre: '',
        longitude: '',
        latitude: '',
        rubros: '',
        provincia: '',
        localidad: '',
        calle:'',
        numero:'',
        departamento:'',
        
      }
    }
  },
      computed: {
  
    ...mapState({
      rubros: state =>  state.rubros,
      negocio_edit: state => state.negocio_edit
    }),
    
    ...mapGetters(['rubros','negocio_edit']),
    
    
    },
    methods: {
          ...mapActions({
      loadRubros: 'loadRubros',
      loadNegocioEdit: 'loadNegocioEdit',
    }),
      async obtenerUbicacion() {

        const address = this.negocio_edit.provincia+"+"+this.negocio_edit.localidad+"+"+this.negocio_edit.calle+"+"+this.negocio_edit.numero;
        console.log(address)
        const response = await axios
        .get('https://maps.googleapis.com/maps/api/geocode/json?address='+address+'&key=AIzaSyDvvaO2p_Z1Z-6VJUFa712ucJI4XAH-N2E', {
          transformRequest: (data, headers) => {
            delete headers.common['x-auth'];
          }
        })
          const coordenates = response.data.results[0].geometry.location
          this.negocio_edit.longitude = coordenates.lng
          this.negocio_edit.latitude = coordenates.lat 

          return response.data.results[0].geometry.location
       
      },

      async submitForm() {
        await this.obtenerUbicacion()
        try {
          const response = await axios
            .put('http://ec2-18-235-243-39.compute-1.amazonaws.com:3000/api/negocios/'+this.$route.params.id+'', 
            { 
                nombre: this.negocio_edit.nombre,
                provincia:this.negocio_edit.provincia,
                localidad:this.negocio_edit.localidad,
                calle:this.negocio_edit.calle,
                numero:this.negocio_edit.numero,
                departamento:this.negocio_edit.departamento,
                longitude: this.negocio_edit.longitude,
                latitude: this.negocio_edit.latitude,
                rubros: this.negocio_edit.rubros

            })
              this.$q.notify({
              color: 'green-4',
              textColor: 'white',
              icon: 'cloud_done',
              message: "Negocio editado correctamente"
            })
             this.$router.push("/negocio/"+response.data.negocio._id)
        } catch (error) {
            this.$q.notify({
              color: 'red-4',
              textColor: 'white',
              icon: 'warning',
              message: error.response.data.mensaje
            })
            console.log(error.response)
        }

      },
    },
        mounted() {
       this.loadRubros()
       this.loadNegocioEdit(this.$route.params.id)
      
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

