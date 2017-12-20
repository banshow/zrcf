import * as httpservice from '../services/httpservice';
export default {
  namespace: 'servicecard',
  state: {
    cardData:{}
  },
  reducers: {
    loadData(state,{cardData,typeData}){
      return {...state,cardData:cardData,typeData:typeData};
    }

  },
  effects: {
    *fetch({},{call,put}) {
      const { type, card } = yield [call(httpservice.post, {url:'getCart',param:{ac:'getCartType'}}),call(httpservice.post, {url:'getCart',param:{ac:'getMyCartList'}})];
      yield put({ type: 'loadData',cardData:card.data||{},typeData:type.data||{}});
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
