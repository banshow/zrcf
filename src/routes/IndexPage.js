/* eslint-disable no-plusplus, global-require */
import React from 'react';
import {connect} from 'dva';
import {TabBar, NavBar, Icon, Carousel, Grid, Button, Tabs, Badge, Card,List,Modal} from 'antd-mobile';
import {createForm} from 'rc-form';
import styles from './IndexPage.less';

const TabPane = Tabs.TabPane;
const alert = Modal.alert;
const data = [
  {icon: require('../assets/shuikong.png'), text: '税控'},
  {icon: require('../assets/shouyin.png'), text: '收银'},
  {icon: require('../assets/diancan.png'), text: '点餐'},
  {icon: require('../assets/jiankong.png'), text: '监控'},
  {icon: require('../assets/wangluoweihu.png'), text: '网络维护'},
  {icon: require('../assets/duomeiti.png'), text: '多媒体'},
  {icon: require('../assets/yinxiang.png'), text: '音响'},
  {icon: require('../assets/gengduo.png'), text: '更多'},
];
class MobileDemo extends React.Component {
  constructor(props) {
    super(props);

    const {tabIndex} = this.props.params;
    let selectedTab= tabIndex?tabIndex:'indexTab';
    let iconName=false;
    let leftContent=<div>北京<Icon type='down'/></div>;
    let navBarTitle='众人创服';
    let navBarMode='dark';
    if(selectedTab == 'orderTab'){
      selectedTab= 'orderTab';
      iconName='left';
      leftContent=null;
      navBarTitle='我的订单';
      navBarMode='dark';
    }else if(selectedTab=='myTab'){
      selectedTab='myTab';
      iconName=false;
      leftContent=<Icon type='left' style={{color: '#666'}}/>;
      navBarTitle=<span className="color-6">个人中心</span>;
      navBarMode='light';
    }

    this.state = {
      selectedTab: selectedTab,
      hidden: false,
      iconName: iconName,
      leftContent: leftContent,
      navBarTitle: navBarTitle,
      navBarMode: navBarMode,
      order:props.order
    };
  }


  componentWillReceiveProps(nextProps) {
    const {tabIndex} = nextProps.params;

    let selectedTab= tabIndex?tabIndex:'indexTab';
    let iconName=false;
    let leftContent=<div>北京<Icon type='down'/></div>;
    let navBarTitle='众人创服';
    let navBarMode='dark';
    if(selectedTab == 'orderTab'){
      selectedTab= 'orderTab';
      iconName='left';
      leftContent=null;
      navBarTitle='我的订单';
      navBarMode='dark';
    }else if(selectedTab=='myTab'){
      selectedTab='myTab';
      iconName=false;
      leftContent=<Icon type='left' style={{color: '#666'}}/>;
      navBarTitle=<span className="color-6">个人中心</span>;
      navBarMode='light';
    }

    this.setState({
      selectedTab: selectedTab,
      hidden: false,
      iconName: iconName,
      leftContent: leftContent,
      navBarTitle: navBarTitle,
      navBarMode: navBarMode,
      order:nextProps.order
    });
  }

  renderIndex(pageText) {
    const hProp = this.state.initialHeight ? {height: this.state.initialHeight,width:'100%'} : {height: '2.6rem',width:'100%'};
    const {bannerData} = this.props.home;
    return (
      <div className="flex-col" style={{height: '100%', paddingBottom: '1.1rem'}}>
        <div className="head-box">
          <Carousel
            className="my-carousel"
            dotStyle={{
              width: '0.1rem',
              height: '0.1rem',
              marginBottom: '0.1rem',
              borderRadius: '50%',
              backgroundColor: 'rgba(255,255,255,0.5)'
            }}
            dotActiveStyle={{
              width: '0.1rem',
              height: '0.1rem',
              marginBottom: '0.1rem',
              borderRadius: '50%',
              backgroundColor: 'rgb(255,255,255)'
            }}
          >
            {bannerData.map((v,ii) => (
              <a key={ii} href={v.link} style={hProp}>
              <img style={hProp} src={v.src} onLoad={() => {
                window.dispatchEvent(new Event('resize'));
              }}/>
              </a>))}
          </Carousel>
        </div>
        <div className="bg-color-f" style={{padding: '0 0.05rem'}}>
          <Grid
            data={data}
            hasLine={false}
            renderItem={dataItem => (
              <div style={{paddingTop: '0.4rem'}}>
                <img src={dataItem.icon} style={{height: '0.48rem'}} alt="icon"/>
                <div style={{color: '#666', fontSize: '0.24rem', marginTop: '0.30rem'}}>
                  <span>{dataItem.text}</span>
                </div>
              </div>
            )}
          />
        </div>
        <div className="mt-20 pv-120 bg-color-f flex-col jc-ai-center">
          <div className="fs-42 color-4">赶快去派单吧</div>
          <div className="mt-34 fs-28 color-7">2000+资深工程师提供服务</div>
          <div className="mt-50">
            <Button className={styles.btn} type="primary" onClick={()=>{this.props.history.push("/servicetype")}}>立即派单</Button>
          </div>
        </div>
      </div>
    );
  }

  renderOrder(pageText) {
    return (
      <div className="flex-col" style={{height: '100%', paddingBottom: '1.1rem'}}>
        <Tabs defaultActiveKey="1">
          <TabPane tab="待付款" key="1">
            <div className="mt-20">
            {
                this.state.order.orderMap?this.state.order.orderMap['dfk']['list'].map((v,i)=>(
                  <Card full style={{border: 'none', paddingBottom: '0'}} key={v.id} onClick={()=>{this.props.history.push('/orderdetail?id='+v.id)}}>
                    <Card.Header
                      style={{height: '1rem', boxSizing: 'border-box', fontSize: '0.3rem', color: '#333'}}
                      title={v.cat_id}
                      extra={<span className="fs-30 color-bp">待付款</span>}
                    />
                    <Card.Body style={{boxSizing: 'border-box', padding: '0 0.3rem'}}>
                      <div className="flex-col flex-jc-center"
                           style={{height: '2.46rem', fontSize: '0.3rem', color: '#333'}}>
                        <div className="">预约上门时间：{v.cdate}</div>
                        <div className="mt-25 flex-row ai-center flex-jc-sb">
                          <div style={{width: '5rem'}} className="single-line">服务地址：{v.address}</div>
                          <div className="btn-min">支付</div>
                        </div>
                        <div className="mt-25">服务价格：<span className="color-orange">¥{v.total_amount}</span></div>
                      </div>
                    </Card.Body>
                  </Card>
                )):''
              }
            </div>
          </TabPane>
          <TabPane tab="待接单" key="2">
            <div className="mt-20">
              {
                this.state.order.orderMap?this.state.order.orderMap['djd']['list'].map((v,i)=>(
                  <Card full style={{border: 'none', paddingBottom: '0'}} key={v.id} onClick={()=>{this.props.history.push('/orderdetail?id='+v.id)}}>
                    <Card.Header
                      style={{height: '1rem', boxSizing: 'border-box', fontSize: '0.3rem', color: '#333'}}
                      title={v.cat_id}
                      extra={<span className="fs-30 color-bp">待接单</span>}
                    />
                    <Card.Body style={{boxSizing: 'border-box', padding: '0 0.3rem'}}>
                      <div className="flex-col flex-jc-center"
                           style={{height: '2.46rem', fontSize: '0.3rem', color: '#333'}}>
                        <div className="">预约上门时间：{v.cdate}</div>
                        <div className="mt-25 flex-row ai-center flex-jc-sb">
                          <div style={{width: '5rem'}} className="single-line">服务地址：{v.address}</div>
                          <div className="btn-min">接单</div>
                        </div>
                        <div className="mt-25">服务价格：<span className="color-orange">¥{v.total_amount}</span></div>
                      </div>
                    </Card.Body>
                  </Card>
                )):''
              }
            </div>
          </TabPane>
          <TabPane tab="服务中" key="3">
            <div className="mt-20">
              {
                this.state.order.orderMap?this.state.order.orderMap['inService']['list'].map((v,i)=>(
                  <Card full style={{border: 'none', paddingBottom: '0'}} key={v.id} onClick={()=>{this.props.history.push('/orderdetail?id='+v.id)}}>
                    <Card.Header
                      style={{height: '1rem', boxSizing: 'border-box', fontSize: '0.3rem', color: '#333'}}
                      title={v.cat_id}
                      extra={<span className="fs-30 color-bp">服务中</span>}
                    />
                    <Card.Body style={{boxSizing: 'border-box', padding: '0 0.3rem'}}>
                      <div className="flex-col flex-jc-center"
                           style={{height: '2.46rem', fontSize: '0.3rem', color: '#333'}}>
                        <div className="">预约上门时间：{v.cdate}</div>
                        <div className="mt-25 flex-row ai-center flex-jc-sb">
                          <div style={{width: '6.9rem'}} className="single-line">服务地址：{v.address}</div>
                        </div>
                        <div className="mt-25">服务价格：<span className="color-orange">¥{v.total_amount}</span></div>
                      </div>
                    </Card.Body>
                  </Card>
                )):''
              }
            </div>
          </TabPane>
          <TabPane tab="已完成" key="4">
            <div className="mt-20">
              {
                this.state.order.orderMap?this.state.order.orderMap['done']['list'].map((v,i)=>(
                  <Card full style={{border: 'none', paddingBottom: '0'}} key={v.id} onClick={()=>{this.props.history.push('/orderdetail?id='+v.id)}}>
                    <Card.Header
                      style={{height: '1rem', boxSizing: 'border-box', fontSize: '0.3rem', color: '#333'}}
                      title={v.cat_id}
                      extra={<span className="fs-30 color-bp">已完成</span>}
                    />
                    <Card.Body style={{boxSizing: 'border-box', padding: '0 0.3rem'}}>
                      <div className="flex-col flex-jc-center"
                           style={{height: '2.46rem', fontSize: '0.3rem', color: '#333'}}>
                        <div className="">预约上门时间：{v.cdate}</div>
                        <div className="mt-25 flex-row ai-center flex-jc-sb">
                          <div style={{width: '6.9rem'}} className="single-line">服务地址：{v.address}</div>
                        </div>
                        <div className="mt-25">服务价格：<span className="color-orange">¥{v.total_amount}</span></div>
                      </div>
                    </Card.Body>
                  </Card>
                )):''
              }
            </div>
          </TabPane>
        </Tabs>
      </div>
    );
  }

  renderMy(pageText) {
    const Item = List.Item;
    return (
      <div className="flex-col"
           style={{height: '100%', borderTop: '0.01rem solid #ddd'}}>
        <div className="flex-col bg-color-f">
          <div className="flex-row ai-center mt-40">
            <img src={require('../assets/head_bg.png')}
                 style={{height: '0.98rem', width: '0.98rem', margin: '0 .24rem 0 .3rem'}}/>
            <div className="fs-32 color-4">137****7616</div>
          </div>
          <div className={styles['asset-box']+''}>
            <div className={styles['asset-item']} onClick={()=>{
              this.props.history.push('/balance')
            }}>
              <div className="fs-32 color-4">{this.props.user.userInfo.amount}</div>
              <div className="mt-30 fs-24 color-9">余额</div>
            </div>
            <div className={styles['asset-item']} onClick={()=>{
              this.props.history.push('/servicecard')
            }}>
              <div className="fs-32 color-4">{this.props.user.userInfo.cardCount}次</div>
              <div className="mt-30 fs-24 color-9">套餐卡</div>
            </div>
            <div className={styles['asset-item']}>
              <div className="fs-32 color-4">{this.props.user.userInfo.jifen}</div>
              <div className="mt-30 fs-24 color-9">积分</div>
            </div>
          </div>
        </div>

        <div className="mt-20">
          <List>
            <Item onClick={()=>{
              this.props.history.push('/serviceaddress')
            }} thumb={require('../assets/fuwudizhi.png')} arrow="horizontal" extra={<span className="fs-28 color-be">包含12家门店</span>}><span className="fs-32 color-3">服务地址</span></Item>
            <Item onClick={()=>{
              this.props.history.push('/coupon')
            }} thumb={require('../assets/youhuiquan.png')} arrow="horizontal"><span className="fs-32 color-3">优惠券</span></Item>
            <Item onClick={()=>{
              this.props.history.push('/invoice')
            }} thumb={require('../assets/wodefapiao.png')} arrow="horizontal"><span className="fs-32 color-3">我的发票</span></Item>
            <Item thumb={require('../assets/lianxikefu.png')} arrow="horizontal"><span className="fs-32 color-3">联系客服</span></Item>
            <Item onClick={()=>{
              alert('', '确定退出吗?', [
                { text: '否', onPress: () => {}},
                { text: '是', onPress: () => {
                  this.props.dispatch({
                    type: 'home/logout',
                    success: () => {
                      this.props.history.replace('/login');
                    }
                  });
                } },
              ])
            }} thumb={require('../assets/exit.png')} arrow="horizontal"><span className="fs-32 color-3">退出</span></Item>
          </List>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        <NavBar
          iconName={this.state.iconName}
          leftContent={this.state.leftContent}
          mode={this.state.navBarMode}
          onLeftClick={() => {
            if(this.state.selectedTab !== 'indexTab'){
              this.props.history.goBack()
            }
          }}
        >{this.state.navBarTitle}</NavBar>
        <TabBar
          unselectedTintColor="#bbc1ca"
          tintColor="#4f8ded"
          barTintColor="white"
          hidden={this.state.hidden}
        >
          <TabBar.Item
            title="首页"
            key="index"
            icon={<div className={styles['home-icon']}/>}
            selectedIcon={<div className={styles['home-icon-sel']}/>}
            selected={this.state.selectedTab === 'indexTab'}
            onPress={() => {

              this.props.history.replace('/');
            }}
            data-seed="logId"
            style={{height: '100%'}}
          >
            {this.renderIndex('生活')}
          </TabBar.Item>
          <TabBar.Item
            title="订单"
            key="order"
            icon={<div className={styles['order-icon']}/>}
            selectedIcon={<div className={styles['order-icon-sel']}/>}
            selected={this.state.selectedTab === 'orderTab'}
            onPress={() => {
              this.props.history.replace("/indexpage/orderTab");
            }}
            data-seed="logId1"
          >
            {this.renderOrder('口碑')}
          </TabBar.Item>
          <TabBar.Item
            title="我的"
            key="my"
            icon={<div className={styles['my-icon']}/>}
            selectedIcon={<div className={styles['my-icon-sel']}/>}
            selected={this.state.selectedTab === 'myTab'}
            onPress={() => {

              this.props.history.replace("/indexpage/myTab");
            }}
          >
            {this.renderMy('我的')}
          </TabBar.Item>
        </TabBar>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {...state};
}

const MobileDemoWrapper = createForm()(MobileDemo);
export default connect(mapStateToProps)(MobileDemoWrapper);
