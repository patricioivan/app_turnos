<template>
  <q-page>
        <q-card>
       <q-card-section> 
      <div class=" fit row wrap justify-start items-start content-start">
         <q-list class="bg-grey-10 text-white shadow-2 rounded-borders" style=" width: 100%;">
            <q-item>
              <q-item-section avatar>
                <q-avatar>
                  <q-icon name="business" color="white" />
                </q-avatar>
              </q-item-section>
              <q-item-section>Mis Negocios</q-item-section>
            </q-item>
          </q-list>
        <negocio
          v-for="(negocio,componentKey) in negocios"
          :key="componentKey"
          :negocio="negocio"
          >
        </negocio>
      </div>
       </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex'
export default {
  name: 'PageIndex',
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
    components: {
    'negocio' : require('components/Negocio.vue').default,
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

   
  },
  mounted() {
        this.loadNegocios()
    },

}

</script>
