import request from '../utils/request';
import {apiBaseUrl} from '../config';
function object2fromData(param) {
  let formData = '';
  Object.getOwnPropertyNames(param).forEach((k)=>{
    formData+='&'+k+'='+encodeURIComponent(param[k]);
  })
  return formData.substring(1);
}
export function get({url,param}) {
  let body = null;
  if(param){
    body = object2fromData(param);
  }
  return request(`${apiBaseUrl+url}`,{
    headers:{
      'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'
    },
    body: body
  });
}
export function post({url,param}) {
  let body = null;
  if(param){
    body = object2fromData(param);
  }
  return request(`${apiBaseUrl+url}`,{
    headers:{
      'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'
    },
    method: 'POST',
    body: body
  });
}
export function upload({url,files}) {
  let formData = new FormData();
  files.map(f=>{
    formData.append('uploadImg[]',f.file);
  })
  return request(`${apiBaseUrl+url}`,{
    // headers:{'Content-Type':'multipart/form-data'},
    method: 'POST',
    body: formData
  });
}

export function remove(id) {
  return request(`/api/users/${id}`, {
    method: 'DELETE',
  });
}

export function patch(id, values) {
  return request(`/api/users/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(values),
  });
}

export function create(values) {
  return request('/api/users', {
    method: 'POST',
    body: JSON.stringify(values),
  });
}


