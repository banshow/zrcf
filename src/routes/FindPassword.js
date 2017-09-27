import React from 'react';
import { connect } from 'dva';
import {NavBar, Icon,  Button, InputItem} from 'antd-mobile';
import styles from './FindPassword.less';

function FindPassword(props) {
  const {btnDisable} = props.findpassword;
  const {history} = props;
  return (
    <div className={styles.normal}>
      <NavBar
        mode="dark"
        onLeftClick={() => {history.goBack()}}
      >找回密码</NavBar>
      <div id={styles['fpwd-form']} className="bg-color-f">
        <div>
          <InputItem
            type="phone"
            placeholder="登录手机号码"
            maxLength="11"
            onChange={(v)=>{
              props.dispatch({
                type: 'findpassword/mobileInput',
                value: v
              });
            }}
          />
        </div>
        <div id={styles['fpwd-code']} className="mt-34 flex-row ai-center">
          <InputItem
            maxLength="6"
            placeholder="请输入短信验证码"
            onChange={(v)=>{
              props.dispatch({
                type: 'findpassword/codeInput',
                value: v
              });
            }}
          />
          <div id={styles['fpwd-code-hr']}></div>
          <div id={styles['fpwd-code-btn']}>获取验证码</div>
        </div>
        <div className="mt-34">
          <InputItem
            type="password"
            maxLength="32"
            placeholder="设置账户密码"
            onChange={(v)=>{
              props.dispatch({
                type: 'findpassword/passwordInput',
                value: v
              });
            }}
          />
        </div>
        <div className="mt-34">
          <InputItem
            type="password"
            maxLength="32"
            placeholder="再次确认密码(密码长度在6-32个字符之间)"
            onChange={(v)=>{
              props.dispatch({
                type: 'findpassword/repasswordInput',
                value: v
              });
            }}
          />
        </div>
      </div>
      <div className="bg-color-f ph-40 flex-col ai-center">
        {btnDisable?(<Button id={styles['fpwd-btn-disable']} type="primary" onClick={()=>{}}>完成</Button>):(<Button id={styles['fpwd-btn']} type="primary" onClick={()=>{}}>完成</Button>)}
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {...state};
}

export default connect(mapStateToProps)(FindPassword);
