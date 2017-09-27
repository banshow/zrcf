import * as httpservice from '../services/httpservice';
export default {
  namespace: 'coupon',
  state: {
    couponData:{}
  },
  reducers: {
    loadData(state,{data}){
      return {...state,couponData:data};
    }

  },
  effects: {
    *fetch({},{call,put}) {
      const { data, headers } = yield call(httpservice.post, {url:'customerCouponOperation',param:{ac:'getCouponList'}});
      yield put({ type: 'loadData',data:data.data||{}});
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname, query }) => {
        if (pathname==='/coupon') {
          dispatch({ type: 'fetch'});
        }
      });
    },
  },
};
