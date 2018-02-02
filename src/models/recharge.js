import * as httpservice from '../services/httpservice';
import {getOpenid,get} from '../utils/tokenUtil';
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
    *recharge({param},{call,put}){
      //const return_url = encodeURIComponent(location.href.replace(location.search,'').replace(location.hash,'#/indexpage/myTab'));
      const return_url = '#/result/recharge';
      console.log(return_url)
      param = {...param,...{
        type_id:0,
        openid:getOpenid(),
        return_url:return_url
      }};
      //const token = JSON.parse(get());
      //const tokenStr = 'ihash='+token.ihash+'&uid='+token.uid+'&userType='+token.userType;
      //location.href = 'http://wx.51zrcf.com/mine_card/wxpayStart.html?'+tokenStr+'&type_id=0&return_url='+return_url+'&amount='+param.amount+'&openid='+getOpenid()

      const {data,header} = yield call(httpservice.post, {url:'tenpay',param:param});
      if(data.data.jstxt){
          eval(data.data.jstxt);
      }
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
