<template>
<q-page>
  <div id="q-app">
    <div class="q-pa-md">
     <q-card class="my-card">
      <q-card-section class="bg-black text-white">
        <div class="text-h6"><q-icon name="person" /><span class="q-pa-md">Usuario</span></div>
      </q-card-section>
      <q-separator />
        <q-card-section>
    <q-list bordered>
      <q-item v-ripple>
        <q-item-section avatar>
          <q-icon color="secondary" name="person" />
        </q-item-section>

        <q-item-section>
              <q-item-label caption>Nombre</q-item-label>
            {{usuario.nombre}}
          
        </q-item-section>
      </q-item>
      <q-item v-ripple>
        <q-item-section avatar>
          <q-icon color="dark" name="font_download" />
        </q-item-section>

        <q-item-section>
              <q-item-label caption>Apellido</q-item-label>
            {{usuario.apellido}}
          
        </q-item-section>
      </q-item>
      <q-item v-ripple>
        <q-item-section avatar>
          <q-icon color="primary" name="email" />
        </q-item-section>

        <q-item-section>
              <q-item-label caption>Email</q-item-label>
            {{usuario.email}}
          
        </q-item-section>
      </q-item>
    </q-list>
 
        </q-card-section>        

      <q-card-section align="right">
        
      </q-card-section>
    </q-card>
    </div>
 
  </div>
</q-page>
</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex'

export default {
  name: 'ShowUsuario',
  data () {
    return {
      componentKey: 0,
    }
  },
   computed: {

     ...mapState({
      usuario: state => state.usuario,
    }),
    ...mapGetters(['usuario']),
    
    },
  methods: {
        ...mapActions({
      loadUsuario: 'loadUsuario',
    }),
  },
  mounted() {
      this.loadUsuario()
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

