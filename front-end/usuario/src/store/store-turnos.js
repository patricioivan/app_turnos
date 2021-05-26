import Vue from 'vue'
import axios from 'axios'
import { Notify } from 'quasar'
import * as qrcode from 'qrcode';

if(localStorage.getItem('user_cliente'))
{
const user = JSON.parse(localStorage.getItem('user_cliente'));

// axios.defaults.headers.common['x-auth'] = user.token;
}
  const state = { // data
    turnosActivos: [
     
    ],
    turnosExpirados: [
     
    ],
    turnosCancelados: [
     
    ],
    turnosUtilizados: [
     
    ]
  };

const getters = { // computed properties
    // getter (state, getters)
    turnosActivos: (state) => {
        return state.turnosActivos
    },
    turnosExpirados: (state) => {
        return state.turnosExpirados
    },
    turnosCancelados: (state) => {
        return state.turnosCancelados
    },
    turnosUtilizados: (state) => {
        return state.turnosUtilizados
    },
  };

  const actions = { // actions store methods
    // action (context)
    loadTurnosActivos: ({commit}) => {
      axios
        .get('http://ec2-18-235-243-39.compute-1.amazonaws.com:3000/api/usuarios/turnos/activos')
        .then(response => response.data.turnosActivos)
        .then(turnos => {
          if (turnos) {
            turnos.forEach( async (turno) => {
                const codeURL = await qrcode.toDataURL(turno._id)
                turno.codeURL = codeURL;
            })

          }
          commit('setTurnoActivadoToState', turnos)
        })
    },
    loadTurnosCancelados: ({commit}) => {
        axios
          .get('http://ec2-18-235-243-39.compute-1.amazonaws.com:3000/api/usuarios/turnos/cancelados')
          .then(response => response.data.turnos)
          .then(turnos => {
            commit('setTurnoCanceladoToState', turnos)
          })
      },
      loadTurnosExpirados: ({commit}) => {
        axios
          .get('http://ec2-18-235-243-39.compute-1.amazonaws.com:3000/api/usuarios/turnos/expirados')
          .then(response => response.data.turnos)
          .then(turnos => {
            commit('setTurnoExpiradoToState', turnos)
          })
      },
      loadTurnosUtilizados: ({commit}) => {
        axios
          .get('http://ec2-18-235-243-39.compute-1.amazonaws.com:3000/api/usuarios/turnos/usados')
          .then(response => response.data.turnos)
          .then(turnos => {
            commit('setTurnoUtilizadoToState', turnos)
          })
      },
  
  };

  const mutations = {
    // mutation (state, payload)
    setTurnoActivadoToState (state, turno) {
      state.turnosActivos = turno
    },
    setTurnoCanceladoToState (state, turno) {
        state.turnosCancelados = turno
      },
      setTurnoExpiradoToState (state, turno) {
        state.turnosExpirados = turno
      },
      setTurnoUtilizadoToState (state, turno) {
        state.turnosUtilizados = turno
      },
  };

export default {
    state,
    mutations,
    actions,
    getters,
}