import Vue from 'vue'
import axios from 'axios'
import { Notify } from 'quasar'

if(localStorage.getItem('user_cliente'))
{
const user = JSON.parse(localStorage.getItem('user_cliente'));

axios.defaults.headers.common['x-auth'] = user.token;
}
  const state = { // data
    negocios_buscados: [

    ]
  };

const getters = { // computed properties
    // getter (state, getters)
    negocios_buscados: (state) => {
        return state.negocios_buscados
    }
  };

  const actions = { // actions store methods
    // action (context)
    loadNegociosBuscado: ({commit}, query) => {
      const long = localStorage.getItem('long');
      const lat = localStorage.getItem('lat');
      axios.get('http://ec2-18-235-243-39.compute-1.amazonaws.com:3000/api/negocios/buscar?long='+long+'&lat='+lat+'&dato='+query)
          .then(response => response.data.negocios)
          .then(negocios => {
            commit('setNegociosBuscadosToState', negocios)
          })
          .catch((error) => {
            
        })
    },
    loadNegocioPorRubro:  ({commit}, id) => {
      const long = localStorage.getItem('long');
      const lat = localStorage.getItem('lat');
      axios.get('http://ec2-18-235-243-39.compute-1.amazonaws.com:3000/api/rubros/'+id+'/negocios?long='+long+'&lat='+lat)
          .then(response => response.data.negocios)
          .then(negocios => {
            commit('setNegociosBuscadosToState', negocios)
          })
          .catch((error) => {
            
        })
  }
};
  const mutations = {
    // mutation (state, payload)
    setNegociosBuscadosToState (state, negocios_buscados) {
      state.negocios_buscados = negocios_buscados
    },
  };

export default {
    state,
    mutations,
    actions,
    getters,
}