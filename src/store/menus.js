import axios from 'axios'
import qs from 'qs'

const host = process.env.VUE_APP_ROOT_API+'/cms'

const state  = ()=>({
  menus:[],
  mcData:[]
});

const actions={
  FETCH_MENUS: ({commit}, qJson)=>{
    const query = qs.stringify(qJson)
    axios.get(new URL(`?${query}`,host+'/menu')).then(menus=>{
      commit('SET_MENUS',menus.data.data);
      commit('SET_PAGINATION',menus.data.pagination);
    })
  },
  FETCH_MCDATA: ({commit})=>{
    axios.get(host+'/mcdata').then(menus=>{
      commit('SET_MCDATA',menus.data.data.mcData);
    })
  },
  query_menu: async({commit})=>{
    const menu = await axios.get(host+'/menu');
    commit('SET_MENUS',menu.data);  
  },
  // eslint-disable-next-line no-unused-vars
  save_menu: async({commit}, menu)=>{
    const result =  await axios.post(host+'/menu', menu);
    return result.data.sucess;
  }
}

const mutations={
  SET_MENUS:(state, menus)=>{
    state.menus = menus;
  },
  SET_MCDATA:(state, menus)=>{
    state.mcData = menus;
  },
}

export default {
  state,
  actions,
  mutations
}