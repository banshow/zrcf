import fetch from 'dva/fetch';
import * as tokenUtil from '../utils/tokenUtil';

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}
function checkData(data) {
  if(data.error_code!==0){
    throw new Error(data.msg,data.error_code);
  }
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default async function request(url, options) {

  let defaultHeader = {
    //'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'
  }
  options = options || {};
  let token = tokenUtil.get();
  token = token?JSON.parse(token):{};
  options.headers = {...defaultHeader,...(options.headers||{}),...token};

  //options.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
  let response;
  try{
    response = await fetch(url, options);
  }catch(e) {
    throw new Error('网络异常或超时','network');
  }
  checkStatus(response);
  const data = await response.json();
  checkData(data);
  const ret = {
    data,
    headers: {},
  };

  if (response.headers.get('x-total-count')) {
    ret.headers['x-total-count'] = response.headers.get('x-total-count');
  }

  return ret;
}
