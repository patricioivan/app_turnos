import Vue from 'vue'
import axios from 'axios'
import { Notify } from 'quasar'

if(localStorage.getItem('user'))
{
const user = JSON.parse(localStorage.getItem('user'));

axios.defaults.headers.common['x-auth'] = user.token;
}
  const state = { // data
    usuarios: [
      
    ]
      
    
    
  };

const getters = { // computed properties
    // getter (state, getters)
    usuarios: (state) => {
        return state.usuarios
    }
  };

  const actions = { // actions store methods
    // action (context)
    loadUsuarios: ({commit}, query) => {
      if (!query) {
        query = '';
      }
      axios.get('http://ec2-18-235-243-39.compute-1.amazonaws.com:3000/api/soportes/buscar?dato='+query)
          .then(response => response.data.soportes)
          .then(soportes => {
            commit('setUsuarioToState', soportes)
          })
          .catch((error) => {
            Notify.create({
              color: 'red-4',
              textColor: 'white',
              icon: 'error',
              message: error.response.data.mensaje
          })
        })
    },
  };

  const mutations = {
    // mutation (state, payload)
    setUsuarioToState (state, usuarios) {
      state.usuarios = usuarios
    },
  };

export default {
    state,
    mutations,
    actions,
    getters,
}