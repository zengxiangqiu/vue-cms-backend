/* eslint-disable*/
import axios from 'axios'

const host = process.env.VUE_APP_ROOT_API + '/cms'
const state = () => ({

})

const actions = {
  Login: async (
    {commit}, user) => {
    return new Promise((resolve, reject) => {
      axios.post(host + '/login', user).then(({data}) => {
        const {
          token,nickname
        } = data;
        if (token) {
          localStorage.setItem('token', token);
          localStorage.setItem('nickname', nickname);
          resolve(token)
        } else {
          reject('invalid login')
        }
      }, err => {
        const {
          error
        } = err;
        reject('invalid login');
      })
    });
  },
  Logout: ({
    commit
  }) => {
    localStorage.removeItem('token');
  }

}

const mutations = {

}
export default {
  state,
  actions,
  mutations,
}