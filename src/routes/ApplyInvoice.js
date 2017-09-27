import React from 'react';
import { connect } from 'dva';
import {NavBar,Button,List,InputItem,Toast,Switch} from 'antd-mobile';
import { createForm } from 'rc-form';
import styles from './ApplyInvoice.less';
const Item = List.Item;
function ApplyInvoice({dispatch,history,form,invoice}) {
  const {getFieldProps,getFieldsValue,setFieldsValue} = form;
  const data = {...getFieldsValue(null)};
  return (
    <div className={styles.normal}>
      <NavBar
        mode="dark"
        onLeftClick={() => {history.goBack()}}
      >申请开票</NavBar>
      <List className="zrcf-hide">
        <InputItem
          type="hidden"
          {...getFieldProps('invoiceType',{
            initialValue: '0',
            rules: [{required: true, message: '用户类型不能为空'}]
          })}
        />
      </List>
      <List>
      {/*  <Item extra={<div className="fs-32 flex-row ai-center">
          <div className="flex-row ai-center" onClick={()=>{
            setFieldsValue({'invoiceType':'1'})
          }}>
            <img src={require('../assets/'+(data.invoiceType=='1'?'selected':'unselected_g')+'.png')} style={{width:'.32rem',height:'.32rem'}}/>
            <span className="ml-20">个人</span>
          </div>
          <div className="flex-row ai-center" style={{marginLeft:'.6rem'}} onClick={()=>{
            setFieldsValue({'invoiceType':'2'})
          }}>
            <img src={require('../assets/'+(data.invoiceType=='2'?'selected':'unselected_g')+'.png')} style={{width:'.32rem',height:'.32rem'}}/>
            <span className="ml-20">企业</span>
          </div>
        </div>}>
          <div className="fs-32">用户类型</div>
        </Item>*/}
       {/* <InputItem
          {...getFieldProps('f1', {
            initialValue: '增值税普通发票',
            rules: [{required: true, message: '开票记录不能为空'}]
          })}
          placeholder="请输入开票记录"
        >开票记录</InputItem>*/}
        <InputItem
          {...getFieldProps('amount', {
            rules: [{required: true, message: '发票金额不能为空'}]
          })}
          type="money"
          placeholder="请输入发票金额"
        >发票金额</InputItem>
        <Item extra={<div className="fs-30 color-9">可开票金额：<span className="color-orange">¥{invoice.maxAmount}</span></div>}>
          <div></div>
        </Item>
        <InputItem
          {...getFieldProps('title', {
            initialValue: invoice.defaultInvoiceInfo.title,
            rules: [{required: true, message: '发票抬头不能为空'}]
          })}
          placeholder="请填写营业执照上的公司全称"
        >发票抬头</InputItem>
        <InputItem
          {...getFieldProps('sbh', {
            initialValue: invoice.defaultInvoiceInfo.sbh,
            rules: [{required: true, message: '纳税人识别号不能为空'}]
          })}
          placeholder="三证合一的企业填写统一社会信用代码"
        >纳税人识别号</InputItem>
        <InputItem
          {...getFieldProps('content', {
            initialValue: invoice.defaultInvoiceInfo.content,
            rules: [{required: true, message: '发票内容不能为空'}]
          })}
          placeholder="请填写发票内容"
        >发票内容</InputItem>
        <InputItem
          {...getFieldProps('receiver_name', {
            initialValue: invoice.defaultInvoiceInfo.receiver_name,
            rules: [{required: true, message: '收件人不能为空'}]
          })}
          placeholder="请填写收件人"
        >收件人</InputItem>
        <InputItem
          {...getFieldProps('receiver_phone', {
            initialValue: invoice.defaultInvoiceInfo.receiver_phone,
            rules: [{required: true,pattern: /^1(3|4|5|7|8)[0-9]\d{8}$/, message: '联系电话格式不正确'}]
          })}
          type="number"
          maxLength={11}
          placeholder="请填写联系电话"
        >联系电话</InputItem>
        <InputItem
          {...getFieldProps('receiver_address', {
            initialValue: invoice.defaultInvoiceInfo.receiver_address,
            rules: [{required: true, message: '邮寄地址不能为空'}]
          })}
          placeholder="请填写邮寄地址"
        >邮寄地址</InputItem>
        <Item
          extra={<Switch {...getFieldProps('is_default_info', { initialValue: true, valuePropName: 'checked'})} platform="ios"/>}
        >设置为默认开票信息</Item>
        <div className="fixed-lb width-full">
          <Button className="zrcf-btn" type="primary" onClick={()=>{
            form.validateFields((errors, values) => {

              if (errors) {
                for (let f in errors) {
                  let errs = form.getFieldError(f);
                  let errsMsg = errs[0];
                  Toast.info(errsMsg, 2);
                  return;
                }
              }
              dispatch({
                type: 'invoice/save',
                param: values,
                begin:()=>{
                  Toast.loading("提交中", 0, () => {
                  }, true);
                },
                success:()=>{
                  Toast.hide();
                  history.goBack();
                },
                fail:(msg)=>{
                  Toast.hide();
                  Toast.info(msg, 2);
                }
              })
            })
          }}>
            提交
          </Button>
        </div>
      </List>
    </div>
  );
}

function mapStateToProps(state) {
  return {...state};
}
const ApplyInvoiceWrapper = createForm()(ApplyInvoice);
export default connect(mapStateToProps)(ApplyInvoiceWrapper);
