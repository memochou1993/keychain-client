import axios from 'axios';
import qs from 'qs';

export default {
  namespaced: true,
  state: {
    keys: [],
    key: null,
    pages: 1,
    unlockKey: false,
    editKey: false,
    unlockedKeys: [],
    visibleKeys: [],
    selectedKey: null,
    unlockDialog: false,
    editDialog: false,
  },
  mutations: {
    setKeys(state, keys) {
      state.keys = keys;
    },
    setKey(state, key) {
      state.key = key;
    },
    setPages(state, pages) {
      state.pages = pages;
    },
    setUnlockKey(state, unlockKey) {
      state.unlockKey = unlockKey;
    },
    setEditKey(state, editKey) {
      state.editKey = editKey;
    },
    setUnlockedKeys(state, unlockedKeys) {
      state.unlockedKeys = unlockedKeys;
    },
    setVisibleKeys(state, visibleKeys) {
      state.visibleKeys = visibleKeys;
    },
    setSelectedKey(state, selectedKey) {
      state.selectedKey = selectedKey;
    },
    setUnlockDialog(state, unlockDialog) {
      state.unlockDialog = unlockDialog;
    },
    setEditDialog(state, editDialog) {
      state.editDialog = editDialog;
    },
  },
  actions: {
    fetchKeys({ commit }, { params }) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'GET',
          url: '/users/me/keys',
          params,
        })
          .then(({ data }) => {
            setTimeout(() => {
              commit('setKeys', data.data);
              commit('setPages', data.meta.last_page);
            }, 250);
            resolve(data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    fetchKey({ state, commit }, { selectedkey, params }) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'POST',
          url: `/users/me/keys/${selectedkey.id}`,
          data: qs.stringify(params),
        })
          .then(({ data }) => {
            commit('setKey', data.data);
            commit('setUnlockedKeys', state.unlockedKeys.concat(data.data.id));
            if (state.unlockKey) {
              commit('setVisibleKeys', state.visibleKeys.concat(data.data.id));
            }
            if (state.editKey) {
              commit('setEditDialog', true);
            }
            resolve(data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    destroyKey({ state, commit }, { selectedkey }) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'DELETE',
          url: `/users/me/keys/${selectedkey.id}`,
        })
          .then(({ data }) => {
            commit('setKeys', state.keys.filter(key => key.id !== selectedkey.id));
            commit('setUnlockedKeys', state.unlockedKeys.filter(visibleKey => visibleKey !== selectedkey.id));
            commit('setVisibleKeys', state.visibleKeys.filter(unlockedKey => unlockedKey !== selectedkey.id));
            resolve(data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    setUnlockedKeys({ commit }, unlockedKeys) {
      commit('setUnlockedKeys', unlockedKeys);
    },
    setUnlockKey({ commit }, unlockKey) {
      commit('setUnlockKey', unlockKey);
    },
    setEditKey({ commit }, editKey) {
      commit('setEditKey', editKey);
    },
    setVisibleKeys({ commit }, visibleKeys) {
      commit('setVisibleKeys', visibleKeys);
    },
    setSelectedKey({ commit }, selectedKey) {
      commit('setSelectedKey', selectedKey);
    },
    setUnlockDialog({ commit }, unlockDialog) {
      commit('setUnlockDialog', unlockDialog);
    },
    setEditDialog({ commit }, editDialog) {
      commit('setEditDialog', editDialog);
    },
  },
};
