<template>
<div>
  <!-- <q-item class="q-pa-md" v-ripple>
       

        <q-item-section>
          <q-item-label caption>
            <span class="text-weight-bold text-capitalize">{{calificacion.usuario.nombre}} {{calificacion.usuario.apellido}}:</span>
            <span v-if="calificacion.comentario"> {{calificacion.comentario}}</span>
          </q-item-label>
          <q-item-label caption >
              <span class="text-weight-bold text-capitalize">Calificacion: </span>
            <q-rating
              class="q-pb-sm"
              :value="calificacion.rating"
              size="1.5em"
              color="orange"
              readonly
                />
          </q-item-label>
        </q-item-section>
  </q-item> -->

         <q-item>
        <q-item-section>
          <q-item-label>{{calificacion.usuario.nombre}} {{calificacion.usuario.apellido}}</q-item-label>
          <q-item-label caption>{{calificacion.comentario}}</q-item-label>
        </q-item-section>

        <q-item-section side top>
           <q-rating
              class="q-pb-sm"
              :value="calificacion.rating"
              size="1.0em"
              color="orange"
              readonly
                />
        </q-item-section>
      </q-item>

      <q-separator spaced inset />

</div>
</template>

<script>
export default {
      props: ['calificacion'],

}
</script>

<style>

</style>