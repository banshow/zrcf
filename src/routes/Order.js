import React from 'react';
import * as dateformat  from 'dateformat-util';
import { connect } from 'dva';
import {NavBar, Icon,  Button, InputItem,TextareaItem,List,Modal,Toast,PickerView} from 'antd-mobile';
import { createForm } from 'rc-form';
import styles from './Order.less';

const Item = List.Item;
const alert = Modal.alert;
// const times = [
//   [
//     {
//       label: '2017-09-01(周五)',
//       value: '2017-09-01',
//     },
//     {
//       label: '2017-09-02(周六)',
//       value: '2017-09-02',
//     },
//     {
//       label: '2017-09-03(周日)',
//       value: '2017-09-03',
//     },
//     {
//       label: '2017-09-04(周一)',
//       value: '2017-09-04',
//     },
//   ],
//   [
//     {
//       label: '9:00',
//       value: '9:00',
//     },
//     {
//       label: '10:00',
//       value: '10:00',
//     },
//     {
//       label: '11:00',
//       value: '11:00',
//     },
//   ],
// ];

let ds = [];
let ctime = new Date();
let ctimeStr = dateformat.format(ctime,'yyyy-MM-dd');
let cH = ctime.getHours();
let cM = ctime.getMinutes();
let cS = ctime.getSeconds();
const days = 7;

let fromToday = cH<23;
let startTime = fromToday?ctime:dateformat.addDay(ctime, 1);
let stStr = dateformat.format(startTime,'yyyy-MM-dd');
for(let i = 0;i<days;i++){
  let dStr = dateformat.format(startTime,'yyyy-MM-dd');
  let weekStr = dateformat.getWeek(startTime, WEEKTYPE.ZH_SHORTDAYNAME);
  let d = {label:dStr+'('+weekStr+')',value:dStr};
  ds.push(d);
  dateformat.addDay(startTime, 1)
}
  let ts = [];
  for(let j = fromToday?cH+1:0;j<24;j++){
    let tStr = (j>9?j+'':'0'+j)+':00';
    let t = {label:tStr,value:tStr};
    ts.push(t);
  }
  let normalTs = [];
for(let n = 0;n<24;n++){
  let tStr = (n>9?n+'':'0'+n)+':00';
  let t = {label:tStr,value:tStr};
  normalTs.push(t);
}
const times  = [ds,ts];

let timeVal = [times[0][0].value,times[1][0].value];


function getPrice(timeStr,day,night){

  if(!day||!night){
    return '';
  }
  let time = dateformat.formatToDate(timeStr);
  let h = time.getHours();

  if(h>=21||h<7){
    return night[0]['price'];
  }
  let _2h = 2*60*60*1000;
  let _4h = 2*_2h;
  let dm = time.getTime()-ctime.getTime();

  if(dm<=_2h){
    return day[0]['price'];
  }

  if(dm<=_4h){
    return day[1]['price'];
  }

  if(timeStr.substring(0,10)==ctimeStr.substring(0,10)){
    return day[2]['price'];
  }

  return day[3]['price'];

}

function Order(props) {
  const {dispatch} = props;
  const {currentData} = props.order;
  const {userInfo} = props.user;
  const {day,night} = props.servicetype;
  const {cid1,cid2,cname} = props.location.query;
  const {list} = props.serviceaddress;
  const {getFieldProps,getFieldsValue,setFieldsValue,getFieldValue} = props.form;
  const radioIcon = <img src={require('../assets/icon_radio.png')} style={{width:'.36rem',height:'.36rem'}}/>;
  const data = {...currentData,...getFieldsValue(null)};
  const {addressId,cart_type_id} = data;
  let addr = null;
  if(list.length>=addressId+1){
    addr = {...list[addressId]}
  }
  let timesData = data.times||times;
 // let tv = timesData?[timesData[0][0].value,timesData[1][0].value]:null;
 // let tsd = timesData || times;
 let selectedTime = data.selectedTime || [times[0][0].value,times[1][0].value];
 let bookTime = data.bookTime || [times[0][0].value,times[1][0].value];

 let price = getPrice(bookTime[0]+' '+bookTime[1]+':00',day,night);
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
          {...getFieldProps('cid1',{
            initialValue: cid1
          })}
        />
        <InputItem
          type="hidden"
          {...getFieldProps('cid2',{
            initialValue: cid2
          })}
        />
        <InputItem
          type="hidden"
          {...getFieldProps('cart_type_id',{
            initialValue: cart_type_id
          })}
        />
        <InputItem
          type="hidden"
          {...getFieldProps('addressId',{
            initialValue: addressId,
            rules: [{required: true, message: '服务地址不能为空'}]
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
            initialValue: bookTime,
            rules: [{required: true, message: '预约上门时间不能为空'}]
          })}
        />
        <InputItem
          type="hidden"
          {...getFieldProps('selectedTime',{
            initialValue: selectedTime
          })}
        />
        <InputItem
          type="hidden"
          {...getFieldProps('times',{
            initialValue: data.times
          })}
        />
      </List>

      <div id={styles['section-service']} className="ph-30 flex-row flex-jc-sb ai-center">
        <div>{cname}</div>
        <div>价格：<span className="color-orange">{price}</span>元</div>
      </div>

      <div id={styles['section-address']} className="mt-20 ph-30 flex-col flex-jc-center" onClick={() => {
        dispatch({
          type:'order/syncCurrentData',
          payload:getFieldsValue(null)
        })
        props.history.push('/serviceaddress/order')
      }}>
        {
          addr?(<div><div><span>{addr.shop_name?addr.shop_name:addr.name}</span><span style={{marginLeft:'.5rem'}}>{addr.phone}</span></div>
            <div style={{marginTop:'.38rem'}} className="fs-24 color-6">{addr.address}</div></div>):(<div className="color-de">请选择服务地址</div>)
        }

        <Icon type="right" className="icon-align-rc color-be"/>
      </div>

      <div className="mt-20 ph-30 zrcf-list">
        <div className="zrcf-list-item flex-row ai-center flex-jc-sb" onClick={()=>{
          setFieldsValue({"showModal":data.showModal=='1'?'0':'1'})
        }}>
          <div>预约上门时间</div>
          <div style={{marginRight:'.6rem'}}>{bookTime[0]+' '+bookTime[1]}</div>
          <Icon type="right" className="icon-align-rc color-be"/>
        </div>
        <div className="zrcf-list-item flex-row ai-center flex-jc-sb">
          <div>服务价格<img src={require('../assets/why.png')} className="wh-30 va-middle ml-20" onClick={()=>{
            props.history.push('/serviceoffer')
          }}/></div>
          <div><span className="color-orange">{price}</span>元</div>
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
          <Item extra={<div className="fs-30 color-6"><span className="color-orange">{userInfo.yikatong}</span><span>次上门服务套餐卡</span>{!data.payway&&cart_type_id?radioIcon:''}</div>} onClick={() => {
            dispatch({
              type:'order/syncCurrentData',
              payload:getFieldsValue(null)
            })
            props.history.push('/servicecard?from=order')
          }}>
            一卡通
          </Item>
         <Item extra={data.payway=='wxpay'?radioIcon:''} onClick={() => {setFieldsValue({'payway':'wxpay'})}}>
            微信支付
          </Item>
          <Item extra={data.payway=='wallet'?radioIcon:''} onClick={() => {setFieldsValue({'payway':'wallet'})}}>
            余额支付
          </Item>
      </List>
      {/*<List className="mt-20">*/}
          {/*<Item arrow="horizontal" extra={<div className="fs-30 color-orange">优惠券已选一张¥50.00</div>} onClick={() => {}}>*/}
            {/*优惠券*/}
          {/*</Item>*/}
      {/*</List>*/}

      <div id={styles['section-price']} className="mt-20 ph-30 flex-col flex-jc-center">
        <div className="flex-row flex-jc-sb ai-center">
          <div className="color-9">{cname}</div>
          <div><span className="color-orange">{price}</span>元</div>
        </div>
        <div className="mt-30 flex-row flex-jc-sb ai-center">
          <div className="color-9">优惠券</div>
          <div><span className="color-orange">0</span>元</div>
        </div>
        <div className="mt-30 flex-row flex-jc-sb ai-center">
          <div className="color-9">应付金额</div>
          <div><span className="color-orange">{price}</span>元</div>
        </div>
      </div>

      <div className="zrcf-btn-group flex-row fixed-lb width-full">
        <div className="bg-color-f wp-6 flex-col flex-jc-center ai-center fs-32 color-3"><div>应付金额：<span className="color-orange">{price}</span>元</div></div>
        <Button className="zrcf-btn wp-6" type="primary" onClick={()=>{
          props.form.validateFields((errors, values) => {
            if (errors) {
              for (let f in errors) {
                let errs = props.form.getFieldError(f);
                let errsMsg = errs[0];
                Toast.info(errsMsg, 2);
                return;
              }
            }
            if(!getFieldValue('cart_type_id') && !getFieldValue('payway')){
              Toast.info('请选择支付方式', 2);
              return;
            }
              props.dispatch({
                type: 'order/insert',
                param: {addr:addr,...values},
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

        }}>确认下单</Button>
      </div>



      <Modal
        style={{width:'92%'}}
        className="time-modal"
        transparent
        maskClosable={false}
        visible={data.showModal==1}
        footer={[
          { text: '取消', onPress: () => {
          if(bookTime[0]==ctimeStr){
            setFieldsValue({'showModal':'0','times':times,'selectedTime':bookTime})
          }else{
            setFieldsValue({'showModal':'0','selectedTime':bookTime})
          }

          }},{ text: '确定', onPress: () => {
            setFieldsValue({'showModal':'0','bookTime':selectedTime})
          }}
        ]}
        platform="ios"
      >
        <PickerView
          value={selectedTime}
          onChange={(val,i)=>{
            if(i==0){
             if(fromToday&&val[0]==ctimeStr){
                setFieldsValue({'times':times,selectedTime:[val[0],times[1][0].value]})
             }else{
                setFieldsValue({'times':[times[0],normalTs],selectedTime:[val[0],normalTs[0].value]})
              }
            }else{
              setFieldsValue({selectedTime:[selectedTime[0],val[1]]})
            }
            {/*bookTime = val[0]+' '+val[1];*/}
          }}
          data={timesData}
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
