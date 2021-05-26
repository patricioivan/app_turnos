<template>
<q-page class="flex flex-center">
    <div class="column q-pa-lg">
        <div class="row">
            <q-card square class="shadow-24" style="width:300px;height:585px;">
            <q-card-section class="bg-deep-purple-7">
                <h4 class="text-h5 text-white q-my-md">Turnos App</h4>
            </q-card-section>
            <q-card-section>
                <q-form  @submit.prevent="onSubmit" class="q-px-sm q-pt-xl">
                <q-input 
                square 
                clearable 
                v-model="user.nombre" 
                 lazy-rules
                 :rules="[ val => val && val.length > 0 || 'Por favor escriba su nombre']"
                label="Nombre">
                    <template v-slot:prepend>
                    <q-icon name="font_download" color="negative" />
                    </template>
                </q-input>

                    <q-input 
                    square 
                    clearable
                    v-model="user.apellido" 
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Por favor escriba su apellido']"
                    label="Apellido">
                        <template v-slot:prepend>
                        <q-icon name="font_download" color="negative" />
                        </template>
                    </q-input>
                    <q-input 
                    square 
                    clearable 
                    v-model="user.email" 
                    type="email" 
                   lazy-rules
                    :rules="[val => isValidEmail(val) || 'Escriba un email correcto']"
                    label="Email">
                        <template v-slot:prepend>
                        <q-icon name="email" color="negative" />
                        </template>
                    </q-input>
                    <q-input 
                    square 
                    clearable 
                    v-model="user.password" 
                    type="password" 
                    lazy-rules
                    :rules="[ val => val && val.length > 7 || 'Por favor escriba una contraseña de por lo menos 8 caracteres']"
                    label="Password">
                    <template v-slot:prepend>
                    <q-icon name="lock" color="negative" />
                    </template>
                </q-input>
                <q-card-actions class="q-px-lg q-py-lg">
                    <q-btn type="submit" unelevated size="sm" color="purple-4" class="full-width text-white" label="Registrarse" />
                    <q-btn type="submit" to="/login" unelevated size="sm" color="orange-4" class="q-ma-md full-width text-white" label="Login" />
                </q-card-actions>
                </q-form>
            </q-card-section>
            
            </q-card>
        </div>
    </div>
</q-page>

</template>
<script>

import {mapState, mapGetters, mapActions} from 'vuex'


export default {
  name: 'Register',
  data () {
    return {
      componentKey: 0,
      user: {
        nombre: '',
        apellido:'',
        email: '',
        password: '',
        
      },
      loading: false,
      message: ''
    }
  },
  
  computed: {
     loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
    },
    

    
  methods: {
    
     isValidEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
         return re.test(String(email).toLowerCase());
      },

    onSubmit () {
        if (this.user.email && this.user.nombre && this.user.apellido && this.user.password) {
          this.register(this.user).then(
            () => {
                 this.login(this.user).then( () => {
                    navigator.geolocation.getCurrentPosition
                        (position => {
                          this.guardarUbicacion(position)
                          this.$router.push('/');
                          
                        }, (error) => {
                          console.log('localstorage:',localStorage.getItem('long'))
                          if (!localStorage.getItem('long') && !localStorage.getItem('lat')) {
                              this.$router.push("/ubicacion/cargar");
                              
                          }
                        })
                  

                 })            
            },
            error => {
              this.loading = false;
              this.message =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
            }
          );
        } 
        this.componentKey += 1;

    },
    ...mapActions({
      login: 'login',
      register: 'register',
      guardarUbicacion: 'guardarUbicacion',
    }),
   
  },

   mounted()   {
   
    },

    

}
</script>