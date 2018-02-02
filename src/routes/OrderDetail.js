import React from 'react';
import { connect } from 'dva';
import {NavBar, Icon,  Button, InputItem,Modal} from 'antd-mobile';
import styles from './OrderDetail.less';
import {orderStatus} from '../common/dict';
const alert = Modal.alert;
function OrderDetail(props) {
  const {orderDetail} = props.order;
  return (
    <div className={styles.normal}>
      <NavBar
        mode="dark"
        onLeftClick={() => {props.history.goBack()}}
      >订单详情</NavBar>
      <div id={styles['section-step']} className="bg-color-f ph-30 flex-col">
        <div className="flex-row flex-jc-sb fs-28 color-b" style={{marginTop:'.52rem'}}>
          <div className="flex-col ai-center">
            <img src={require('../assets/paidan.png')} className="wh-100"/>
            <div className="mt-30 color-orange">派单</div>
          </div>
          <div className="pt-50 flex-col">
            <img src={require('../assets/arrow.png')} className="wh-20"/>
          </div>
          <div className="flex-col ai-center">
            <img src={require('../assets/jiedan_g.png')} className="wh-100"/>
            <div className="mt-30">工程师接单</div>
          </div>
          <div className="pt-50 flex-col">
            <img src={require('../assets/arrow_g.png')} className="wh-20"/>
          </div>
          <div className="flex-col ai-center">
            <img src={require('../assets/fuwu_g.png')} className="wh-100"/>
            <div className="mt-30">上门服务</div>
          </div>
          <div className="pt-50 flex-col">
            <img src={require('../assets/arrow_g.png')} className="wh-20"/>
          </div>
          <div className="flex-col ai-center">
            <img src={require('../assets/wancheng_g.png')} className="wh-100"/>
            <div className="mt-30">服务完成</div>
          </div>
        </div>
      </div>
      <div id={styles['section-detail']} className="mt-20 ph-30 flex-col flex-jc-center">
          <div className="flex-row">
            <div className="item-title">订单编号</div>
            <div>：{orderDetail.id}</div>
          </div>
          <div className="flex-row">
            <div className="item-title">下单时间</div>
            <div>：{orderDetail.cdate}</div>
          </div>
          <div className="flex-row">
            <div className="item-title">支付方式</div>
            <div>：{orderDetail.yikaitong&&orderDetail.yikaitong!='0'?'一卡通':'在线支付(微信)'}</div>
          </div>
          <div className="flex-row">
            <div className="item-title">订单状态</div>
            <div>：<span className="color-bp">{orderDetail.order_status_txt || orderStatus[orderDetail.order_status]}</span></div>
          </div>
          <div className="flex-row">
            <div className="item-title">工程师</div>
            <div>：<span className="color-bp">张三丰</span></div>
          </div>
          <img id={styles['icon-tel']} src={require('../assets/tel.png')}/>
      </div>

      <div id={styles['section-service']} className="mt-20 ph-30 flex-col flex-jc-center">
        <div>收银电脑安装服务</div>
      </div>

      <div id={styles['section-address']} className="mt-20 ph-30 flex-col flex-jc-center">
        <div><span>{orderDetail.contact_who}</span><span style={{marginLeft:'.5rem'}}>{orderDetail.contact_phone}</span></div>
        <div style={{marginTop:'.38rem'}} className="fs-24 color-6">{orderDetail.address}</div>
      </div>

      <div id={styles['section-time']} className="mt-20 ph-30 flex-row flex-jc-sb ai-center">
        <div>预约服务时间</div>
        <div>{orderDetail.up_time_date}</div>
      </div>
      <div id={styles['section-remark']} className="mt-20 ph-30 flex-col">
        <div className="title">备注</div>
        <div className="content">
          {orderDetail.remark}
        </div>
      </div>

      <div id={styles['section-price']} className="mt-20 ph-30 flex-col flex-jc-center">
        <div className="flex-row flex-jc-sb ai-center">
          <div className="color-9">收银电脑安装服务</div>
          <div><span className="color-orange">{orderDetail.total_amount}</span>元</div>
        </div>
        <div className="mt-30 flex-row flex-jc-sb ai-center">
          <div className="color-9">优惠券</div>
          <div><span className="color-orange">-{orderDetail.coupon_amount}</span>元</div>
        </div>
        <div className="mt-30 flex-row flex-jc-sb ai-center">
          <div className="color-9">应付金额</div>
          <div><span className="color-orange">{orderDetail.need_amount}</span>元</div>
        </div>
      </div>

      <div className="zrcf-btn-group flex-row fixed-lb width-full">
        <Button className={'zrcf-btn flex-grow-1 color-bp'+(orderDetail.order_status=='1'&&!(orderDetail.pay_status=='1'&&orderDetail.need_amount>0)?'':' zrcf-hide')} onClick={()=>{


          alert('', '确定取消该订单吗?', [
            { text: '否', onPress: () => console.log('cancel') },
            { text: '是', onPress: () => {
              props.dispatch({
                type: 'order/cancel'
              });

            } },
          ])




        }}>取消订单</Button>
        <Button className={'zrcf-btn flex-grow-1'+(orderDetail.pay_status=='1'?' zrcf-hide':'')} type="primary"  onClick={() => {
          props.dispatch({type: 'order/pay',param:{
            order_id:orderDetail.id,
            //return_url:encodeURIComponent(location.href.replace(location.search,'').replace(location.hash,'#/orderdetail?id='+orderDetail.id))
            return_url:'#/result/pay4order'
          }});
        }}>立即支付</Button>
      </div>


    </div>
  );
}

function mapStateToProps(state) {
  return {...state};
}

export default connect(mapStateToProps)(OrderDetail);
