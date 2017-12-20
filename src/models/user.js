import * as httpservice from '../services/httpservice';
export default {
  namespace: 'user',
  state: {
    userInfo:{
      // isSetType:true,
      // amount:50,
      // point:1000,
      // cardCount:12
    }
  },
  reducers: {
    init(state,{userInfo}){
      return {...state,userInfo:{...userInfo,cardCount:'10'}};
    },
  },
  effects: {
    *fetch({},{call,put}) {
      const {data, header} = yield call(httpservice.post, {url:'getCustomerInfo',param:{type:'user'}})
      let userInfo = data.data || {};
      yield put({ type: 'init',userInfo:userInfo});
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname, query }) => {
        if (pathname==='/indexpage/myTab') {
          dispatch({ type: 'fetch'});
        }
      });
    },
  },
};
