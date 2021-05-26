<template>
<q-page>
  <div id="q-app">
    <div class="q-pa-md">
        <q-card class="my-card">
          <q-list class="bg-grey-10 text-white shadow-2 rounded-borders" style=" width: 100%;">
            <q-item>
              <q-item-section avatar>
                <q-avatar>
                  <q-icon name="person_add" color="white" />
                </q-avatar>
              </q-item-section>
              <q-item-section>Agregar Nuevo Usuario</q-item-section>
            </q-item>
          </q-list>
      <q-card-section>
        <q-form
          @submit="onSubmit"
          class="q-gutter-lg "
          >
          <q-input 
            class="size-lg"
            color="positive"
            name="name"
            v-model="user.nombre"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Por favor escriba el nombre del usuario que quiere agregar']"
            label="Nombre del usuario"
            ref="name">
                <template v-slot:prepend>
                <q-icon name="person" color="primary" />
                </template>
          </q-input>
          <q-input 
            class="size-lg"
            color="positive"
            name="apellido"
            v-model="user.apellido"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Por favor escriba el apellido del usuario que quiere agregar']"
            label="Apellido"
            ref="last_name">
                <template v-slot:prepend>
                <q-icon name="person" color="primary" />
                </template>
          </q-input>
          <q-input 
            class="size-lg"
            color="positive"
            name="documento"
   
            v-model="user.documento"
            v-mask="'#########'"
            lazy-rules
            :rules="[ val => val && val.length > 7 || 'DNI debe tener 8 caracteres']"
            label="Documento"
            ref="dni">
                <template v-slot:prepend>
                <q-icon name="contact_page" color="primary" />
                </template>
          </q-input>

           <q-input 
            class="size-lg"
            color="positive"
            name="name"
  
            v-model="user.celular"
            v-mask="'#############'"
            lazy-rules
            :rules="[ val => val && val.length > 6 || 'Telefono debe tener un minimo de 7 caracteres']"
            label="Telefono Celular"
            ref="phone">
                <template v-slot:prepend>
                <q-icon name="stay_current_portrait" color="primary" />
                </template>
          </q-input>

            <q-input 
            class="size-lg"
            color="positive"
            name="email"
            type="email"
            v-model="user.email"
             lazy-rules
            :rules="[val => isValidEmail(val) || 'Escriba un email correcto']"
            label="Email"
            ref="email">
                <template v-slot:prepend>
                <q-icon name="email" color="primary" />
                </template>
          </q-input>

          <q-input 
            class="size-lg"
            color="positive"
            name="name"
            type="password"
            v-model="user.password"
            lazy-rules
            :rules="[ val => val && val.length > 7 || 'Contraseña minima de 8 caracteres']"
            label="Contraseña"
            ref="password">
                <template v-slot:prepend>
                <q-icon name="vpn_key" color="primary" />
                </template>
          </q-input>

          <q-select 
           v-model="user.admin" 
           :options="options" 
           color="positive"
           :value="options"
           label="¿Este usuario es admin?"
          :rules="[val => val || 'Es necesario que seleccione el rol del usuario']"
           option-label="label" option-value="value"
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

import {mapState, mapGetters, mapActions} from 'vuex'
import Vue from 'vue'
import VueMask from 'v-mask'
Vue.use(VueMask); 

export default {
  name: 'Register',
  data () {
    return {
      componentKey: 0,
      user: {
        nombre: '',
        apellido:'',
        documento: '',
        celular: '',
        email: '',
        password: '',
        admin: '',
        password:'',
        
      },
      options: [
      {
        label: 'Si',
        value: true
      },
      {
        label: 'No',
        value: false
      }
      
      ]
    }
  },
  computed: {
     loggedIn() {
      return this.$store.state.auth.status.loggedIn;
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
  },
    
  methods: {
    async onSubmit () {
        const response = await this.register(this.user)
        if(response) {
          this.$router.push("/user/"+response.data.soporte._id);  

        }
    },
    
    ...mapActions({
      register: 'register',
    }),
       isValidEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
         return re.test(String(email).toLowerCase());
      },
  },

   mounted()   {
   
    },

    

}
</script>

