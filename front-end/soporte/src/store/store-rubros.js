import Vue from 'vue'
import axios from 'axios'
import { Notify } from 'quasar'

if(localStorage.getItem('user'))
{
const user = JSON.parse(localStorage.getItem('user'));

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

    submitRubro: async ({dispatch}, rubro) => { 
      try {
        const response = await axios
        .post('http://ec2-18-235-243-39.compute-1.amazonaws.com:3000/api/rubros', 
        { 
                nombre: rubro.nombre
        })

        dispatch('loadRubros', response.data)

        Notify.create({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Rubro Agregado Correctamente' 
        })

      } catch (error) {
        Notify.create({
          color: 'red-4',
          textColor: 'white',
          icon: 'error',
          message: error.response.data.mensaje
        })
      }
    }
  };

  const mutations = {
    // mutation (state, payload)
    setNewRubroToState(state, rubro)
    {
      state.rubros =  Vue.set(state.rubros, rubro)
    },
    setRubroToState (state, rubros) {
      state.rubros = rubros
    },
    addRubro (state, rubro) {
      Vue.set(state.rubros, 'nombre', rubro.nombre)
    }
  };

export default {
    state,
    mutations,
    actions,
    getters,
}