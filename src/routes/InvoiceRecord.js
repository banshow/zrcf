import React from 'react';
import {connect} from 'dva';
import {NavBar, Button, List, Modal, InputItem} from 'antd-mobile';
import {createForm} from 'rc-form';
import styles from './InvoiceRecord.less';

function InvoiceRecord({dispatch, history, form, invoice}) {
  const {getFieldProps, getFieldsValue, setFieldsValue} = form;
  const data = {...getFieldsValue(null)};
  return (
    <div className={styles.normal}>
      <NavBar
        mode="dark"
        onLeftClick={() => {
          history.goBack()
        }}
      >开票记录</NavBar>
      <List className="zrcf-hide">
        <InputItem
          type="hidden"
          {...getFieldProps('showModal', {
            initialValue: data.showModal
          })}
        />
      </List>
      <div id={styles['record-list']} className="flex-col">
        {
          invoice.recordList.map(v => {
            const status = v.status;
            let sn = '未知';
            switch (status) {
              case '0':
                sn = '待付款';
                break;
              case '1':
                sn = '待审核';
                break;
              case '2':
                sn = '审核通过';
                break;
              case '3':
                sn = '审核不通过';
                break;
              default:
                sn = '未知';
            }

            return (
              <div className="item ph-30" key={v.id}>
                <div className="mt-46 flex-row flex-jc-sb lh-1 fs-30 color-3">
                  {
                    status == '3' ?
                      <div>审核状态：<span className="color-r">{sn}</span><img className="ml-20 wh-30 va-middle"
                                                                           src={require('../assets/why_b.png')}
                                                                           onClick={() => {
                                                                             setFieldsValue({"showModal": data.showModal == '1' ? '0' : '1'})
                                                                           }}/></div> :
                      <div>审核状态：<span className="color-bp">{sn}</span></div>
                  }

                  <div>金额：<span className="color-orange">¥{v.amount}</span></div>
                </div>
                <div className="mt-40 flex-row flex-jc-sb lh-1 fs-24 color-6">
                  <div>{v.cdate}</div>
                  <div>{v.title}</div>
                </div>
              </div>
            )

          })
        }
      </div>

      <Modal
        style={{width: '92%'}}
        className="time-modal"
        transparent
        maskClosable={false}
        visible={data.showModal == 1}
        footer={[
          {
            text: '确定', onPress: () => {
            setFieldsValue({'showModal': '0'})
          }
          }
        ]}
        platform="ios"
      >
        <div className="flex-col ai-center ph-30">
          <div className="lh-1 fs-32 color-3" style={{marginTop: '.05rem'}}>发票核实信息</div>
          <div className="fs-30 color-3" style={{lineHeight: '.5rem', marginTop: '1.09rem', marginBottom: '.76rem'}}>
            您的发票抬头信息填写不完整,请重新填写后提交
          </div>
        </div>
      </Modal>

    </div>
  );
}

function mapStateToProps(state) {
  return {...state};
}
const InvoiceRecordWrapper = createForm()(InvoiceRecord);
export default connect(mapStateToProps)(InvoiceRecordWrapper);
