
export default {
  namespace: 'register',
  state: {
    mobile:'',
    password:'',
    code:'',
    isRead:false,
    btnDisable:true
  },
  reducers: {
    mobileInput(state,{value}){
      return {...state,mobile:value,btnDisable:!(value&&state.password&&state.code&&state.isRead)};
    },
    codeInput(state,{value}){
      return {...state,code:value,btnDisable:!(value&&state.password&&state.mobile&&state.isRead)};
    },
    passwordInput(state,{value}){
      return {...state,password:value,btnDisable:!(value&&state.mobile&&state.code&&state.isRead)};
    },
    selectRead(state){
      return {...state,isRead:!state.isRead,btnDisable:!(state.mobile&&state.password&&state.code&&(!state.isRead))};
    }
  },
  effects: {},
  subscriptions: {},
};
