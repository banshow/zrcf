import * as httpservice from '../services/httpservice';
export default {
  namespace: 'recharge',
  state: {
    list:[]
  },
  reducers: {
    init(state,{list}){
      return {...state,list:list};
    }
  },
  effects: {
    *fetch({},{call,put}) {
       const {data,header} = yield call(httpservice.post, {url:'getRechargeAmountList'});
      // let ucgs = usercategory.data.data || [];
      // let userInfo = userdata.data.data || {};
      // userInfo.isSetType = ucgs.length>0;
       yield put({ type: 'init',list:data.data || []});
    },
  },
  subscriptions: {
    setup({dispatch, history}) {
      history.listen(({pathname, query}) => {
        if (pathname === '/recharge') {
          dispatch({type: 'fetch'});
        }
      });
    },
  },
};
