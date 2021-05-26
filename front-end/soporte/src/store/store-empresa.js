import Vue from 'vue'
import axios from 'axios'
import { Notify } from 'quasar'

if(localStorage.getItem('user'))
{
const user = JSON.parse(localStorage.getItem('user'));

axios.defaults.headers.common['x-auth'] = user.token;
}
  const state = { // data
    empresa: {

    }
  };

const getters = { // computed properties
    // getter (state, getters)
    empresa: (state) => {
        return state.empresa
    }
  };

  const actions = { // actions store methods
    // action (context)
    loadEmpresa: ({commit}, id) => {
      axios.get('http://ec2-18-235-243-39.compute-1.amazonaws.com:3000/api/empresas/datos/'+id)
          .then(response => response.data.empresa)
          .then(empresa => {
            commit('setEmpresaToState', empresa)
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
    setEmpresaToState (state, empresa) {
      state.empresa = empresa
    },
  };

export default {
    state,
    mutations,
    actions,
    getters,
}