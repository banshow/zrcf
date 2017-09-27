import React from 'react';
import { connect } from 'dva';
import {NavBar, Icon,  Button, InputItem,TextareaItem,List,Modal,PickerView} from 'antd-mobile';
import { createForm } from 'rc-form';
import styles from './Order.less';

const Item = List.Item;
const alert = Modal.alert;
const times = [
  [
    {
      label: '2017-09-01(周五)',
      value: '2017-09-01',
    },
    {
      label: '2017-09-02(周六)',
      value: '2017-09-02',
    },
    {
      label: '2017-09-03(周日)',
      value: '2017-09-03',
    },
    {
      label: '2017-09-04(周一)',
      value: '2017-09-04',
    },
  ],
  [
    {
      label: '9:00',
      value: '9:00',
    },
    {
      label: '10:00',
      value: '10:00',
    },
    {
      label: '11:00',
      value: '11:00',
    },
  ],
];
function Order(props) {
  const {dispatch} = props;
  const {currentData} = props.order;
  console.log(props.location.query)
  const {list} = props.serviceaddress;
  const {getFieldProps,getFieldsValue,setFieldsValue} = props.form;
  const radioIcon = <img src={require('../assets/icon_radio.png')} style={{width:'.36rem',height:'.36rem'}}/>;
  const data = {...currentData,...getFieldsValue(null)};
  const {addressId} = data;
  let addr = null;
  if(list.length>=addressId+1){
    addr = {...list[addressId]}
  }
  let bookTime = times[0][0].value+' '+times[1][0].value;
  return (
    <div className={styles.normal}>
      <NavBar
        mode="dark"
        onLeftClick={() => {props.history.goBack()}}
      >提交订单</NavBar>
      <List className="zrcf-hide">
        <InputItem
          type="hidden"
          {...getFieldProps('payway',{
            initialValue: data.payway
          })}
        />
        <InputItem
          type="hidden"
          {...getFieldProps('addressId',{
            initialValue: addressId
          })}
        />
        <InputItem
          type="hidden"
          {...getFieldProps('showModal',{
            initialValue: data.showModal
          })}
        />
        <InputItem
          type="hidden"
          {...getFieldProps('bookTime',{
            initialValue: data.bookTime
          })}
        />
      </List>

      <div id={styles['section-service']} className="ph-30 flex-row flex-jc-sb ai-center">
        <div>收银电脑安装服务</div>
        <div>价格：<span className="color-orange">150</span>元</div>
      </div>

      <div id={styles['section-address']} className="mt-20 ph-30 flex-col flex-jc-center" onClick={() => {
        dispatch({
          type:'order/syncCurrentData',
          payload:getFieldsValue(null)
        })
        props.history.push('/serviceaddress/order')
      }}>
        {
          addr?(<div><div><span>{addr.storeName?addr.storeName:addr.contactName}</span><span style={{marginLeft:'.5rem'}}>{addr.contactTel}</span></div>
            <div style={{marginTop:'.38rem'}} className="fs-24 color-6">{addr.address}</div></div>):(<div className="color-de">请选择服务地址</div>)
        }

        <Icon type="right" className="icon-align-rc color-be"/>
      </div>

      <div className="mt-20 ph-30 zrcf-list">
        <div className="zrcf-list-item flex-row ai-center flex-jc-sb" onClick={()=>{
          setFieldsValue({"showModal":data.showModal=='1'?'0':'1'})
        }}>
          <div>预约上门时间</div>
          <div style={{marginRight:'.6rem'}}>{data.bookTime}</div>
          <Icon type="right" className="icon-align-rc color-be"/>
        </div>
        <div className="zrcf-list-item flex-row ai-center flex-jc-sb">
          <div>服务价格<img src={require('../assets/why.png')} className="wh-30 va-middle ml-20" onClick={()=>{
            props.history.push('/serviceoffer')
          }}/></div>
          <div><span className="color-orange">150</span>元</div>
        </div>
      </div>
      <List className="mt-20">
        <Item><span className="fs-30 color-3">故障描述</span></Item>
        <TextareaItem
          {...getFieldProps('remark', {
            initialValue:data.remark,
            rules: [{required: true, message: '故障描述不能为空'}]
          })}
          style={{height:'1.6rem'}}
          rows={2}
          placeholder="请输入故障描述"
        />
      </List>
      <List className="mt-20">
          <Item extra={<div className="fs-30 color-6"><span className="color-orange">4</span><span>次上门服务套餐卡</span></div>} onClick={() => {}}>
            一卡通
          </Item>
          <Item extra={data.payway=='WCP'?radioIcon:''} onClick={() => {setFieldsValue({'payway':'WCP'})}}>
            微信支付
          </Item>
          <Item extra={data.payway=='BMP'?radioIcon:''} onClick={() => {setFieldsValue({'payway':'BMP'})}}>
            余额支付
          </Item>
      </List>
      <List className="mt-20">
          <Item arrow="horizontal" extra={<div className="fs-30 color-orange">优惠券已选一张¥50.00</div>} onClick={() => {}}>
            优惠券
          </Item>
      </List>

      <div id={styles['section-price']} className="mt-20 ph-30 flex-col flex-jc-center">
        <div className="flex-row flex-jc-sb ai-center">
          <div className="color-9">收银电脑安装服务</div>
          <div><span className="color-orange">150</span>元</div>
        </div>
        <div className="mt-30 flex-row flex-jc-sb ai-center">
          <div className="color-9">优惠券</div>
          <div><span className="color-orange">-50</span>元</div>
        </div>
        <div className="mt-30 flex-row flex-jc-sb ai-center">
          <div className="color-9">应付金额</div>
          <div><span className="color-orange">100</span>元</div>
        </div>
      </div>

      <div className="zrcf-btn-group flex-row fixed-lb width-full">
        <div className="bg-color-f wp-6 flex-col flex-jc-center ai-center fs-32 color-3"><div>应付金额：<span className="color-orange">100</span>元</div></div>
        <Button className="zrcf-btn wp-6" type="primary" onClick={()=>{}}>确认下单</Button>
      </div>



      <Modal
        style={{width:'92%'}}
        className="time-modal"
        transparent
        maskClosable={false}
        visible={data.showModal==1}
        footer={[
          { text: '取消', onPress: () => {
            setFieldsValue({'showModal':'0'})
          }},{ text: '确定', onPress: () => {
            setFieldsValue({'showModal':'0','bookTime':bookTime})
          }}
        ]}
        platform="ios"
      >
        <PickerView
          value={[times[0][0].value,times[1][0].value]}
          onChange={(val)=>{
              bookTime = val[0]+' '+val[1];
          }}
          data={times}
          cascade={false}
        />
      </Modal>

    </div>



  );
}

function mapStateToProps(state) {
  return {...state};
}
const OrderWrapper = createForm()(Order);
export default connect(mapStateToProps)(OrderWrapper);
