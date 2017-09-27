import React from 'react';
import { connect } from 'dva';
import {TabBar, NavBar, Icon, Carousel, Grid, Button, Tabs, Badge, Card, List, Popup,InputItem} from 'antd-mobile';
import styles from './Register.less';

function Register(props) {
  const {isRead,btnDisable} = props.register;
  const {history} = props;
  return (
    <div className={styles.normal}>
      <NavBar
        mode="dark"
        onLeftClick={() => {history.goBack()}}
      >注册账号</NavBar>
      <div id={styles['reg-form']} className="bg-color-f">
        <div>
          <InputItem
            type="phone"
            placeholder="您的手机号码"
            maxLength="11"
            onChange={(v)=>{
              props.dispatch({
                 type: 'register/mobileInput',
                 value: v
               });
            }}
          />
        </div>
        <div id={styles['reg-code']} className="mt-34 flex-row ai-center">
          <InputItem
            maxLength="6"
            placeholder="请输入短信中的验证码"
            onChange={(v)=>{
              props.dispatch({
                type: 'register/codeInput',
                value: v
              });
            }}
          />
          <div id={styles['reg-code-hr']}></div>
          <div id={styles['reg-code-btn']}>获取验证码</div>
        </div>
        <div className="mt-34">
          <InputItem
            type="password"
            maxLength="32"
            placeholder="请输入您的密码"
            onChange={(v)=>{
              props.dispatch({
                type: 'register/passwordInput',
                value: v
              });
            }}
          />
        </div>
      </div>
      <div className="bg-color-f ph-40 flex-col ai-center">
        <div id={styles['reg-read']} className={isRead?'selected':''} onClick=
          {()=>{
          props.dispatch({
            type: 'register/selectRead'
          });
        }}>我已阅读并同意《ZRCF使用协议》</div>
        {btnDisable?(<Button id={styles['reg-btn-disable']} type="primary" onClick={()=>{}}>注册</Button>):(<Button id={styles['reg-btn']} type="primary" onClick={()=>{}}>注册</Button>)}

      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {...state};
}

export default connect(mapStateToProps)(Register);
