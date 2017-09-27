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
    recharge(state,{amount}){
      return {...state,amount:+(state.amount+(+amount)).toFixed(2)}
    },
    init(state,{userInfo}){
      return {...state,userInfo:{...userInfo,cardCount:'10'}};
    },
  },
  effects: {
    *fetch({},{call,put}) {
      const [usercategory,userdata] = yield [call(httpservice.post, {url:'customerAbilityOperation',param:{ac:'get'}}),call(httpservice.post, {url:'getCustomerInfo',param:{type:'user'}})]
      let ucgs = usercategory.data.data || [];
      let userInfo = userdata.data.data || {};
      userInfo.isSetType = ucgs.length>0;
      yield put({ type: 'init',userInfo:userInfo});
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname, query }) => {
        if (pathname==='/indexpage/myTab') {
          dispatch({ type: 'user/fetch'});
        }
      });
    },
  },
};
