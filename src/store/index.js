import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import qs from 'qs'

import tags from './tags'
import categories from './categories'
import menus from './menus'
import entries from './entries'
import user from './user'
Vue.use(Vuex)

const host = process.env.VUE_APP_ROOT_API+'/cms'

const Moudle= {
  state:()=>({
    entries: [],
    entry: {},
    pagination: {},
    customPosts: [],
    header: '',
    menu: [],
    visible : true
  }),
  mutations:{
    SET_ARTICLES: (state, articles) => {
      state.entries = articles
    },
    SET_ARTICLE: (state, article) => {
      state.entry = article
    },
    SET_PAGINATION: (state, pagination) => {
      state.pagination = pagination
    },
    SET_CUSTOMPOSTS: (state, news)=>{
      state.customPosts = news;
    },
    SET_HEADER: (state, header) => {
      state.header = header
    },
    SET_MENU: (state, menu)=>{
      state.menu = menu;
    },
    SET_VISIABLE: (state, visiable)=>{
        state.visiable = visiable;
    }
  },
  actions:{
    FETCH_ARTICLES: ({ commit }, qJson) => {
      // commit('SET_ARTICLES', )
      commit('SET_VISIABLE',false);
      const query = qs.stringify(qJson)
      axios.get(new URL(`?${query}`, host)).then((res) => {
        if(qJson.s!=null)
        {
          commit('SET_HEADER',"Search Results for " + qJson.s);
        }
        else
        {
          if(res.data.data.length==0){
            commit('SET_HEADER','Nothing to be found');
          }
          else{
            commit('SET_HEADER',res.data.header);
          }
        }
        commit('SET_ARTICLES', res.data.data)
        commit('SET_PAGINATION', res.data.pagination)
        // eslint-disable-next-line no-debugger
        commit('SET_VISIABLE',true);
      })
    },
    FETCH_ARTICLE: ({ commit }, id) => {
      commit('SET_VISIABLE',false);
      axios.get(host+`/${id}`).then((res) => {
        commit('SET_ARTICLE', res.data.data);
        commit('SET_VISIABLE',true);
      })
    },
    FETCH_CUSTOMPOSTS:({commit})=>{
      axios.get(host+'/news').then(res=>{
        commit('SET_CUSTOMPOSTS',res.data.data);
      });
    },
    FETCH_MENU: ({commit}) =>{
      axios.get(host+'/menu').then(res=>{
        commit('SET_MENU', res.data.data);
      });
    },
  }
}


export default new Vuex.Store({
  // state: {
  //   entries: [],
  //   entry: {},
  //   pagination: {},
  //   customPosts: [],
  //   header: '',
  //   menu: [],
  //   visiable : true
  // },
  // mutations: {
  //   SET_ARTICLES: (state, articles) => {
  //     state.entries = articles
  //   },
  //   SET_ARTICLE: (state, article) => {
  //     state.entry = article
  //   },
  //   SET_PAGINATION: (state, pagination) => {
  //     state.pagination = pagination
  //   },
  //   SET_CUSTOMPOSTS: (state, news)=>{
  //     state.customPosts = news;
  //   },
  //   SET_HEADER: (state, header) => {
  //     state.header = header
  //   },
  //   SET_MENU: (state, menu)=>{
  //     state.menu = menu;
  //   },
  //   SET_VISIABLE: (state, visiable)=>{
  //       state.visiable = visiable;
  //   }
  // },
  // actions: {
  //   FETCH_ARTICLES: ({ commit }, qJson) => {
  //     // commit('SET_ARTICLES', )
  //     commit('SET_VISIABLE',false);
  //     const query = qs.stringify(qJson)
  //     axios.get(new URL(`?${query}`, host)).then((res) => {
  //       if(qJson.s!=null)
  //       {
  //         commit('SET_HEADER',"Search Results for " + qJson.s);
  //       }
  //       else
  //       {
  //         if(res.data.data.length==0){
  //           commit('SET_HEADER','Nothing to be found');
  //         }
  //         else{
  //           commit('SET_HEADER',res.data.header);
  //         }
  //       }
  //       commit('SET_ARTICLES', res.data.data)
  //       commit('SET_PAGINATION', res.data.pagination)
  //       // eslint-disable-next-line no-debugger
  //       commit('SET_VISIABLE',true);
  //     })
  //   },
  //   FETCH_ARTICLE: ({ commit }, id) => {
  //     commit('SET_VISIABLE',false);
  //     axios.get(host+`/${id}`).then((res) => {
  //       commit('SET_ARTICLE', res.data.data);
  //       commit('SET_VISIABLE',true);
  //     })
  //   },
  //   FETCH_CUSTOMPOSTS:({commit})=>{
  //     axios.get(host+'/news').then(res=>{
  //       commit('SET_CUSTOMPOSTS',res.data.data);
  //     });
  //   },
  //   FETCH_MENU: ({commit}) =>{
  //     axios.get(host+'/menu').then(res=>{
  //       commit('SET_MENU', res.data.data);
  //     });
  //   },
  //   FETCH_TAGS: ({commit},qJson)=>{
  //     const query = qs.stringify(qJson)
  //     axios.get(new URL(`?${query}`, host+'/tags')).then(res=>{
  //       commit('SET_TAGS',res.data.data);
  //       commit('SET_PAGINATION', res.data.pagination)
  //     })
  //   },
  //   // eslint-disable-next-line no-unused-vars
  //   SET_TAG: ({commit}, {tag,callback})=>{
  //     axios.post(host+'/tags',tag).then(res=>{
  //       console.log(res);
  //       callback();
  //     })
  //   },
  //   // eslint-disable-next-line no-unused-vars
  //   DELETE_TAG: ({commit}, {tagKey,callback})=>{
  //     axios.delete(host+'/tags/'+tagKey).then(res=>{
  //       callback(res.data);
  //     })
  //   },


  // },
  modules: {
    tags:tags(axios,qs,host),
    categories: categories(host, axios, qs),
    menus: menus,
    entries:entries,
    Moudle:Moudle,
    user: user
  }
})
