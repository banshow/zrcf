import React from 'react';
import { connect } from 'dva';
import {Button, Result, Icon, WhiteSpace} from 'antd-mobile';
import styles from './Result.less';

function ResultPage(props) {
  return (
    <div className={styles.normal}>
      <div className="flex-col ai-center flex-jc-center height-full">
        <Result
          img={<Icon type="check-circle" className={styles.icon} style={{ fill: '#1F90E6' }} />}
          title="支付成功"
          message=""
        />
      </div>
    </div>
  );
}

function mapStateToProps({user}) {
  return {user};
}

export default connect(mapStateToProps)(ResultPage);
