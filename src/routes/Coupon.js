import React from 'react';
import { connect } from 'dva';
import {NavBar,Button,List,InputItem,Toast,Tabs} from 'antd-mobile';
import styles from './Coupon.less';

const TabPane = Tabs.TabPane;
function Coupon({dispatch,history,coupon}) {
  const {all,available,haveUsing,overdue} = coupon.couponData;
  return (
    <div className={styles.normal}>
      <NavBar
        mode="dark"
        onLeftClick={() => {history.goBack()}}
      >优惠券</NavBar>
      <Tabs defaultActiveKey="1">
        <TabPane tab="未使用" key="1">
          <div className={styles['coupon-list']}>
            {(available||[]).map((v,i)=>(
              <div className="item" key={v.id}>
                <div className="head flex-col jc-ai-center ai-center color-f">
                  <div className="lh-1 fs-60">¥{v.only_amount}</div>
                  <div className="mt-30 lh-1 fs-24">满{v.amount}元可用</div>
                </div>
                <div className="body flex-col">
                  <div className="mt-48 lh-1 fs-28 color-3">{v.name}</div>
                  <div className="mt-43 lh-1 zrcf-single-line fs-24 color-orange" style={{width:'3.84rem'}}>使用条件：限维修类服务、安装类服务</div>
                  <div className="mt-24 lh-1 fs-24 color-orange">有效期至：{v.end_date}</div>
                </div>
              </div>
            ))}
          </div>
        </TabPane>
        <TabPane tab="已使用" key="2">
          <div className={styles['coupon-list']}>
            {(haveUsing||[]).map((v,i)=>(
              <div className="item" key={v.id}>
                <div className="head gray flex-col jc-ai-center ai-center color-f">
                  <div className="lh-1 fs-60">¥{v.only_amount}</div>
                  <div className="mt-30 lh-1 fs-24">满{v.amount}元可用</div>
                </div>
                <div className="body flex-col">
                  <div className="mt-48 lh-1 fs-28">{v.name}</div>
                  <div className="mt-43 lh-1 zrcf-single-line fs-24" style={{width:'3.84rem'}}>使用条件：限维修类服务、安装类服务</div>
                  <div className="mt-24 lh-1 fs-24">有效期至：{v.end_date}</div>
                </div>
              </div>
            ))}
          </div>
        </TabPane>
        <TabPane tab="过期" key="3">
          <div className={styles['coupon-list']}>
            {(overdue||[]).map((v,i)=>(
              <div className="item" key={v.id}>
                <div className="head gray flex-col jc-ai-center ai-center color-f">
                  <div className="lh-1 fs-60">¥{v.only_amount}</div>
                  <div className="mt-30 lh-1 fs-24">满{v.amount}元可用</div>
                </div>
                <div className="body flex-col">
                  <div className="mt-48 lh-1 fs-28">{v.name}</div>
                  <div className="mt-43 lh-1 zrcf-single-line fs-24" style={{width:'3.84rem'}}>使用条件：限维修类服务、安装类服务</div>
                  <div className="mt-24 lh-1 fs-24">有效期至：{v.end_date}</div>
                </div>
              </div>
            ))}
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
}

function mapStateToProps(state) {
  return {...state};
}

export default connect(mapStateToProps)(Coupon);
