import * as httpservice from '../services/httpservice';
export default {
  namespace: 'register',
  state: {
    mobile:'',
    password:'',
    code:'',
    isRead:false,
    btnDisable:true,
    countdown:60,
    isCounting:false
  },
  reducers: {
    mobileInput(state,{value}){
      return {...state,mobile:value,btnDisable:!(value&&state.password&&state.code&&state.isRead)};
    },
    codeInput(state,{value}){
      return {...state,code:value,btnDisable:!(value&&state.password&&state.mobile&&state.isRead)};
    },
    passwordInput(state,{value}){
      return {...state,password:value,btnDisable:!(value&&state.mobile&&state.code&&state.isRead)};
    },
    selectRead(state){
      return {...state,isRead:!state.isRead,btnDisable:!(state.mobile&&state.password&&state.code&&(!state.isRead))};
    },
    countdown(state,{countdown}){
      return {...state,countdown:countdown}
    },
    counting(state,{isCounting}){
      return {...state,isCounting:isCounting}
    },
    updateCodeSession(state,{rcsid,rcshash}){
      return {...state,rcsid:rcsid,rcshash:rcshash}
    }
  },
  effects: {
    *getCode({param}, {call, put}){
      const {data, header} = yield call(httpservice.post, {
        url: 'login',
        param: param
      });
      let d = data.data || {};
      yield put({ type: 'updateCodeSession',rcsid:d.rcsid,rcshash:d.rcshash});

    },
    *reg({param,begin,success},{call}){
      yield call(begin);
      const { data, headers } = yield call(httpservice.post, {url:'login',param:param});
      yield call(success);
    }
  },
  subscriptions: {},
};
