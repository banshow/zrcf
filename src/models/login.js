import * as httpservice from '../services/httpservice';
import * as tokenUtil from '../utils/tokenUtil';
export default {
  namespace: 'login',
  state: {
    loginWay:'quick'
  },
  reducers: {
    toggleLoginWay(state){
      return {...state,loginWay:state.loginWay=='quick'?'account':'quick'}
    }
  },
  effects: {
    *login({param,success},{call,put}){
      const { data, headers } = yield call(httpservice.post, {url:'login',param:param});
      yield call(tokenUtil.set,data.data);
      yield call(success);
    }
  },
  subscriptions: {},
};
