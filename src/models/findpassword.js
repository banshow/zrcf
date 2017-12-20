import * as httpservice from '../services/httpservice';
export default {
  namespace: 'findpassword',
  state: {
    mobile:'',
    password:'',
    repassword:'',
    code:'',
    btnDisable:true,
    countdown:60,
    isCounting:false
  },
  reducers: {
    mobileInput(state,{value}){
      return {...state,mobile:value,btnDisable:!(value&&state.password&&state.code&&state.repassword)};
    },
    codeInput(state,{value}){
      return {...state,code:value,btnDisable:!(value&&state.password&&state.mobile&&state.repassword)};
    },
    passwordInput(state,{value}){
      return {...state,password:value,btnDisable:!(value&&state.mobile&&state.code&&state.repassword)};
    },
    repasswordInput(state,{value}){
      return {...state,repassword:value,btnDisable:!(value&&state.mobile&&state.code&&state.password)};
    },
    countdown(state,{countdown}){
      return {...state,countdown:countdown}
    },
    counting(state,{isCounting}){
      return {...state,isCounting:isCounting}
    },
    updateCodeSession(state,{fcsid,fcshash}){
      return {...state,fcsid:fcsid,fcshash:fcshash}
    }
  },
  effects: {
    *getCode({param}, {call, put}){
      const {data, header} = yield call(httpservice.post, {
        url: 'login',
        param: param
      });
      let d = data.data || {};
      yield put({ type: 'updateCodeSession',fcsid:d.fcsid,fcshash:d.fcshash});

    },
    *findPwd({param,begin,success},{call,put}){
      yield call(begin);
      const { data, headers } = yield call(httpservice.post, {url:'login',param:param});
      yield call(success);
    }
  },
  subscriptions: {},
};
