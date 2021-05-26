<template>
    <q-input 
            class="size-lg"
            color="positive"
            name="name"
            v-model="empresa.razonSocial"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Por favor escriba la razon social de la empresa']"
            label="Razon Social empresa"
            ref="razonSocial">
                <template v-slot:prepend>
                <q-icon name="add_business" color="primary" />
                </template>
          </q-input>
</template>

<script>
export default {
    props: ['empresa','id']
}
</script>