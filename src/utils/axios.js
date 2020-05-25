import axios from 'axios'
import router from '../route'
import store from '../store'

axios.interceptors.request.use(config=>{
  if(localStorage.getItem('token')){
    // eslint-disable-next-line no-useless-escape
    config.headers.Authorization =`Bearer ${localStorage.getItem('token')}`.replace(/(^\")|(\"$)/g, '')
  }
  return config;
  },
  err=>{
    return Promise.reject(err);
  }
);

axios.interceptors.response.use(
  response=>{
    return response
  },
  function(error){
    if(error.response){
      switch (error.response.status) {
        case 401:
          store.dispatch('Logout');
          debugger;
          if(router.currentRoute.path!='/login')
            router.replace({path: '/login', query:{ redirect: router.currentRoute.fullPath}});
          break;
      }
    }
    return Promise.reject(error);
  }
)