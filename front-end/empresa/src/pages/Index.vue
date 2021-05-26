<template>
<q-page>
  <div id="q-app">
    <div class="q-pa-md">
     <q-card class="my-card">
      <q-card-section class="bg-black text-white">
        <div class="text-h6"><q-icon name="person" /><span class="q-pa-md">{{empresa.nombre}}</span></div>
      </q-card-section>
      <q-separator />
        <q-card-section>
    <q-list bordered>
      <q-item v-ripple>
        <q-item-section avatar>
          <q-icon color="warning" name="dns" />
        </q-item-section>
        <q-item-section>
            <q-item-label caption>Razon Social</q-item-label>
            {{empresa.razonSocial}}
        </q-item-section>
      </q-item>
       <q-separator />
      <q-item v-ripple>
        <q-item-section avatar>
          <q-icon color="primary" name="email" />
        </q-item-section>
        <q-item-section>
            <q-item-label caption>Email</q-item-label>
            {{empresa.email}}
        </q-item-section>
      </q-item>
      <q-separator />
      <q-item v-ripple>
        <q-item-section avatar>
          <q-icon color="secondary" name="chrome_reader_mode" />
        </q-item-section>
        <q-item-section>
            <q-item-label caption>CUIL</q-item-label>
            {{empresa.cuil}}
        </q-item-section>
      </q-item>
       <q-separator />

      <q-item v-ripple>
        <q-item-section avatar>
          <q-icon color="deep-orange" name="add_road" />
        </q-item-section>
        <q-item-section>
          <div v-if="empresa.direccion">
            <q-item-label caption>Dirección</q-item-label>
            {{empresa.direccion.provincia}} - {{empresa.direccion.localidad}} - {{empresa.direccion.calle}} {{empresa.direccion.numero}}
         </div>
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
  name: 'Index',
  data () {
    return {
      componentKey: 0,
    }
  },
   computed: {

     ...mapState({
      empresa: state => state.empresa,
    }),
    ...mapGetters(['empresa']),
    
    },
  methods: {
        ...mapActions({
      loadEmpresa: 'loadEmpresa',
    }),
  },
  mounted() {
    
      this.loadEmpresa(this.$route.params.id)
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

