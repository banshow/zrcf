import * as httpservice from '../services/httpservice';
export default {
  namespace: 'invoice',
  state: {
    maxAmount:0,
    recordList:[],
    defaultInvoiceInfo:{}
  },
  reducers: {
    init(state,{maxAmount}){
      return {...state,maxAmount:maxAmount};
    },
    loadDefaultInvoiceInfo(state,{defaultInvoiceInfo,maxAmount}){
      return {...state,maxAmount:maxAmount,defaultInvoiceInfo:defaultInvoiceInfo};
    },
    loadRecord(state,{recordList}){
      return {...state,recordList:recordList};
    }
  },
  effects: {
    *fetch({},{call,put}) {
      const {data,header} = yield call(httpservice.post, {url:'invoiceOperation',param:{'ac':'getMaxInvoiceAmount'}});
      yield put({ type: 'init',maxAmount:(data.data || []).length == 0 ? 0:data.data.maxInvoiceAmount});
    },
    *fetchDefaultInvoiceInfo({},{call,put}) {
      const [maxAmountData,defaultInvoiceInfoData] = yield [call(httpservice.post, {url:'invoiceOperation',param:{'ac':'getMaxInvoiceAmount'}}),call(httpservice.post, {url:'invoiceOperation',param:{'ac':'getDefaultInvoiceInfo'}})];
      yield put({ type: 'loadDefaultInvoiceInfo',defaultInvoiceInfo:(defaultInvoiceInfoData.data.data || {}),maxAmount:(maxAmountData.data.data || []).length == 0 ? 0:maxAmountData.data.data.maxInvoiceAmount});
    },
    *fetchInvoiceRecord({},{call,put}) {
      const {data,header} = yield call(httpservice.post, {url:'invoiceOperation',param:{'ac':'getInvoiceList'}});
      yield put({ type: 'loadRecord',recordList:data.data || []});
    },
    *save({param,begin,fail,success},{call,put}) {
      begin();
      param = {...param,ac:'addInvoice'};
      const {data,header} = yield call(httpservice.post, {url:'invoiceOperation',param:param});
      success();
    },
  },
  subscriptions: {
    setup({dispatch, history}) {
      history.listen(({pathname, query}) => {
        if (pathname === '/invoice') {
          dispatch({type: 'fetch'});
        }else if(pathname  === '/applyinvoice'){
          dispatch({type: 'fetchDefaultInvoiceInfo'});
        } else if(pathname === '/invoicerecord'){
          dispatch({type: 'fetchInvoiceRecord'});
        }
      });
    },
  },
};
