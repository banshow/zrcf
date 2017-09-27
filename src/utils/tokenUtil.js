import {ns} from '../config';
export function set(data) {
 localStorage.setItem(ns+'.token',JSON.stringify(data));
}
export function get() {
  return localStorage.getItem(ns+'.token');
}
export function remove() {
  return localStorage.removeItem(ns+'.token');
}
