<template>
 <div class="q-pa-lg row items-start q-gutter-md">
     <q-card class="full-height full-width my-card" flat bordered>
        <q-carousel
        swipeable
        animated
        v-model="slide"
        thumbnails
        infinite
        >
        
        <q-carousel-slide :name="1" img-src="https://img.lagaceta.com.ar/fotos/notas/2019/02/20/universidad-norte-santo-tomas-aquino-unsta-798549-100014.jpg">
        </q-carousel-slide>
        <q-carousel-slide :name="2" img-src="https://upload.wikimedia.org/wikipedia/commons/2/2c/UNSTA_SEDE_CAMPUS_YERBA_BUENA_II.JPG" />
        <q-carousel-slide :name="3" img-src="https://www.elmiradordiario.com.ar/elmirador/fotos/notas/2015/10/05/83048_20151005114015.jpg" />
        
        </q-carousel>

      <q-card-section>
        <div class="text-overline text-orange-9">UNSTA</div>
        <div class="text-h5 q-mt-sm q-mb-xs">Soportes Turnos App</div>
        <div class="text-caption text-grey">
          UNSTA Soportes Turnos App es una aplicación multi plataforma para el soporte de la aplicación Turnos App, encargada de administrar los datos necesarios para el funcionamiento de la misma.
        </div>
      </q-card-section>

      <q-card-actions>
        <div v-if="!this.$store.state.auth.status.loggedIn">
          <q-btn flat color="dark" label="Login" to="/login" />
        </div>
        <q-btn flat color="primary" type="a" href="https://www.unsta.edu.ar/" target="_blank" label="UNSTA Web"/>


        <q-space />
        
        <q-btn
          color="grey"
          round
          flat
          dense
          :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
          @click="expanded = !expanded"
        />
      </q-card-actions>

      <q-slide-transition>
        <div v-show="expanded">
          <q-separator />
          <q-card-section class="text-subitle2">
          Desarrollado por Carrasco Florencia, Ivan Patricio, Moreno Facundo.
          </q-card-section>
        </div>
      </q-slide-transition>
    </q-card>
</div>
</template>

<script>
export default {
  data () {
    return {
      expanded:false,
      slide: 1
    }
  }
}
</script>

<style lang="sass" scoped>
.custom-caption
  text-align: center
  padding: 12px
  color: white
  background-color: rgba(0, 0, 0, .3)
</style>