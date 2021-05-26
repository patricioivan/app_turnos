<template>
    <q-item 
      class="q-p-2"
       clickable
       v-ripple
       :to="{ name: 'empresa.show', params: { id: empresa._id }}"
       >
        <q-item-section>{{empresa.razonSocial}} </q-item-section>
        <q-item-section>{{empresa.nombre}}</q-item-section>
        <q-item-section>{{empresa.cuil}} </q-item-section>
         <q-item-section>{{empresa.email}} </q-item-section>
        <!-- <q-item-section>{{empresa.direccion.calle}} {{empresa.direccion.numero}}</q-item-section> -->
        <q-item-section avatar>
          <q-icon color="primary" name="view_list" />
        </q-item-section>
      </q-item>
</template>

<script>
export default {
    props: ['empresa','id']
}
</script>