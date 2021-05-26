import Vue from 'vue'
import axios from 'axios'
import { Notify } from 'quasar'

if(localStorage.getItem('user'))
{
const user = JSON.parse(localStorage.getItem('user'));

axios.defaults.headers.common['x-auth'] = user.token;
}
  const state = { // data
    feriados: [

    ]
  };

const getters = { // computed properties
    // getter (state, getters)

    feriados: (state) => {
      return state.feriados
    }
  };

  const actions = { // actions store methods
  loadFeriados: async ({commit}, id) => {
      try {
          const dias = await axios.get('http://ec2-18-235-243-39.compute-1.amazonaws.com:3000/api/negocios/'+id+'/dias-no-laborales')
          commit('setFeriadosToState', dias)
      }
      catch(error) {
          Notify.create({
            color: 'red-4',
            textColor: 'white',
            icon: 'error',
            message: error.response.data.mensaje
        })
      }
    },
  }

  const mutations = {
    // mutation (state, payload)
    setFeriadosToState (state, feriados) {
      state.feriados = feriados
    },
    
  };

export default {
    state,
    mutations,
    actions,
    getters,
}