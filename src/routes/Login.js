import React from 'react';
import {connect} from 'dva';
import {
  TabBar,
  NavBar,
  Icon,
  Carousel,
  Grid,
  Button,
  Tabs,
  Badge,
  Card,
  List,
  Popup,
  InputItem,
  Toast
} from 'antd-mobile';
import {createForm} from 'rc-form';
import styles from './Login.less';

function Login(props) {
  const {getFieldProps, validateFields, getFieldError} = props.form;
  const {loginWay} = props.login;
  const {history} = props;
  const {from} = props.location.query;
  const renderQuickLogin = () => {
    return (
      <div className={styles.normal}>
        <NavBar
          mode="dark"
          onLeftClick={() => {
            history.goBack()
          }}
        >快捷登录</NavBar>
        <div id={styles['login-head']}>
          <img src={require('../assets/logo.png')} style={{width: '2.24rem', height: '1.76rem'}}/>
        </div>
        <div id={styles['login-form']} className="bg-color-f">
          <div>
            <InputItem
              type="phone"
              placeholder="手机号码"
              maxLength="11"
            />
          </div>
          <div id={styles['login-code']} className="mt-34 flex-row ai-center">
            <InputItem
              maxLength="6"
              placeholder="请输入验证码"
            />
            <div id={styles['login-code-hr']}></div>
            <div id={styles['login-code-btn']}>获取验证码</div>
          </div>
        </div>
        <div className="bg-color-f ph-40 flex-col ai-center">
          <Button id={styles['login-btn']} type="primary" onClick={() => {
            props.history.replaceState(null, '/?st=' + st)
          }}>登录</Button>
          <div className="color-b fs-26" style={{marginTop: '.68rem'}}>或</div>
          <img src={require('../assets/account_login.png')}
               style={{marginTop: '.5rem', width: '.8rem', height: '.8rem'}}/>
          <div className="fs-26 color-6" style={{marginTop: '.24rem'}} onClick={
            () => {
              props.dispatch({
                type: 'login/toggleLoginWay'
              });
            }
          }>账号密码登录
          </div>
          <div className="flex-row fs-26 color-e ai-center" style={{marginTop: '1.14rem', marginBottom: '.84rem'}}>
            <span onClick={() => {
              props.history.push('/findpassword')
            }}>找回密码</span>
            <div id={styles['vl']}></div>
            <span onClick={() => {
              props.history.push('/register')
            }}>快速注册</span>
          </div>
        </div>
      </div>
    )
  }

  const renderAccountLogin = () => {
    return (
      <div className={styles.normal}>
        <NavBar
          mode="dark"
          onLeftClick={() => console.log('onLeftClick')}
        >账号密码登录</NavBar>
        <div id={styles['login-head']}>
          <img src={require('../assets/logo.png')} style={{width: '2.24rem', height: '1.76rem'}}/>
        </div>
        <List className="zrcf-hide">
          <InputItem
            type="hidden"
            {...getFieldProps('a', {
              initialValue: 'jd'
            })}
          />
          <InputItem
            type="hidden"
            {...getFieldProps('ac', {
              initialValue: 'login'
            })}
          />
        </List>
        <div id={styles['login-form']} className="bg-color-f">
          <div>
            <InputItem
              {...getFieldProps('phone', {
                rules: [{required: true,pattern: /^1(3|4|5|7|8)[0-9]\d{8}$/, message: '手机号码格式不正确'}]
              })}
              type="number"
              placeholder="手机号码"
              data-seed="logId"
            />
          </div>
          <div className="mt-34">
            <InputItem
              {...getFieldProps('passwd', {
                rules: [{required: true, message: '密码不能为空'}]
              })}
              type="password"
              placeholder="请输入您的密码"
            />
          </div>
        </div>
        <div className="bg-color-f ph-40 flex-col ai-center">
          <Button id={styles['login-btn']} type="primary" onClick={() => {
            validateFields((errors, values) => {

              if (errors) {
                for (let f in errors) {
                  let errs = getFieldError(f);
                  let errsMsg = errs[0];
                  Toast.info(errsMsg, 2);
                  return;
                }
              }

              props.dispatch({
                type: 'login/login',
                param: values,
                success: () => {
                  if(from){
                    props.history.replace(from);
                  }else{
                    props.history.replace("/")
                  }

                }
              });

            })

          }}>登录</Button>
          <div className="color-b fs-26" style={{marginTop: '.68rem'}}>或</div>
          <img src={require('../assets/account_login.png')}
               style={{marginTop: '.5rem', width: '.8rem', height: '.8rem'}}/>
          <div className="fs-26 color-6" style={{marginTop: '.24rem'}} onClick={
            () => {
              props.dispatch({
                type: 'login/toggleLoginWay'
              });
            }
          }>快捷登录
          </div>
          <div className="flex-row fs-26 color-e ai-center" style={{marginTop: '1.14rem', marginBottom: '.84rem'}}>
            <span onClick={() => {
              props.history.push('/findpassword')
            }}>找回密码</span>
            <div id={styles['vl']}></div>
            <span onClick={() => {
              props.history.push('/register')
            }}>快速注册</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      {loginWay == 'quick' ? renderQuickLogin() : renderAccountLogin()}
    </div>
  );
}

function mapStateToProps(state) {
  return {...state};
}
const LoginWrapper = createForm()(Login);
export default connect(mapStateToProps)(LoginWrapper);
