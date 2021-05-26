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
          Turnos App
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
          name="Mis Turnos"
          label="Turnos" 
          icon="list_alt" 
          to="/turnos"/>
          <q-route-tab 
          name="Inicio" 
          label="Inicio" 
          icon="play_for_work" 
          to="/"/>
          <q-btn-dropdown auto-close stretch flat icon="more" label="Más...">
            <q-list bordered>
              <q-item 
              clickable 
              v-ripple
              to="/perfil"
              >
                <q-item-section avatar>
                  <q-icon color="primary" name="perm_identity" />
                </q-item-section>

                <q-item-section>Perfil</q-item-section>
              </q-item>

              <q-item 
              clickable 
              v-ripple
              to="/favoritos"
              >
                <q-item-section avatar>
                  <q-icon 
                  color="primary" 
                  name="star_border" 
                  />
                </q-item-section>

                <q-item-section>Favoritos</q-item-section>
              </q-item>

              <q-item 
              clickable 
              v-ripple
              to="/ubicacion/cargar"
              >
                <q-item-section avatar>
                  <q-icon 
                  color="primary" 
                  name="location_on" 
                  />
                </q-item-section>

              
                <q-item-section>Cambiar Ubicacion</q-item-section>
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
    title: 'Inicio',

    icon: 'play_for_work',
    link: '/'
  },

  {
    title: 'Mis Turnos',
    icon: 'list_alt',
    link: '/turnos'
  },

  {
    title: 'Favoritos',
    
    icon: 'star_border',
    link: '/favoritos'
  },

  {
    title: 'Perfil',
    
    icon: 'perm_identity',
    link: '/perfil'
  },

  {
    title: 'Actualizar Ubicacion',

    icon: 'add_location',
    link: '/ubicacion/cargar'
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
