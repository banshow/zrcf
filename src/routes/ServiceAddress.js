import React from 'react';
import { connect } from 'dva';
import {NavBar, Icon,  Button, InputItem,TextareaItem,List,Radio,Card,Modal} from 'antd-mobile';
import styles from './ServiceAddress.less';

const alert = Modal.alert;
function ServiceAddress(props) {
  const {dispatch} = props;
  const {list} = props.serviceaddress;
  const {from} = props.params;
  const isEmpty = !(list&&list.length>0);
  return (
    <div className={styles.normal}>
      <NavBar
        mode="dark"
        onLeftClick={() => {props.history.goBack()}}
      >服务地址</NavBar>
      {isEmpty?(<div className="empty-box flex-col flex-jc-center ai-center">
        <img src={require('../assets/noaddress.png')} style={{width:'2rem',height:'2rem'}}/>
        <div className="mt-40 lh-1 fs-34 color-6">还没有服务地址呢</div>
        <div className="lh-1 fs-26 color-9" style={{marginTop:'.28rem'}}>为了更好的体验，赶快去添加吧</div>
      </div>):(
        list.map((v,i)=>(
          <Card full key={v.id}>
            <Card.Header
              title={
                <div className="flex-col flex-jc-center" style={{padding:'.26rem 0'}}>
                  <div className="lh-1 fs-30 color-3">
                    {v.shop_name?v.shop_name:v.name}
                    {v.isv?(<img className="ml-20 wh-32 va-middle" src={require('../assets/v.png')}/>):(<img className="ml-20 wh-32 va-middle" src={require('../assets/uv.png')}/>)}
                  </div>
                  <div className="lh-1 fs-24 color-6" style={{marginTop:'.38rem'}}>{v.address}</div>
                </div>
              }
              onClick={()=>{
                if(from!='order'){
                  return;
                }
                dispatch({
                  type:'order/selectAddress',
                  index:i
                });
                props.history.goBack();

              }}
            />
            <Card.Body>
              <div className="height-full flex-col flex-jc-center fs-26 color-3">
                <div className="flex-row flex-jc-sb">
                  <div className="flex-row ai-center" onClick={()=>{
                    props.dispatch({
                      type:'serviceaddress/setDefault',
                      id:v.id
                    })
                  }}>
                    {v.is_default=='1'?(<img className="wh-36" src={require('../assets/icon_radio.png')}/>):(<img className="wh-36" src={require('../assets/us.png')}/>)}
                    <span className="ml-20">默认地址</span>
                  </div>
                  <div className="flex-row">
                    <div className="flex-row ai-center" onClick={()=>{
                      props.history.push('/address/edit/'+v.id)
                    }
                    }>
                      <img className="wh-34" src={require('../assets/edit.png')}/>
                      <span className="ml-20">编辑</span>
                    </div>
                    <div className="flex-row ai-center ml-40" onClick={()=>{
                      alert('', '确定删除这条服务地址吗?', [
                        { text: '否', onPress: () => console.log('cancel') },
                        { text: '是', onPress: () => {
                          props.dispatch({
                            type:'serviceaddress/del',
                            id:v.id
                          })

                        } },
                      ])

                     }}>
                      <img className="wh-34" src={require('../assets/delete.png')}/>
                      <span className="ml-20">删除</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        ))
      )}

      <div className="fixed-lb width-full">
        <Button className="zrcf-btn" type="primary" onClick={()=>{props.history.push('/address/add')}}>
          ＋新增地址
        </Button>
      </div>

    </div>
  );
}

function mapStateToProps(state) {
  return {...state};
}

export default connect(mapStateToProps)(ServiceAddress);
