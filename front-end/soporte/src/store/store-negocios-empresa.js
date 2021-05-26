import Vue from 'vue'
import axios from 'axios'
import { Notify } from 'quasar'

if(localStorage.getItem('user'))
{
const user = JSON.parse(localStorage.getItem('user'));

axios.defaults.headers.common['x-auth'] = user.token;
}
  const state = { // data
    negocios: [

    ]
  };

const getters = { // computed properties
    // getter (state, getters)
    negocios: (state) => {
        return state.negocios
    }
  };

  const actions = { // actions store methods
    // action (context)
    loadNegocios: ({commit}, id) => {
      axios.get('http://ec2-18-235-243-39.compute-1.amazonaws.com:3000/api/empresas/'+id+'/negocios')
          .then(response => response.data.negocios)
          .then(negocios => {
            commit('setNegociosToState', negocios)
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
    setNegociosToState (state, negocios) {
      state.negocios = negocios

    },
  };

export default {
    state,
    mutations,
    actions,
    getters,
}