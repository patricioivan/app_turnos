import Vue from 'vue'
import axios from 'axios'
import { Notify } from 'quasar'

if(localStorage.getItem('user_cliente'))
{
const user = JSON.parse(localStorage.getItem('user_cliente'));

// axios.defaults.headers.common['x-auth'] = user.token;
}
  const state = { // data
    rubros: [
     
    ]
  };

const getters = { // computed properties
    // getter (state, getters)
    rubros: (state) => {
        return state.rubros
    }
  };

  const actions = { // actions store methods
    // action (context)
    loadRubros: ({commit}) => {
      axios
        .get('http://ec2-18-235-243-39.compute-1.amazonaws.com:3000/api/rubros')
        .then(response => response.data.rubros)
        .then(rubros => {
          commit('setRubroToState', rubros)
        })
    },
  };

  const mutations = {
    // mutation (state, payload)
    setRubroToState (state, rubros) {
      state.rubros = rubros
    },
  };

export default {
    state,
    mutations,
    actions,
    getters,
}