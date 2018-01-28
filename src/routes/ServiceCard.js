import React from 'react';
import {connect} from 'dva';
import {NavBar, Button, List, InputItem, Toast} from 'antd-mobile';
import styles from './ServiceCard.less';
const Item = List.Item;
const Brief = Item.Brief;
function ServiceCard({dispatch, history, servicecard}) {
  const {cardData, typeData} = servicecard;
  const keys = Object.keys(cardData) || [];
  return (
    <div className={styles.normal}>
      <NavBar
        mode="dark"
        onLeftClick={() => {
          history.goBack()
        }}
      >服务套餐卡</NavBar>
      <List id={styles['my-list']}>
        {(typeData).map((v) => (
          !cardData[v.id] ?
            <Item multipleLine extra={<div className="btn-min">派单</div>} key={v.id}>
              <div className="lh-1 fs-32">{v.title}</div>
              <div className="lh-1 fs-32 color-orange" style={{marginTop: '.46rem'}}>剩余：{cardData[v.id].amount}次</div>
              <div className={styles['valid-time']}>{v.validity}</div>
            </Item> :
            <Item multipleLine extra={<div className="btn-min" onClick={(e) => {
              e.stopPropagation();
              dispatch({type: 'servicecard/pay',param:{
                cart_type_id:v.id,
                return_url:encodeURIComponent(location.href)
              }});
            }}>购买</div>} key={v.id}>
              <div className="lh-1 fs-32">{v.title}</div>
              <div className="lh-1 fs-32 color-orange" style={{marginTop: '.46rem'}}>{v.amount}元</div>
              <div className={styles['valid-time']}>{v.validity}</div>
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
