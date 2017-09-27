import React from 'react';
import {connect} from 'dva';
import {NavBar, Button, List} from 'antd-mobile';
import styles from './Invoice.less';
const Item = List.Item;
function Invoice({dispatch, history,invoice}) {
  return (
    <div className={styles.normal}>
      <NavBar
        mode="dark"
        onLeftClick={() => {
          history.goBack()
        }}
      >我的发票</NavBar>
      <List className="my-list">
        <Item arrow="horizontal" extra={<div className="fs-28 color-be">可开票金额：<span className="color-orange">¥{invoice.maxAmount}</span></div>} onClick={()=>{
          history.push('/applyinvoice')
        }}>
          <div className="fs-32">申请发票</div>
        </Item>
        <Item arrow="horizontal" onClick={()=>{
          history.push('/invoicerecord')
        }}>
          <div className="fs-32">开票记录</div>
        </Item>
      </List>
    </div>
  );
}

function mapStateToProps(state) {
  return {...state};
}

export default connect(mapStateToProps)(Invoice);
