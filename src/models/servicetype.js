import * as httpservice from '../services/httpservice';
export default {
  namespace: 'servicetype',
  state: {
    types: [],
    i: -1,
    j: -1
  },
  reducers: {
    loadPrice(state, {data}){
      return {...state, ...data};
    },
    reloadType(state, {data}){
      return {...state, types: data, i: -1, j: -1};
    },
    selectType(state, {payload: {i, j}}){
      let newState = {...state};
      let {types, i:m, j:n} = state;
      let ts, cs;
      if (m != -1 && !(m == i && n == j)) {
        ts = state.types;
        cs = state.types[m].children;
        newState = {
          ...state,
          types: [...ts.slice(0, m), {
            ...ts[m],
            children: [...cs.slice(0, n), {...cs[n], selected: false}, ...cs.slice(n + 1)]
          }, ...ts.slice(m + 1)]
        }
      }
      ts = newState.types;
      cs = newState.types[i].children;
      let t = cs[j];
      if (!t.selected) {
        newState = {
          ...newState,
          types: [...ts.slice(0, i), {
            ...ts[i],
            children: [...cs.slice(0, j), {...cs[j], selected: true}, ...cs.slice(j + 1)]
          }, ...ts.slice(i + 1)],
          i: i,
          j: j
        };
      } else {
        newState = {
          ...newState,
          types: [...ts.slice(0, i), {
            ...ts[i],
            children: [...cs.slice(0, j), {...cs[j], selected: false}, ...cs.slice(j + 1)]
          }, ...ts.slice(i + 1)],
          i: -1,
          j: -1
        };
      }
      return newState;
    }
  },
  effects: {
    *fetch({}, {call, put}) {
      const {data, headers} = yield call(httpservice.post, {url: 'getCategory'});
      let cgs = data.data;
      let cgArr = [];
      Object.keys(cgs).map((k) => {
        let cg = cgs[k];
        let pcg = {};
        pcg.id = cg.id;
        pcg.name = cg.name;
        pcg.children = [];
        let __next = cg['__next'] || [];
        __next.map((n) => {
          let ccg = {};
          ccg.id = n.id;
          ccg.name = n.name;
          pcg.children.push(ccg);
        })
        cgArr.push(pcg);
      })
      yield put({type: 'reloadType', data: cgArr});
    },
    *select({payload: {i, j}}, {select,call, put}) {
      yield put({type:'selectType',payload: {i, j}});
      const types = yield select(state=>state.servicetype.types);
      let t = types[i].children[j];
      //const {data,header} = yield call(httpservice.post, {url:'getQuotePriceForCategore',param:{id:t.id}});
      yield put({type:'fetchPrice',id:t.id});
    },
    *fetchPrice({id},{call, put}){
      const {data,header} = yield call(httpservice.post, {url:'getQuotePriceForCategore',param:{id:id}});
      yield put({type:'loadPrice',data:data.data});
    }

  },
  subscriptions: {
    setup({dispatch, history}) {
      history.listen(({pathname, query}) => {
        if (pathname === '/servicetype') {
          dispatch({type: 'fetch'});
        }
      });

    },

  },
};
