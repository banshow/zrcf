import * as httpservice from '../services/httpservice';
import * as tokenUtil from '../utils/tokenUtil';

export default {
  namespace: 'home',
  state: {
    bannerData:[]
  },
  reducers: {
    loadBannerData(state,{data}){
      return {...state,bannerData:[...data]}
    }
  },
  effects: {
    *fetch({},{call,put}) {
      const { data, headers } = yield call(httpservice.post, {url:'customerIndexBanner'});
      yield put({ type: 'loadBannerData',data:data.data });
    },
    *logout({success},{call,put}) {
      yield call(httpservice.post, {url:'logout'});
      yield call(tokenUtil.remove);
      yield call(success);
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname, query }) => {
        if (pathname === '/'||pathname==='/indexpage') {
          dispatch({ type: 'fetch'});
        }
      });

    },

  }
};
