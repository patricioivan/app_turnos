<template>
 <div class="column q-pa-lg">
      <div class="row">
        <q-card square class="shadow-24" style="width:300px;height:485px;">
          <q-card-section class="bg-deep-purple-7">
            <h4 class="text-h5 text-white q-my-md">Soporte Turnos</h4>
          </q-card-section>
          <q-card-section>
            <q-form  @submit.prevent="handleLogin" class="q-px-sm q-pt-xl">
              <q-input 
              square 
              clearable
               lazy-rules
              :rules="[val => isValidEmail(val) || 'Escriba un email correcto']" 
              v-model="user.email" 
              type="email" 
              label="Email">
                <template v-slot:prepend>
                  <q-icon name="email" />
                </template>
              </q-input>
              <q-input 
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Escriba su contraseña']"
              square 
              clearable 
              v-model="user.password" 
              type="password" 
              label="Password">
                <template v-slot:prepend>
                  <q-icon name="lock" />
                </template>
              </q-input>
               <q-card-actions class="q-px-lg q-py-lg">
                <q-btn type="submit" unelevated size="lg" color="purple-4" class="full-width text-white" label="Iniciar sesion" />
              </q-card-actions>
            </q-form>
          </q-card-section>
         
        </q-card>
      </div>
   </div>

</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex'
export default {
  
  name: 'Login',
  data() {
    return {
      user: {
          email:'',
          password:'',
      },
      loading: false,
      message: ''
    };
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
            ...mapActions({
      login: 'login',
    }),
    isValidEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
         return re.test(String(email).toLowerCase());
      },
    handleLogin() {
      this.loading = true;
        if (this.user.email && this.user.password) {
          this.login(this.user).then(
            () => {            
                 this.$router.push('/rubro/crear');
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

    }
  }
};
</script>


