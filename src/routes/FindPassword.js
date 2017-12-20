import React from 'react';
import { connect } from 'dva';
import {createForm} from 'rc-form';
import {NavBar, Icon,  Button, List,
  Popup,
  InputItem,
  Toast} from 'antd-mobile';
import styles from './FindPassword.less';
function countdownBegin(dispatch,count) {
  if(count<=0){
    dispatch({
      type: 'findpassword/counting',
      isCounting:false
    });
    dispatch({
      type: 'findpassword/countdown',
      countdown:60
    });
    return;
  }
  let c = count-1;
  dispatch({
    type: 'findpassword/countdown',
    countdown:c
  })

  setTimeout(function(){countdownBegin(dispatch,c)},1000)
}
function FindPassword(props) {
  const {getFieldProps, validateFields, getFieldError, getFieldValue} = props.form;
  const {fcshash,fcsid,countdown,isCounting} = props.findpassword;
  const {history} = props;
  return (
    <div className={styles.normal}>
      <NavBar
        mode="dark"
        onLeftClick={() => {history.goBack()}}
      >找回密码</NavBar>
      <List className="zrcf-hide">
        <InputItem
          type="hidden"
          {...getFieldProps('ac', {
            initialValue: 'findPwd'
          })}
        />
        <InputItem
          type="hidden"
          {...getFieldProps('fcsid', {
            initialValue: fcsid
          })}
        />
        <InputItem
          type="hidden"
          {...getFieldProps('fcshash', {
            initialValue: fcshash
          })}
        />
      </List>
      <div id={styles['fpwd-form']} className="bg-color-f">
        <div>
          <InputItem
            {...getFieldProps('phone', {
              rules: [{required: true,pattern: /^1(3|4|5|7|8)[0-9]\d{8}$/, message: '手机号码格式不正确'}]
            })}
            type="number"
            placeholder="登录手机号码"
            maxLength="11"
          />
        </div>
        <div id={styles['fpwd-code']} className="mt-34 flex-row ai-center">
          <InputItem
            {...getFieldProps('vcode', {
              rules: [{required: true, message: '验证码不能为空'}]
            })}
            maxLength="6"
            placeholder="请输入短信验证码"
          />
          <div id={styles['fpwd-code-hr']}></div>
          <div id={styles['fpwd-code-btn']} onClick={()=>{
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
                type: 'findpassword/counting',
                isCounting:true
              });
              countdownBegin(props.dispatch,countdown);

              props.dispatch({
                type: 'findpassword/getCode',
                param:{phone:getFieldValue('phone'),ac:'getEditPwdCode'},
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
            placeholder="设置账户密码"
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
        <Button id={styles['fpwd-btn']} type="primary" onClick={()=>{
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

            props.dispatch({
              type: 'findpassword/findPwd',
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
        }}>完成</Button>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {...state};
}
const FindPasswordWrapper = createForm()(FindPassword);
export default connect(mapStateToProps)(FindPasswordWrapper);
