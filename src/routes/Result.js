import React from 'react';
import { connect } from 'dva';
import {Button, Result, Icon, WhiteSpace} from 'antd-mobile';
import styles from './Result.less';

const data = {
  order:{
    title:'支付成功',
    message:'派单成功'
  },
  pay4order:{
    title:'支付成功',
    message:''
  },
  recharge:{
    title:'支付成功',
    message:'充值成功'
  },
  card:{
    title:'支付成功',
    message:'套餐卡购买成功'
  }
}

function ResultPage(props) {
  const {type} = props.params;
  const d = data[type];
  return (
    <div className={styles.normal}>
      <div className="flex-col ai-center flex-jc-center height-full">
        <Result
          img={<Icon type="check-circle" className={styles.icon} style={{ fill: '#1F90E6' }} />}
          title={d.title}
          message={d.message}
        />
      </div>
    </div>
  );
}

function mapStateToProps({user}) {
  return {user};
}

export default connect(mapStateToProps)(ResultPage);
