import * as httpservice from '../services/httpservice';
import * as tokenUtil from '../utils/tokenUtil';
export default {
  namespace: 'login',
  state: {
    loginWay:'quick',
    countdown:60,
    isCounting:false
  },
  reducers: {
    toggleLoginWay(state){
      return {...state,loginWay:state.loginWay=='quick'?'account':'quick'}
    },
    countdown(state,{countdown}){
      return {...state,countdown:countdown}
    },
    counting(state,{isCounting}){
      return {...state,isCounting:isCounting}
    },
    updateCodeSession(state,{lcsid,lcshash}){
      return {...state,lcsid:lcsid,lcshash:lcshash}
    }
  },
  effects: {
    *getCode({param}, {call, put}){
      const {data, header} = yield call(httpservice.post, {
        url: 'login',
        param: param
      });
      let d = data.data || {};
      yield put({ type: 'updateCodeSession',lcsid:d.lcsid,lcshash:d.lcshash});

    },
    *login({param,success},{call,put}){
      const { data, headers } = yield call(httpservice.post, {url:'login',param:param});
      yield call(tokenUtil.set,data.data);
      yield call(success);
    }
  },
  subscriptions: {},
};
