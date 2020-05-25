function tags (axios,qs, host){return {
  state:()=>({
    // eslint-disable-next-line no-undef
    tags:[]
  }),
  mutations: {
    SET_TAGS: (state, tags)=>{
      state.tags = tags;
    },
  },
  actions:{
  FETCH_TAGS: ({commit},qJson)=>{
    const query = qs.stringify(qJson)
    axios.get(new URL(`?${query}`, host+'/tags')).then(res=>{
      commit('SET_TAGS',res.data.data);
      commit('SET_PAGINATION', res.data.pagination)
    })
  },
  // eslint-disable-next-line no-unused-vars
  SET_TAG: ({commit}, {tag,callback})=>{
    axios.post(host+'/tags',tag).then(res=>{
      console.log(res);
      callback();
    })
  },
  // eslint-disable-next-line no-unused-vars
  DELETE_TAG: ({commit}, {tagKey,callback})=>{
    axios.delete(host+'/tags/'+tagKey).then(res=>{
      callback(res.data);
    })
  },
  query_tags: async({commit}, qJson)=>{
    const query = qs.stringify(qJson)
    const res =  await axios.get(new URL(`?${query}`, host+'/tags'));
    commit('SET_TAGS',res.data.data);
  }
  }
}}
  
  module.exports=tags;