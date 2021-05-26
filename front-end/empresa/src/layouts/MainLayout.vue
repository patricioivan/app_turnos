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
          Empresa Turnos App
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
        inline-label
        >
          <q-route-tab 
          name="verificar"
          label="QR" 
          icon="qr_code_scanner" 
          to="/verificar-turnos"/>
          <q-route-tab 
          name="negocios" 
          label="Negocios" 
          icon="store" 
          to="/mis-negocios"/>
          <q-btn-dropdown auto-close stretch flat icon="more" label="Más...">
            <q-list bordered>
              <q-item 
              clickable 
              v-ripple
              to="/"
              >
                <q-item-section avatar>
                  <q-icon color="primary" name="business" />
                </q-item-section>

                <q-item-section>Mi empresa</q-item-section>
              </q-item>

              <q-item 
              clickable 
              v-ripple
              to="/estadisticas"
              >
                <q-item-section avatar>
                  <q-icon 
                  color="primary" 
                  name="trending_up" 
                  />
                </q-item-section>

                <q-item-section>Estadisticas</q-item-section>
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
import EssentialLink from 'components/EssentialLink.vue'
import {mapState, mapGetters, mapActions} from 'vuex'
const linksData = [

  {
    title: 'Mi Empresa',

    icon: 'business',
    link: '/'
  },

  {
    title: 'Mis Negocios',
    icon: 'store',
    link: '/mis-negocios'
  },

  {
    title: 'Estadisticas',
    
    icon: 'trending_up',
    link: '/estadisticas'
  },

  {
    title: 'Verificar Turnos',

    icon: 'qr_code_scanner',
    link: '/verificar-turnos'
  },

 
];

export default {
  
  name: 'MainLayout',
  components: { EssentialLink },
  data () {
    return {
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
    logoutRedirect() {
      this.logout();
      this.$router.push("/login");  
    },
    loggedOut() {
      this.$store.state.auth.logout;
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
