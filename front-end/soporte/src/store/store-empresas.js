import Vue from 'vue'
import axios from 'axios'
import { Notify } from 'quasar'

if(localStorage.getItem('user'))
{
const user = JSON.parse(localStorage.getItem('user'));

axios.defaults.headers.common['x-auth'] = user.token;
}
  const state = { // data
    empresas: [
      
    ]
      
    
    
  };

const getters = { // computed properties
    // getter (state, getters)
    empresas: (state) => {
        return state.empresas
    }
  };

  const actions = { // actions store methods
    // action (context)
    loadEmpresas: ({commit}, query) => {
      if (!query) {
        query = '';
      }
      
      axios.get('http://ec2-18-235-243-39.compute-1.amazonaws.com:3000/api/empresas/buscar?dato='+query)
          .then(response => response.data.empresas)
          .then(empresas => {
            commit('setEmpresaToState', empresas)
          })
          .catch((error) => {
              Notify.create({
              color: 'red-4',
              textColor: 'white',
              icon: 'error',
              timeout:1,
              message: error.response.data.mensaje,
          })
        })
    },
  };

  const mutations = {
    // mutation (state, payload)
    setEmpresaToState (state, empresas) {
      state.empresas = empresas
    },
  };

export default {
    state,
    mutations,
    actions,
    getters,
}