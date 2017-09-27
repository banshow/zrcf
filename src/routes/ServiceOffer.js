import React from 'react';
import { connect } from 'dva';
import {NavBar, Icon} from 'antd-mobile';
import styles from './ServiceOffer.less';

function ServiceOffer({dispatch,history}) {
  return (
    <div className={styles.normal}>
      <NavBar
        mode="dark"
        onLeftClick={() => {history.goBack()}}
      >服务报价</NavBar>
      <div className="bg-color-f ph-30" style={{paddingBottom:'.51rem'}}>
        <div className={styles['section-bar']}>服务报价</div>
        <div>
          <div className={styles['table-head']}>故障维修服务</div>
          <div id={styles['table']} className="zrcf-table">
            <div className="zrcf-table-row">
              <div className="zrcf-table-cell">服务时间</div>
              <div className="zrcf-table-cell">上门时间要求</div>
              <div className="zrcf-table-cell br">服务价格</div>
            </div>
            <div className="zrcf-table-row">
              <div className="zrcf-table-cell" style={{height: '4rem'}}>日间(<span
                className="color-orange">07:30-21:00</span>)
              </div>
              <div className="zrcf-table-cell" style={{border: 'none'}}>
                <div className="zrcf-table">
                  <div className="zrcf-table-row">
                    <div className="zrcf-table-cell"><span className="color-orange">2</span>小时内</div>
                  </div>
                  <div className="zrcf-table-row">
                    <div className="zrcf-table-cell"><span className="color-orange">4</span>小时内</div>
                  </div>
                  <div className="zrcf-table-row">
                    <div className="zrcf-table-cell"><span className="color-orange">4</span>小时以上(单日)</div>
                  </div>
                  <div className="zrcf-table-row">
                    <div className="zrcf-table-cell">次日夜间</div>
                  </div>
                </div>
              </div>
              <div className="zrcf-table-cell" style={{border: 'none'}}>
                <div className="zrcf-table">
                  <div className="zrcf-table-row">
                    <div className="zrcf-table-cell br"><span className="color-orange">300</span>元</div>
                  </div>
                  <div className="zrcf-table-row">
                    <div className="zrcf-table-cell br"><span className="color-orange">260</span>元</div>
                  </div>
                  <div className="zrcf-table-row">
                    <div className="zrcf-table-cell br"><span className="color-orange">230</span>元</div>
                  </div>
                  <div className="zrcf-table-row">
                    <div className="zrcf-table-cell br"><span className="color-orange">220</span>元</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="zrcf-table-row">
              <div className="zrcf-table-cell" style={{height: '1.5rem'}}>夜间(<span className="color-orange">21:00-07:00</span>)
              </div>
              <div className="zrcf-table-cell">不限</div>
              <div className="zrcf-table-cell br"><span className="color-orange">350</span>元</div>
            </div>
          </div>
          <div className="fs-24 color-9">
            <div style={{lineHeight: '.42rem', marginTop: '.31rem'}}>1.根据客户预约的服务时间,预约时间越近,价格越高,反之价格越低。</div>
            <div style={{lineHeight: '.42rem', marginTop: '.02rem'}}>2.夜间服务价格均为350。</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(ServiceOffer);
