<template>
<q-page>
  <div id="q-app">
    <div class="q-pa-md">
      <q-card class="my-card">
             <q-list class="bg-grey-10 text-white shadow-2 rounded-borders" style=" width: 100%;">
            <q-item>
              <q-item-section avatar>
                <q-avatar>
                  <q-icon name="business" color="white" />
                </q-avatar>
              </q-item-section>
              <q-item-section class="text-h5">{{empresa.nombre}}</q-item-section>
            </q-item>
          </q-list>

        <q-list class="q-pa-sm">
          <q-item>
            <q-item-section avatar>
              <q-icon color="primary" name="location_on" />
            </q-item-section>
  
            <q-item-section>
              <q-item-label>Direccion</q-item-label>
              <q-item-label v-if="empresa.direccion" caption>{{empresa.direccion.calle}} 
              {{empresa.direccion.numero}} {{empresa.direccion.provincia}}, {{empresa.direccion.localidad}}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
        <q-list class="q-pa-sm">
          <q-item>
            <q-item-section avatar>
              <q-icon color="secondary" name="topic" />
            </q-item-section>
  
            <q-item-section>
              <q-item-label>Razon Social</q-item-label>
              <q-item-label caption>{{empresa.razonSocial}}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>

        <q-list class="q-pa-sm">
          <q-item>
            <q-item-section avatar>
              <q-icon color="dark" name="fingerprint" />
            </q-item-section>
  
            <q-item-section>
              <q-item-label>CUIL</q-item-label>
              <q-item-label caption>{{empresa.cuil}}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>

        <q-list class="q-pa-sm">
          <q-item>
            <q-item-section avatar>
              <q-icon color="negative" name="email" />
            </q-item-section>
  
            <q-item-section>
              <q-item-label>Email</q-item-label>
              <q-item-label caption>{{empresa.email}}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
        <q-card-actions class="q-pa-sm">
          <q-btn 
          flat
          :to="{ name: 'empresa.agregar_negocio', params: { id: empresa._id }}" 
          round color="secondary" 
          icon="add">
          Agregar Negocio
          </q-btn>
          <div v-if="!this.$q.platform.is.mobile">
          <q-btn 
          flat
          @click="prompt = true"
          round color="secondary" 
          icon="add">
          Actualizar Imagen
          </q-btn>

          </div>
          <q-dialog v-model="prompt" persistent>
            <q-card style="min-width: 350px">
              <q-card-section>
                <div class="text-h6">Seleccione una imagen</div>
              </q-card-section>

              <q-card-section class="q-pt-none">
                 <q-file 
                 v-model="imagen" 
                 autofocus 
                 @keyup.enter="prompt = false" 
                 color="purple-12"
                  style="max-width: 300px"
                  label="Restricted to images"
                  accept=".jpg, image/*"
                 >
                  <template v-slot:prepend>
                    <q-icon name="attach_file" />
                  </template>
                 </q-file>
            
              </q-card-section>

              <q-card-actions align="right" class="text-primary">
                <q-btn flat label="Cancelar" v-close-popup />
                <q-btn @click="cambiarImagen()" flat label="Cambiar Imagen" v-close-popup />
              </q-card-actions>
            </q-card>
    </q-dialog>
        </q-card-actions>
      </q-card>
    </div>
      <div class="q-pa-md fit row wrap justify-start items-start content-start">
        <negocio
          v-for="(negocio,componentKey) in negocios"
          :key="componentKey"
          :negocio="negocio"
          >
        </negocio>
      </div>
    
  </div>
</q-page>
</template>

<script>
import Negocio from 'src/components/Negocios/Negocio.vue'
import {mapState, mapGetters, mapActions} from 'vuex'
import axios from 'axios' 

export default {
  name: 'ShowEmpresa',
  data () {
    return {
      componentKey: 0,
      id: '',
      imagen:null,
      prompt:false
    }
  },
components: {
    'negocio' : require('components/Negocios/Negocio.vue').default
  },

   computed: {

     ...mapState({
      empresa: state =>  state.empresa,
      negocios: state => state.negocios
    }),
    ...mapGetters(['empresa','negocios']),
    
    },
  methods: {
        ...mapActions({
      loadEmpresa: 'loadEmpresa',
      loadNegocios: 'loadNegocios',
    }),
    async cambiarImagen() {
      if (!this.imagen) {
         this.$q.notify({
              color: 'red-4',
              textColor: 'white',
              icon: 'cloud_done',
              message: "Seleccione una imagen"
            })
        return;
      }

      var bodyFormData = new FormData();
      bodyFormData.append('image', this.imagen); 
        try {
          await axios({
                        method: 'put',
                        url: 'http://ec2-18-235-243-39.compute-1.amazonaws.com:3000/api/empresas/'+this.$route.params.id+'/upload-imagen',
                        data: bodyFormData,
                        headers: {'Content-Type': 'multipart/form-data' }
                        })
              this.$q.notify({
              color: 'green-4',
              textColor: 'white',
              icon: 'cloud_done',
              message: "Imagen cambiada correctamente"})
              this.loadNegocios(this.$route.params.id)
              this.imagen = null
        } catch (error) {
            console.log("error:", error)
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
      this.loadEmpresa(this.$route.params.id)
      this.loadNegocios(this.$route.params.id)
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

