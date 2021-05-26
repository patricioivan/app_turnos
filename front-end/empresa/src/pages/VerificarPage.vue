<template>
  <q-page>
        <q-card>
            <q-card-section>
                 <q-carousel
        v-model="slide"
        transition-prev="jump-right"
        transition-next="jump-left"
        swipeable
        animated
        control-color="white"
        prev-icon="arrow_left"
        next-icon="arrow_right"
        navigation-icon="radio_button_unchecked"
        navigation
        padding
        arrows
        height="300px"
        class="bg-primary text-white shadow-1 rounded-borders"
      >
        <q-carousel-slide name="1" class="column no-wrap flex-center">
          <q-icon name="business" size="56px" />
          <div class="q-mt-md text-center">
            Seleccione una sucursal
          </div>
        </q-carousel-slide>
        <q-carousel-slide name="2" class="column no-wrap flex-center">
          <q-icon name="qr_code_scanner" size="56px" />
          <div class="q-mt-md text-center">
            Escanee el codigo QR
          </div>
        </q-carousel-slide>
        <q-carousel-slide name="3" class="column no-wrap flex-center">
          <q-icon name="check_circle_outline" size="56px" />
          <div class="q-mt-md text-center">
            ¡Listo!
          </div>
        </q-carousel-slide>
      </q-carousel>
            </q-card-section>
       <q-card-section> 
           <q-form
          @submit="submitForm"
          ref="VerificarForm"
          class="q-gutter-lg "
          >
            <q-select 
            
            v-model="sucursal" 
           :options="negocios"
            color="positive"
           :value="negocios._id"
           label="Seleccione una sucursal"
           lazy-rules
           :rules="[val => val || 'Elija una sucursal ']"
           option-label="nombre" option-value="_id" />
            <div v-if="this.$q.platform.is.mobile">
            <q-btn 
                color="black"
                label="Escanear Codigo QR"
                class="full-width"  
                @click="scanImage" />

            </div>
           <div v-else>
                <q-btn 
                @click="webScanner"
                color="black"
                class="full-width" 
                label="Escanear Codigo QR" />
                <qrcode-stream v-if="mostrarCamara" @decode="onDecode" @init="onInit" />
            </div> 
           <!-- <div class="">
               <video
                class="full-width"
                autoplay
                ref="video"
               />
           </div> -->
           </q-form>
       </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex'
import axios from 'axios'
import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from 'vue-qrcode-reader'
export default {
  name: 'PageVerificar',
  data () {
    return {    
        sucursal: '',
        slide: '1',
        error:'',
        result:'',
        mostrarCamara:false,
        errorMensaje:''
    }
     
    },
    components: 
    {
    QrcodeStream,
    QrcodeDropZone,
    QrcodeCapture
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

  },
       computed: {

     ...mapState({
      negocios: state => state.negocios,
    }),
    ...mapGetters(['negocios']),
  
    },
  methods: {
    ...mapActions({
      loadNegocios: 'loadNegocios',
    }),
    webScanner() {
        if(this.sucursal){
          this.mostrarCamara = true
        }
        else
        {
          this.$q.notify({
                color: 'red-4',
                textColor: 'white',
                icon: 'cloud_done',
                message: 'Seleccione una sucursal'
                })
        }
    },
     scanImage() {
       if(this.sucursal){
           cordova.plugins.barcodeScanner.scan(
              result => {
                if (result.text != '') {
                  this.result = result.text
                  this.submitForm()
                }
              },
              error => {
                alert('Fallo el escaner')
              },
              {
                preferFrontCamera: false, // iOS and Android
                showFlipCameraButton: true, // iOS and Android
                showTorchButton: true, // iOS and Android
                torchOn: false, // Android, launch with the torch switched on (if available)
                saveHistory: true, // Android, save scan history (default false)
                prompt: 'Enfoque el codigo QR', // Android
                resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
                //formats : "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
                orientation: 'portrait', // Android only (portrait|landscape), default unset so it rotates with the device
                disableAnimations: true, // iOS
                disableSuccessBeep: true // iOS and Android
              }
            )
        
        } 
        else {
             this.$q.notify({
                color: 'red-4',
                textColor: 'white',
                icon: 'cloud_done',
                message: 'Seleccione una sucursal'
                })
        }
     },
   onDecode (result) {
      this.result = result
      this.mostrarCamara = false
      if(result)
      {

          this.submitForm()
      }
    },
    // validarAbrirCamara() {
    //     if(this.sucursal){
    //         this.mostrarCamara = true
    //     } 
    //     else {
    //          this.$q.notify({
    //             color: 'red-4',
    //             textColor: 'white',
    //             icon: 'cloud_done',
    //             message: 'Seleccione una sucursal'
    //             })
    //     }
    // },

    async onInit (promise) {
      try {
        await promise
      } catch (error) {
        if (error.name === 'NotAllowedError') {
          this.error = "ERROR: you need to grant camera access permisson"
        } else if (error.name === 'NotFoundError') {
          this.error = "ERROR: no camera on this device"
        } else if (error.name === 'NotSupportedError') {
          this.error = "ERROR: secure context required (HTTPS, localhost)"
        } else if (error.name === 'NotReadableError') {
          this.error = "ERROR: is the camera already in use?"
        } else if (error.name === 'OverconstrainedError') {
          this.error = "ERROR: installed cameras are not suitable"
        } else if (error.name === 'StreamApiNotSupportedError') {
          this.error = "ERROR: Stream API is not supported in this browser"
        }
      }
    },
//    nextPaso() {
//        const siguientePaso = parseInt(this.slide) + 1
//        this.slide = siguientePaso.toString()
        
//    }
        async submitForm() {
          try {
            await axios
                .post('http://ec2-18-235-243-39.compute-1.amazonaws.com:3000/api/turnos/validar', 
                { 
                   turno:this.result,
                   negocio:this.sucursal._id

                })
                this.$q.notify({
                color: 'green-4',
                textColor: 'white',
                icon: 'cloud_done',
                message: "Turno validado"
                })
            } catch (error) {
                this.$q.notify({
                color: 'red-4',
                textColor: 'white',
                icon: 'cloud_done',
                message: error.response.data.mensaje
                })
                console.log("error = ", error.response)
            }

      },
  },
  mounted() {
        this.loadNegocios()
    },

}

</script>
