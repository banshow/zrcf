import React from 'react';
import {connect} from 'dva';
import {NavBar, Button, List, InputItem, Toast} from 'antd-mobile';
import {createForm} from 'rc-form';
import styles from './Recharge.less';

const Item = List.Item;
const radioIcon = <img src={require('../assets/icon_radio.png')} style={{width: '.36rem', height: '.36rem'}}/>;

function Recharge({dispatch, history, form,recharge}) {
  const {getFieldProps, getFieldsValue, setFieldsValue} = form;
  const data = {...getFieldsValue(null)};
  const {list} = recharge;
  if (data.amountInput) {
    data.amountSelect = '';
  }
  return (
    <div className={styles.normal}>
      <NavBar
        mode="dark"
        onLeftClick={() => {
          history.goBack()
        }}
      >余额充值</NavBar>
      <div id={styles['section-select']} className="bg-color-f flex-col">
        {
          new Array(Math.ceil(list.length / 3)).fill(0).map((p, j) =>
            <div className={styles['select-list'] + ' flex-row'}>
              {
                list.slice(j * 3, 3 * (j + 1)).map((cv, i) =>
                  <div key={cv.amount} className={'item' + (data.amountSelect == cv.amount ? ' active' : '')}
                       onClick={() => {
                         if (data.amountSelect == cv.amount) {
                           setFieldsValue({'amountSelect': ''});
                           return;
                         }
                         setFieldsValue({'amountSelect': cv.amount})
                       }}>¥{cv.amount}</div>
                )
              }
              {
                Math.ceil(list.length/3)==j+1&&list.length%3>0?new Array(3-list.length%3).fill(0).map((bv,bi)=>
                  <div key={bi} className={'item '+styles['blank-item']}></div>
                ):''
              }
            </div>
          )
        }
      </div>
      {/*
       <div id={styles['section-select']} className="bg-color-f flex-col">
       <div className={styles['select-list']+' flex-row'}>
       {list[0].map((v)=>
       <div key={v.value} className={'item'+(data.amountSelect==v.value?' active':'')} onClick={()=>{
       if(data.amountSelect==v.value){
       setFieldsValue({'amountSelect':''});
       return;
       }
       setFieldsValue({'amountSelect':v.value})
       }}>{v.label}</div>
       )
       }

       </div>
       <div className={styles['select-list']+' flex-row mt-30'}>
       {list[1].map((v)=>
       <div key={v.value} className={'item'+(data.amountSelect==v.value?' active':'')} onClick={()=>{
       if(data.amountSelect==v.value){
       setFieldsValue({'amountSelect':''});
       return;
       }
       setFieldsValue({'amountSelect':v.value})
       }}>{v.label}</div>
       )
       }
       </div>
       </div>
       */}
      <List className="zrcf-hide">
        <InputItem
          type="hidden"
          {...getFieldProps('payway', {
            initialValue: 'WCP'
          })}
        />
        <InputItem
          type="hidden"
          {...getFieldProps('amountSelect', {
            initialValue: ''
          })}
        />
      </List>
      <List>
        <InputItem
          {...getFieldProps('amountInput', {
            initialValue: ''
          })}
          placeholder="请输入充值金额"
        >其他金额:</InputItem>
      </List>
      <List className="mt-20" id={styles['payway-box']}>
        <Item
          thumb={require('../assets/wx.png')}
          extra={radioIcon} onClick={() => {
        }}>
          微信支付
        </Item>
      </List>
      <div className="fixed-lb width-full">
        <Button className="zrcf-btn" type="primary" onClick={() => {
          let amount = data.amountInput ? data.amountInput : data.amountSelect;
          if (!amount) {
            Toast.info('请输入充值金额', 2);
            return;
          }
          console.log(amount)
          dispatch({
            type: 'user/recharge',
            amount: amount
          })
          history.goBack()
        }}>
          确认支付
        </Button>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {...state};
}
const RechargeWrapper = createForm()(Recharge);
export default connect(mapStateToProps)(RechargeWrapper);
