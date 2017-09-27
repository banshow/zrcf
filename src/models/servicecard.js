import * as httpservice from '../services/httpservice';
export default {
  namespace: 'servicecard',
  state: {
    cardData:{}
  },
  reducers: {
    loadData(state,{data}){
      return {...state,cardData:data};
    }

  },
  effects: {
    *fetch({},{call,put}) {
      const { data, headers } = yield call(httpservice.post, {url:'getCart',param:{ac:'getMyCartList'}});
      yield put({ type: 'loadData',data:data.data||{}});
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname, query }) => {
        if (pathname==='/servicecard') {
          dispatch({ type: 'fetch'});
        }
      });
    },
  },
};
