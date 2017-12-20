import {getParams} from 'react-router/lib/PatternUtils'
import * as httpservice from '../services/httpservice';
import * as baiduMapService from '../services/baiduMapService';
import {apiBaseUrl} from '../config';
function parseAddress(result) {
  let r = result.result[0];
  let ac = r.address_components;
  let pn = ac.province;
  let cn = ac.city;
  let dn = ac.district;
  let len = cityData3.length;
  let pi, ci, di;
  let pid, cid, area_id;
  for (let i = 0; i < len; i++) {
    let cd = cityData3[i];
    if (pn.indexOf(cd.text) != -1) {
      pi = i;
      pid = cd.value;
      break;
    }
  }
  let cc = cityData3[pi].children;
  len = cc.length;
  for (let i = 0; i < len; i++) {
    let ccd = cc[i];
    if (cn.indexOf(ccd.text) != -1) {
      ci = i;
      cid = ccd.value;
      break;
    }
  }
  let dc = cc[ci].children;
  len = dc.length;
  for (let i = 0; i < len; i++) {
    let dcd = dc[i];
    if (dn.indexOf(dcd.text) != -1) {
      di = i;
      area_id = dcd.value;
      break;
    }
  }

  return {pid, cid, area_id, pn, cn, dn};
}
export default {
  namespace: 'serviceaddress',
  state: {
    files: [],
    pics: [],
    currentData: {},
    list: []
  },
  reducers: {
    reload(state, {list}){
      return {...state, list: list};
    },
    init(state, {files, pics, currentData}){
      return {...state, files: files, pics: pics, currentData: currentData};
    },
    loadCurrentData(state, {currentData}){
      let yyzz_pic = currentData.yyzz_pic || '';
      let pics = yyzz_pic?yyzz_pic.split(','):[];
      let files = [];
      pics.map((id, i) => {
        files.push({
          url: apiBaseUrl + id,
          id: i
        })
      })
      return {...state, currentData: currentData,files:files,pics:pics};
    },
    filesChange(state, {files, pics}){
      if (pics) {
        return {...state, files: files, pics: [...state.pics, ...pics]};
      }
      return {...state, files: files};
    },
    add(state, {address}){
      return {...state, list: [address, ...state.list]};
    },
    edit(state, {index, address}){
      return {
        ...state,
        list: [...state.list.slice(0, index), {...state.list[index], ...address}, ...state.list.slice(index + 1)]
      }
    }
  },
  effects: {
    *uploadImg({files, begin, end}, {call, put}){
      begin();
      const {data, header} = yield call(httpservice.upload, {
        url: 'uploadImg',
        files: files.slice(files.length - 1, files.length)
      });
      let pics = data.data;
      yield put({type: 'filesChange', files: files, pics: pics});
      end();
    },
    *find({id}, {call, put}){
      yield put({type: 'init', files: [], pics: [], currentData: []});
      const {data, header} = yield call(httpservice.post, {
        url: 'customerAddressOperation',
        param: {ac: 'getInfoForId', id: id}
      });
      yield put({type: 'loadCurrentData', currentData: data.data || {}});
    },
    *setDefault({id}, {call, put}){
      const {data, header} = yield call(httpservice.post, {
        url: 'customerAddressOperation',
        param: {ac: 'setDefault', id: id}
      });
      yield put({type: 'list'});
    },
    *del({id}, {call, put}){
      const {data, header} = yield call(httpservice.post, {
        url: 'customerAddressOperation',
        param: {ac: 'del', id: id}
      });
      yield put({type: 'list'});
    },
    *list({}, {call, put}){
      const {data, header} = yield call(httpservice.post, {url: 'customerAddressOperation', param: {ac: 'getList'}});
      yield put({type: 'reload', list: data.data || []});
    },
    *insert({begin, fail, success, param}, {select, call, put}){
      const {shop_name} = param;
      let yyzz_pic = '';
      if (shop_name) {
        const {files, pics} = yield select(state => state.serviceaddress);
        if (!files || files.length == 0 || !pics || pics.length == 0) {
          fail("请上传营业执照照片")
          return;
        }
        yyzz_pic = pics[pics.length - 1];
      }
      begin();
      const result = yield call(baiduMapService.cloudgc, "address=" + param.address);
      const {pid, cid, area_id, pn, cn, dn} = parseAddress(result);
      param = {
        ...param,
        ac: 'add',
        pid: pid,
        cid: cid,
        area_id: area_id,
        lat_lng: pn + ' ' + cn + ' ' + dn,
        is_default: '',
        yyzz_pic: yyzz_pic
      };
      const {data, header} = yield call(httpservice.post, {url: 'customerAddressOperation', param: param});
      success();
    },
    *update({begin,fail, success, param}, {select, call, put}){
      const {shop_name} = param;
      let yyzz_pic = '';
      if (shop_name) {
        const {files, pics} = yield select(state => state.serviceaddress);
        if (!files || files.length == 0 || !pics || pics.length == 0) {
          fail("请上传营业执照照片")
          return;
        }
        yyzz_pic = pics[pics.length - 1];
      }
      begin();
      const result = yield call(baiduMapService.cloudgc, "address=" + param.address);
      const {pid, cid, area_id, pn, cn, dn} = parseAddress(result);
      param = {
        ...param,
        ac: 'update',
        pid: pid,
        cid: cid,
        area_id: area_id,
        lat_lng: pn + ' ' + cn + ' ' + dn,
        is_default: '',
        yyzz_pic: yyzz_pic
      };
      const {data, header} = yield call(httpservice.post, {url: 'customerAddressOperation', param: param});
      success();
    }
  },
  subscriptions: {
    setup({dispatch, history}) {
      history.listen(({pathname, query}) => {
        if (pathname === '/serviceaddress' || pathname === '/order'|| pathname === '/serviceaddress/order') {
          dispatch({type: 'list'});
        } else if (pathname.startsWith('/address/add')) {
          dispatch({type: 'init', files: [], pics: [], currentData: []});
        } else if (pathname.startsWith('/address/edit')) {
          const params = getParams('/address/:type(/:id)', pathname);
          dispatch({type: 'find', id: params.id});
        }
      });
    },

  },
};
