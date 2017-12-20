import React from 'react';
import { connect } from 'dva';
import {Button} from 'antd-mobile';
import styles from './Balance.less';

function Balance(props) {
  return (
    <div className={styles.normal}>
      <div className="flex-col ai-center" style={{paddingTop:'2.5rem'}}>
        <img src={require('../assets/balance.png')} className="wh-180"/>
        <div className="mt-40 fs-34 color-35">余额</div>
        <div className="color-35 fs-54"  style={{height:'.8rem',lineHeight:'.8rem',marginTop:'.34rem'}}>
          <span className="va-top">¥</span>
          <span className="fs-80 va-top">{props.user.userInfo.amount}</span>
        </div>
      </div>
      <div className="fixed-lb width-full">
        <Button className="zrcf-btn" type="primary" onClick={()=>{
          //let rurl = location.href.replace(location.hash,'#/recharge');
          //location.href='http://wx.51zrcf.com/getOpenid/?rurl='+encodeURIComponent(rurl);
          props.history.replaceState(null,'/recharge');
        }}>
          充值
        </Button>
      </div>
    </div>
  );
}

function mapStateToProps({user}) {
  return {user};
}

export default connect(mapStateToProps)(Balance);
