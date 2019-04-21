import axios from 'axios';
import cookie from 'vue-cookie';

export default {
  namespaced: true,
  state: {
    user: null,
    loaded: false,
    payload: cookie.get('payload'),
  },
  getters: {
    authentication(state) {
      if (!state.payload) {
        return null;
      }
      return JSON.parse(window.atob(state.payload));
    },
    authorization(state, getters) {
      if (!getters.authentication) {
        return null;
      }
      return `${getters.authentication.data.token_type} ${getters.authentication.data.access_token}`;
    },
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setLoaded(state, loaded) {
      state.loaded = loaded;
    },
    setPayload(state, payload) {
      state.payload = payload;
    },
  },
  actions: {
    fetchToken({
      commit, rootState,
    }, { params }) {
      commit('setLoaded', false);
      return new Promise((resolve, reject) => {
        axios({
          method: 'POST',
          url: '/auth/login',
          data: params,
        })
          .then(({ data }) => {
            const payload = window.btoa(JSON.stringify({
              data,
              created_at: Date.now(),
            }));
            const keep = JSON.parse(localStorage.getItem('keep'));
            let expires = null;
            if (keep && keep.enabled) {
              const date = new Date(parseInt(keep.created_at, 10));
              date.setDate(date.getDate() + rootState.settings.auth.keep);
              expires = {
                expires: date,
              };
            }
            cookie.set('payload', payload, expires);
            commit('setPayload', payload);
            resolve(data);
          })
          .catch((error) => {
            commit('setError', error, { root: true });
            reject(error);
          })
          .finally(() => {
            commit('setLoaded', true);
          });
      });
    },
    destroyToken({
      getters, commit,
    }) {
      commit('setLoaded', false);
      return new Promise((resolve, reject) => {
        axios({
          method: 'POST',
          url: '/auth/logout',
          headers: {
            Authorization: getters.authorization,
          },
        })
          .then(({ data }) => {
            cookie.delete('payload');
            commit('setPayload', null);
            resolve(data);
          })
          .catch((error) => {
            commit('setError', error, { root: true });
            reject(error);
          })
          .finally(() => {
            commit('setLoaded', true);
          });
      });
    },
    fetchUser({
      getters, commit,
    }) {
      commit('setLoaded', false);
      return new Promise((resolve, reject) => {
        axios({
          method: 'GET',
          url: '/auth/user',
          headers: {
            Authorization: getters.authorization,
          },
        })
          .then(({ data }) => {
            commit('setUser', data.data);
            resolve(data);
          })
          .catch((error) => {
            commit('setError', error, { root: true });
            reject(error);
          })
          .finally(() => {
            commit('setLoaded', true);
          });
      });
    },
  },
};
