function Categories(host, axios, qs) {return {
  state:()=>({
    categories:[]
  }),
  mutations: {
    SET_CATEGORIES: (state, categories)=>{
      state.categories = categories;
    },
  },
  actions:{
    FETCH_CATEGORIES: async ({commit},qJson)=>{
      const query = qs.stringify(qJson)
      const res =  await axios.get(new URL(`?${query}`, host+'/categories'));
      commit('SET_CATEGORIES',res.data.data);
      commit('SET_PAGINATION', res.data.pagination);
    },
    // eslint-disable-next-line no-unused-vars
    SET_CATEGORIES: ({commit}, {tag,callback})=>{
      axios.post(host+'/categories',tag).then(res=>{
        console.log(res);
        callback();
      })
    },
    // eslint-disable-next-line no-unused-vars
    DELETE_CATEGORIES: ({commit}, {tagKey,callback})=>{
      axios.delete(host+'/categories/'+tagKey).then(res=>{
        callback(res.data);
      })
    },
    query_categories: async ({commit}, qJson)=>{
      const query = qs.stringify(qJson)
      const res =  await axios.get(new URL(`?${query}`, host+'/categories'));
      commit('SET_CATEGORIES',res.data.data);
    }
  }
}}

module.exports = Categories;

