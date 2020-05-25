import axios from 'axios'
import qs from 'qs'

const host = process.env.VUE_APP_ROOT_API+'/cms'

const state  = ()=>({
  
});

const actions={
  FETCH_ENTRIES: ({commit}, qJson)=>{
    const query = qs.stringify(qJson)
    axios.get(new URL(`?${query}`,host+'/entries')).then(menus=>{
      commit('SET_ARTICLES',menus.data.entries);
      commit('SET_PAGINATION',menus.data.pagination);
    })
  },
  FETCH_ENTRY: async ({commit}, id)=>{
    const res =  await axios.get(host+`/entries/${id}`);
    commit('SET_ARTICLE', res.data.entry);
    
  },
  // eslint-disable-next-line no-unused-vars
  SAVE_ENTRY:async ({commit},entry)=>{
    const result  =  await axios.post(host+'/entries',entry);
    return result.data.id;
  }

}

const mutations={

}

export default {
  state,
  actions,
  mutations
}