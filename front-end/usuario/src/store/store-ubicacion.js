import Vue from 'vue'
import axios from 'axios'
import { Notify } from 'quasar'

if(localStorage.getItem('user_cliente'))
{
const user = JSON.parse(localStorage.getItem('user_cliente'));

axios.defaults.headers.common['x-auth'] = user.token;
}
  const state = { // data
    ubicacion: {
        long: '',
        lat: ''
    }
  };

const getters = { // computed properties
    // getter (state, getters)
    ubicacion: (state) => {
        return state.ubicacion
    }
  };

  const actions = { // actions store methods
    // action (context)
    guardarUbicacion: ({commit}, geolocation) => {
        console.log("geolocation:", geolocation);
        // state.ubicacion.lat = geolocation.coords.latitude
        // state.ubicacion.long = geolocation.coords.longitude
        localStorage.setItem('long', JSON.stringify(geolocation.coords.longitude));
        localStorage.setItem('lat', JSON.stringify(geolocation.coords.latitude));
       
        
        const long = localStorage.getItem('long');
        const lat = localStorage.getItem('lat');

        console.log('long:', long, 'lat:', lat)
        

    },
  };

  const mutations = {
    // mutation (state, payload)
    setUbicacion (state, ubicacion) {
      state.ubicacion = ubicacion
    },
  };

export default {
    state,
    mutations,
    actions,
    getters,
}