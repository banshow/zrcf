import fetchJsonp from 'fetch-jsonp';
const cloudgcUrl = 'http://api.map.baidu.com/cloudgc/v1?ak=Wi1NYe85vhzOQMNDPuhB5NVKOAfZF9ZZ';
function custom_callback(res) {
  console.log(res)
}
async function request(url, options) {
  const response = await fetchJsonp(url);
  const data = await response.json();
  return data;
}

export function cloudgc(query) {
  return request(`${cloudgcUrl+'&'+query}`);
}

