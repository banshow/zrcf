import React from 'react';
import { connect } from 'dva';
import {NavBar,Button,List,InputItem,Toast} from 'antd-mobile';
import styles from './ServiceCard.less';
const Item = List.Item;
const Brief = Item.Brief;
function ServiceCard({dispatch,history}) {
  return (
    <div className={styles.normal}>
      <NavBar
        mode="dark"
        onLeftClick={() => {history.goBack()}}
      >服务套餐卡</NavBar>
      <List id={styles['my-list']}>
        <Item multipleLine extra={<div className="btn-min">购买</div>}>
          <div className="lh-1 fs-32">4次上门服务卡</div>
          <div className="lh-1 fs-32 color-orange" style={{marginTop:'.46rem'}}>1000元</div>
          <div className={styles['valid-time']}>不限有效期</div>
        </Item>
        <Item multipleLine extra={<div className="btn-min">购买</div>}>
          <div className="lh-1 fs-32">7次上门服务卡</div>
          <div className="lh-1 fs-32 color-orange" style={{marginTop:'.46rem'}}>1500元</div>
          <div className={styles['valid-time']}>不限有效期</div>
        </Item>
      </List>
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(ServiceCard);
