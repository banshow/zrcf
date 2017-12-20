import React from 'react';
import {connect} from 'dva';
import styles from './ServiceType.less';
import {TabBar, NavBar, Icon, Carousel, Grid, Button, Tabs, Badge, Card, List, Popup,Toast} from 'antd-mobile';

const TabPane = Tabs.TabPane;
function ServiceType({dispatch,history,servicetype}) {
  const {tabs,types,i,j,day,night} = servicetype;
  const hasPrice = !!day;
  const onTabClick = (key) => {
    if (key == '0') {
      Popup.show(
        <div className="pb-10">
          <div className={styles['pop-head']+' ph-30'}>
            <div className="fs-30 color-4">全部分类</div>
            <Icon type="up" className={styles['down']} onClick={() => {
              Popup.hide()
            }}/>
          </div>
          <div className={styles['pop-body']}>
            <div className={styles['sub-type'] + ' ' + styles['selected']}
                 onClick={() => {

                 }}>税控
            </div>
            <div className={styles['sub-type'] + ''}
                 onClick={() => {

                 }}>收银
            </div>
            <div className={styles['sub-type'] + ''}
                 onClick={() => {

                 }}>点餐
            </div>
            <div className={styles['sub-type'] + ''}
                 onClick={() => {

                 }}>监控
            </div>
          </div>
          <div className={styles['pop-body']} style={{marginBottom:'.25rem'}}>
            <div className={styles['sub-type'] + ''}
                 onClick={() => {

                 }}>网络维护
            </div>
            <div className={styles['sub-type'] + ''}
                 onClick={() => {

                 }}>多媒体
            </div>
            <div className={styles['sub-type'] + ''}
                 onClick={() => {

                 }}>音响
            </div>
            <div className={styles['sub-type'] + ' ' +styles['blank-item']}
                 onClick={() => {

                 }}>
            </div>
          </div>
        </div>)
    }
  }
  return (
    <div className={styles.normal}>
      <NavBar
        mode="dark"
        onLeftClick={() => {history.goBack()}}
      >服务分类</NavBar>
      <Tabs className={styles['st-tabs']} defaultActiveKey="1" onTabClick={onTabClick}>
        {types.map((value, index) => (
          <TabPane tab={value.name} key={index + 1}>
            <div className={styles['type-list']+' flex-col bg-color-f'}>
            {
              new Array(Math.ceil(value.children.length/4)).fill(0).map((p,j)=>
                <div key={j} className={styles['tab-pane'] + ' flex-row ai-center flex-jc-sb'}>
                  {
                    value.children.slice(j*4,4*(j+1)).map((cv, i) => (
                      <div key={j*4+i} className={styles['sub-type'] + ' single-line'+ (cv.selected ? (' ' + styles['selected']) : '')}
                           onClick={() => {
                             dispatch({
                               type: 'servicetype/select',
                               payload: {i: index, j: j*4+i},
                             });
                           }}>{cv.name}</div>
                    ))}
                  {
                    Math.ceil(value.children.length/4)==j+1&&value.children.length%4>0?new Array(4-value.children.length%4).fill(0).map((bv,bi)=>
                      <div key={bi} className={styles['sub-type']+' '+styles['blank-item']}></div>
                    ):''
                  }
                </div>)
            }
            </div>
          </TabPane>
        ))}
      </Tabs>
      <div className="mt-20">
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
                      <div className="zrcf-table-cell br"><span className="color-orange">{hasPrice?day[0].price:300}</span>元</div>
                    </div>
                    <div className="zrcf-table-row">
                      <div className="zrcf-table-cell br"><span className="color-orange">{hasPrice?day[1].price:260}</span>元</div>
                    </div>
                    <div className="zrcf-table-row">
                      <div className="zrcf-table-cell br"><span className="color-orange">{hasPrice?day[2].price:230}</span>元</div>
                    </div>
                    <div className="zrcf-table-row">
                      <div className="zrcf-table-cell br"><span className="color-orange">{hasPrice?day[3].price:220}</span>元</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="zrcf-table-row">
                <div className="zrcf-table-cell" style={{height: '1.5rem'}}>夜间(<span className="color-orange">21:00-07:00</span>)
                </div>
                <div className="zrcf-table-cell">不限</div>
                <div className="zrcf-table-cell br"><span className="color-orange">{hasPrice?night[0].price:350}</span>元</div>
              </div>
            </div>
            <div className="fs-24 color-9">
              <div style={{lineHeight: '.42rem', marginTop: '.31rem'}}>1.根据客户预约的服务时间,预约时间越近,价格越高,反之价格越低。</div>
              <div style={{lineHeight: '.42rem', marginTop: '.02rem'}}>2.夜间服务价格均为350。</div>
            </div>
          </div>
        </div>

        <div className="mt-20 mb-30 bg-color-f ph-30" style={{paddingBottom:'.56rem'}}>
          <div className={styles['section-bar']}>服务流程</div>
          <div className="flex-row flex-jc-sb fs-28 color-b" style={{marginTop:'.36rem'}}>
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
      </div>

      <div className="fixed-lb width-full">
        <Button className="zrcf-btn" type="primary" onClick={()=>{
          if(i==-1||j==-1){
            Toast.info('请选择服务分类')
            return;
          }
          let t = types[i].children[j];
          let cid1 = types[i].id;
          let cid2 = t.id;
          let cname = t.name;
          history.push('/order?cid1='+cid1+'&cid2='+cid2+'&cname='+cname);
        }}>立即派单</Button>
      </div>

    </div>
  );
}

function mapStateToProps({servicetype}) {
  //const { tabs } = state.servicetype;
  return {servicetype};
}

export default connect(mapStateToProps)(ServiceType);
