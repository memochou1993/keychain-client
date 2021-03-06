import axios from 'axios';
import moment from 'moment';
import cache from '@/helpers/cache';
import cookie from '@/helpers/cookie';

export default {
  namespaced: true,
  state: {
    user: null,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
  },
  actions: {
    fetchUser({
      commit, rootState, rootGetters,
    }) {
      commit('setLoaded', false, { root: true });
      return new Promise((resolve, reject) => {
        axios({
          method: 'GET',
          url: `/users/${rootState.auth.user.data.id}`,
          headers: {
            Authorization: rootGetters['auth/authorization'],
          },
        })
          .then(({ data }) => {
            setTimeout(() => {
              commit('setUser', data);
            }, 1000 * 0.25);
            resolve(data);
          })
          .catch((error) => {
            commit('setError', error, { root: true });
            reject(error);
          })
          .finally(() => {
            setTimeout(() => {
              commit('setLoaded', true, { root: true });
            }, 1000 * 0.25);
          });
      });
    },
    updateUser({
      commit, rootState, rootGetters,
    }, { params }) {
      commit('setLoaded', false, { root: true });
      return new Promise((resolve, reject) => {
        axios({
          method: 'PATCH',
          url: `/users/${rootState.auth.user.data.id}`,
          headers: {
            Authorization: rootGetters['auth/authorization'],
          },
          data: params,
        })
          .then(({ data }) => {
            setTimeout(() => {
              const date = rootGetters.defaultKeep
                ? moment(parseInt(rootState.settings.createdAt, 10)).add(rootGetters.defaultKeepDays, 'd').toDate()
                : null;
              cookie.set('user', data.data, date);
              commit('setUser', cookie.get('user'));
              commit('auth/setUser', cookie.get('user'), { root: true });
              cache.set('settings', JSON.parse(data.data.settings));
              commit('setSettings', cache.get('settings'), { root: true });
            }, 1000 * 0.25);
            resolve(data);
          })
          .catch((error) => {
            commit('setError', error, { root: true });
            reject(error);
          })
          .finally(() => {
            setTimeout(() => {
              commit('setLoaded', true, { root: true });
            }, 1000 * 0.25);
          });
      });
    },
  },
};
