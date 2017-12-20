import React from 'react';
import { connect } from 'dva';
import {NavBar,Button,List,InputItem,Toast} from 'antd-mobile';
import styles from './ServiceCard.less';
const Item = List.Item;
const Brief = Item.Brief;
function ServiceCard({dispatch,history,servicecard}) {
  const {cardData} = servicecard;
  const keys = Object.keys(cardData) || [];
  return (
    <div className={styles.normal}>
      <NavBar
        mode="dark"
        onLeftClick={() => {history.goBack()}}
      >服务套餐卡</NavBar>
      <List id={styles['my-list']}>
        {(keys).map((v)=>(
        <Item multipleLine extra={<div className="btn-min">派单</div>} key={v}>
          <div className="lh-1 fs-32">{cardData[v].title}</div>
          <div className="lh-1 fs-32 color-orange" style={{marginTop:'.46rem'}}>{cardData[v].amount}元</div>
          <div className={styles['valid-time']}>{cardData[v].validity}</div>
        </Item>
        ))}
      </List>
    </div>
  );
}

function mapStateToProps(state) {
  return {...state};
}

export default connect(mapStateToProps)(ServiceCard);
