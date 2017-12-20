import {ns} from '../config';
let token;
let openid;
export function set(data) {
  token = JSON.stringify(data);
 localStorage.setItem(ns+'.token',token);
}
export function get() {
  return token||localStorage.getItem(ns+'.token');
}
export function remove() {
  token = null;
  return localStorage.removeItem(ns+'.token');
}
export function setOpenid(id) {
  openid = id;
}
export function getOpenid() {
  return openid;
}
