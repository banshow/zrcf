import * as httpservice from '../services/httpservice';
import * as dateformat  from 'dateformat-util';
import {getOpenid} from '../utils/tokenUtil';
export default {
  namespace: 'order',
  state: {
    currentData:{
      payway:'WCP',
      addressId:0
    },
    orderDetail:{}
  },
  reducers: {
    // togglePayway(state,{payway}){
    //   return {...state,currentPayway:payway}
    // },
    init(state,{payload}){
      return {...state,currentData:{...state.currentData,...payload}}
    },
    syncCurrentData(state,{payload}){
      return {...state,currentData:{...state.currentData,...payload}}
    },
    selectAddress(state,{index}){
      return {...state,currentData:{...state.currentData,addressId:index}}
    },
    loadOrderList(state,{orderMap}){
      let newState =  {...state,orderMap:orderMap};
      return newState;
    },
    loadOrderDetail(state,{orderDetail}){
      return {...state,orderDetail:orderDetail};
    },
    cancelOrder(state){
      return {...state,orderDetail:{...state.orderDetail,order_status:'6'}};
    }
  },
  effects: {
    *fetch({id},{call,put}) {
      const {data,header} = yield call(httpservice.post, {url:'getQuotePriceForCategore',param:{id:id}});
      yield put({ type: 'init',userInfo:userInfo});
    },
    *list({},{call,put}) {
      const {data,header} = yield call(httpservice.post, {url:'customerOrderOperation',param:{ac:'getOrderList'}});
      yield put({ type: 'loadOrderList',orderMap:data.data||{}});
    },
    *detail({id},{call,put}) {
      const {data,header} = yield call(httpservice.post, {url:'customerOrderOperation',param:{ac:'getOrderDetail',id:id}});
      yield put({ type: 'loadOrderDetail',orderDetail:data.data||{}});
    },
    *cancel({},{select,call,put}) {
      const id = yield select(state=>state.order.orderDetail.id);
      const {data,header} = yield call(httpservice.post, {url:'customerOrderOperation',param:{ac:'cacelOrder',order_id:id}});
      yield put({ type: 'cancelOrder'});
    },
    *insert({begin, fail, success, param}, {select, call, put}){
      begin();
      // const result = yield call(baiduMapService.cloudgc, "address=" + param.address);
      // const {pid, cid, area_id, pn, cn, dn} = parseAddress(result);
      let phone =  param.addr.phone;
      param = {
        ac: 'createOrder',
        cat_id: param.cid1,
        cat_id2: param.cid2,
        up_time: param.bookTime[0]+' '+param.bookTime[1],
        contact_who: param.addr.shop_name?param.addr.shop_name:param.addr.name,
        contact_tel: phone,
        contact_phone: phone,
        address: param.addr.address,
        remark: param.remark
      };
      const {data, header} = yield call(httpservice.post, {url: 'customerOrderOperation', param: param});
      success();
    },
    *pay({param}, {call}){
      param = {...param,...{
        type_id:1,
        openid:getOpenid()
      }};
      const {data,header} = yield call(httpservice.post, {url:'tenpay',param:param});
      if(data.data.jstxt){
        eval(data.data.jstxt);
      }
    }
  },
  subscriptions: {
    setup({dispatch, history}) {
      history.listen(({pathname, query}) => {
        if (pathname === '/order') {
          dispatch({type: 'servicetype/fetchPrice',id:query.cid2});
        }else if(pathname === '/indexpage/orderTab'){
          dispatch({type: 'list'});
        }else if(pathname === '/orderdetail'){
          dispatch({type: 'detail',id:query.id});
        }
      });

    },
  },
};
