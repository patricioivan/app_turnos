import Vue from 'vue'
import axios from 'axios'
import { Notify } from 'quasar'

if(localStorage.getItem('user_empresa'))
{
const user = JSON.parse(localStorage.getItem('user_empresa'));

axios.defaults.headers.common['x-auth'] = user.token;
}
  const state = { // data
    negocios: [

    ],
    negocios_empresa : [

    ]
  };

const getters = { // computed properties
    // getter (state, getters)
    negocios: (state) => {
        return state.negocios
    },
    negocios_empresa: (state) => {
      return state.negocios_empresa
    }
  };

  const actions = { // actions store methods
    // action (context)
    loadNegocios: ({commit}) => {
      const long = localStorage.getItem('long');
      const lat = localStorage.getItem('lat');
      axios.get('http://ec2-18-235-243-39.compute-1.amazonaws.com:3000/api/empresas/negocios-propios')
          .then(response => response.data.negocios)
          .then(negocios => {
            commit('setNegociosToState', negocios)
          })
          .catch((error) => {
        })
    },
    loadNegociosEmpresa: ({commit}, id) => {
      axios.get('http://ec2-18-235-243-39.compute-1.amazonaws.com:3000/api/negocios/'+id+'/otras-sucursales')
          .then(response => response.data.negocios)
          .then(negocios => {
            commit('setNegociosEmpresaToState', negocios)
          })
          .catch((error) => {
            console.log("error:" , error.response)
        })
      }
   
  };

  const mutations = {
    // mutation (state, payload)
    setNegociosToState (state, negocios) {
      state.negocios = negocios

    },
    setNegociosEmpresaToState (state, negocios_empresa) {
      state.negocios_empresa = negocios_empresa
    }
  };

export default {
    state,
    mutations,
    actions,
    getters,
}