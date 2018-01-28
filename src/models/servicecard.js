import * as httpservice from '../services/httpservice';
import {getOpenid} from '../utils/tokenUtil';
export default {
  namespace: 'servicecard',
  state: {
    cardData:{},
    typeData:[]
  },
  reducers: {
    loadData(state,{cardData,typeData}){
      return {...state,cardData:cardData,typeData:typeData};
    }

  },
  effects: {
    *fetch({},{call,put}) {
      const [ type, card ] = yield [call(httpservice.post, {url:'getCart',param:{ac:'getCartType'}}),call(httpservice.post, {url:'getCart',param:{ac:'getMyCartList'}})];
      yield put({ type: 'loadData',cardData:card.data.data||{},typeData:type.data.data||[]});
    },
    *pay({param}, {call}){
      param = {...param,...{
        type_id:2,
        openid:getOpenid()
      }};
      const {data,header} = yield call(httpservice.post, {url:'tenpay',param:param});
      if(data.data.jstxt){
        eval(data.data.jstxt);
      }
    }
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
