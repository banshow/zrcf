import React from 'react';
import { connect } from 'dva';
import {createForm} from 'rc-form';
import {TabBar, NavBar, Icon, Carousel, Grid, Button, Tabs, Badge, Card, List, Popup,InputItem,Toast} from 'antd-mobile';
import styles from './Register.less';


function countdownBegin(dispatch,count) {
  if(count<=0){
    dispatch({
      type: 'register/counting',
      isCounting:false
    });
    dispatch({
      type: 'register/countdown',
      countdown:60
    });
    return;
  }
  let c = count-1;
  dispatch({
    type: 'register/countdown',
    countdown:c
  })

  setTimeout(function(){countdownBegin(dispatch,c)},1000)
}
function Register(props) {
  const {getFieldProps, validateFields, getFieldError, getFieldValue} = props.form;
  const {btnDisable,isRead,rcshash,rcsid,countdown,isCounting} = props.register;
  const {history} = props;
  return (
    <div className={styles.normal}>
      <NavBar
        mode="dark"
        onLeftClick={() => {history.goBack()}}
      >注册账号</NavBar>
      <List className="zrcf-hide">
        <InputItem
          type="hidden"
          {...getFieldProps('ac', {
            initialValue: 'reg'
          })}
        />
        <InputItem
          type="hidden"
          {...getFieldProps('rcsid', {
            initialValue: rcsid
          })}
        />
        <InputItem
          type="hidden"
          {...getFieldProps('rcshash', {
            initialValue: rcshash
          })}
        />
      </List>
      <div id={styles['reg-form']} className="bg-color-f">
        <div>
          <InputItem
            {...getFieldProps('phone', {
              rules: [{required: true,pattern: /^1(3|4|5|7|8)[0-9]\d{8}$/, message: '手机号码格式不正确'}]
            })}
            type="number"
            placeholder="您的手机号码"
            maxLength="11"
          />
        </div>
        <div id={styles['reg-code']} className="mt-34 flex-row ai-center">
          <InputItem
            {...getFieldProps('vcode', {
              rules: [{required: true, message: '验证码不能为空'}]
            })}
            maxLength="6"
            placeholder="请输入短信中的验证码"
          />
          <div id={styles['reg-code-hr']}></div>
          <div id={styles['reg-code-btn']} onClick={()=>{
            validateFields((errors, values) => {
              let errs = props.form.getFieldError('phone');
              if(errs){
                let errsMsg = errs[0];
                Toast.info(errsMsg, 2);
                return;
              }


              if(isCounting){
                return;
              }
              props.dispatch({
                type: 'register/counting',
                isCounting:true
              });
              countdownBegin(props.dispatch,countdown);

              props.dispatch({
                type: 'register/getCode',
                param:{phone:getFieldValue('phone'),ac:'getRegistCode'},
                begin:()=>{
                  Toast.loading("提交中", 0, () => {
                  }, true);
                },
                success:()=>{
                  Toast.hide();
                  props.history.goBack();
                },
                fail:(msg)=>{
                  Toast.hide();
                  Toast.info(msg, 2);
                }
              });

            })
          }}>{isCounting?(countdown+'秒'):'获取验证码'}</div>
        </div>
        <div className="mt-34">
          <InputItem
            {...getFieldProps('passwd', {
              rules: [{required: true, min:6,max:32,message: '密码长度在6-32个字符之间'}]
            })}
            type="password"
            maxLength="32"
            placeholder="请输入您的密码"
          />
        </div>
        <div className="mt-34">
          <InputItem
            {...getFieldProps('passwd2', {
              rules: [{required: true,  min:6,max:32,message: '密码长度在6-32个字符之间'}]
            })}
            type="password"
            maxLength="32"
            placeholder="再次确认密码(密码长度在6-32个字符之间)"
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
        <Button id={styles['reg-btn']} type="primary" onClick={()=>{

          validateFields((errors, values) => {

            if (errors) {
              for (let f in errors) {
                let errs = getFieldError(f);
                let errsMsg = errs[0];
                Toast.info(errsMsg, 2);
                return;
              }
            }

            if(getFieldValue('passwd') != getFieldValue('passwd2')){
              Toast.info('两次密码不一致', 2);
              return;
            }

            if(!isRead){
              Toast.info('是否阅读并同意《ZRCF使用协议》？', 2);
              return;
            }

            props.dispatch({
              type: 'register/reg',
              param: values,
              begin:()=>{
                Toast.loading("提交中", 0, () => {
                }, true);
              },
              success:()=>{
                Toast.hide();
                props.history.goBack();
              },
              fail:(msg)=>{
                Toast.hide();
                Toast.info(msg, 2);
              }
            });

          })

        }}>注册</Button>

      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {...state};
}
const RegisterWrapper = createForm()(Register);

export default connect(mapStateToProps)(RegisterWrapper);
