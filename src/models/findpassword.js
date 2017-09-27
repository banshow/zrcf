
export default {
  namespace: 'findpassword',
  state: {
    mobile:'',
    password:'',
    repassword:'',
    code:'',
    btnDisable:true
  },
  reducers: {
    mobileInput(state,{value}){
      return {...state,mobile:value,btnDisable:!(value&&state.password&&state.code&&state.repassword)};
    },
    codeInput(state,{value}){
      return {...state,code:value,btnDisable:!(value&&state.password&&state.mobile&&state.repassword)};
    },
    passwordInput(state,{value}){
      return {...state,password:value,btnDisable:!(value&&state.mobile&&state.code&&state.repassword)};
    },
    repasswordInput(state,{value}){
      return {...state,repassword:value,btnDisable:!(value&&state.mobile&&state.code&&state.password)};
    }
  },
  effects: {},
  subscriptions: {},
};
