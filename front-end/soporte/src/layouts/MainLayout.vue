<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
           <q-avatar size="24px">
              <img src="https://i.ibb.co/sjZFtxS/Soporte-Turnos-1-brand-usage-10-created-by-logaster.png">
           </q-avatar>
          Soporte Turnos App
        </q-toolbar-title>
          <div v-if="loggedIn">
          <q-btn 
          @click=logoutRedirect()
          flat 
          icon-right="account_circle" 
          label="Logout" />
          </div>
          <div v-else>
          <q-btn 
          
          to="/login"
          flat 
          icon-right="account_circle" 
          label="Login" />
          </div>
   
        
        


      </q-toolbar>
    </q-header>

    <q-footer class="q-footer">
        <q-tabs
        outside-arrows
        mobile-arrows
        inline-label
        >
          <q-route-tab 
          name="agregar_rubro"
          label="Rubro" 
          icon="add_task" 
          to="/rubro/crear"/>
          <q-route-tab 
          name="agregar_empresa" 
          label="Empresa" 
          icon="add_business" 
          to="/empresa/crear"/>
          <q-btn-dropdown auto-close stretch flat icon="more" label="Más...">
            <q-list bordered>
              <q-item 
              clickable 
              v-ripple
              to="/empresa/buscar"
              >
                <q-item-section avatar>
                  <q-icon color="primary" name="find_in_page" />
                </q-item-section>

                <q-item-section>Buscar Empresa</q-item-section>
              </q-item>

              <q-item 
              clickable 
              v-ripple
              to="/registrar"
              >
                <q-item-section avatar>
                  <q-icon 
                  color="primary" 
                  name="person_add_alt_1" 
                  />
                </q-item-section>

                <q-item-section>Registrar Usuario</q-item-section>
              </q-item>

              <q-item 
              clickable 
              v-ripple
              to="/usuario/buscar"
              >
                <q-item-section avatar>
                  <q-icon 
                  color="primary" 
                  name="person_search" 
                  />
                </q-item-section>

              
                <q-item-section>Buscar Usuario</q-item-section>
              </q-item>


            </q-list>

            
          </q-btn-dropdown>
      </q-tabs>
    </q-footer>
    <q-drawer
      v-model="leftDrawerOpen"
      :breakpoint="767"
      show-if-above
      bordered
      content-class="bg-grey-1"
      
    >
      <q-list>
        <q-item-label
          header
          class="text-grey-8"
        >
          Menú
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import AuthService from '../services/auth.service.js';
import EssentialLink from 'components/EssentialLink.vue'
import {mapState, mapGetters, mapActions} from 'vuex'
const linksData = [
  {
    title: 'Home',
    
    icon: 'home',
    link:'/'
  },

  {
    title: 'Agregar Rubro',

    icon: 'add_task',
    link: '/rubro/crear'
  },

  {
    title: 'Agregar Empresa',
    icon: 'add_business',
    link: '/empresa/crear'
  },

  {
    title: 'Buscar Empresa',
    
    icon: 'find_in_page',
    link: '/empresa/buscar'
  },

  {
    title: 'Registrar Usuario',
    
    icon: 'person_add_alt_1',
    link: '/registrar'
  },

  {
    title: 'Buscar Usuario',
    
    icon: 'person_search',
    link: '/usuario/buscar'
  },
];

export default {

  name: 'MainLayout',
  components: { EssentialLink },
  data () {
    return {
      loginState:false,
      leftDrawerOpen: false,
      essentialLinks: linksData
    }
  },
  computed: {
    loggedIn() 
    {
      return this.$store.state.auth.status.loggedIn;
    },
    
  },
  
  methods: {
        ...mapActions({
      logout: 'logout',
      
    }),
    loggedOut() {
      this.$store.state.auth.logout;
    },

     logoutRedirect() {
      this.logout();
      this.$router.push("/login");  
    },
  },

}
</script>

<style>
@media screen and (min-width: 768px) {
  .q-footer {
    display:none;
  }
}
</style>
