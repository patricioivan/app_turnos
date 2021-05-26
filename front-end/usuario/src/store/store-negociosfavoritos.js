import Vue from 'vue'
import axios from 'axios'
import { Notify } from 'quasar'

if(localStorage.getItem('user_cliente'))
{
const user = JSON.parse(localStorage.getItem('user_cliente'));

axios.defaults.headers.common['x-auth'] = user.token;
}
  const state = { // data
    negociosFavoritos: [

    ]
  };

const getters = { // computed properties
    // getter (state, getters)
    negociosFavoritos: (state) => {
        return state.negociosFavoritos
    }
  };

  const actions = { // actions store methods
    // action (context)
    loadNegociosFavoritos: ({commit}) => {
        
      axios.get('http://ec2-18-235-243-39.compute-1.amazonaws.com:3000/api/usuarios/favoritos')
          .then(response => response.data.favoritos)
          .then(favoritos => {
            commit('setNegociosFavoritosToState', favoritos)
          })
    },
  };

  const mutations = {
    // mutation (state, payload)
    setNegociosFavoritosToState (state, favoritos) {
      state.negociosFavoritos = favoritos

    },
  };

export default {
    state,
    mutations,
    actions,
    getters,
}