import React from 'react';
import {connect} from 'dva';
import {createForm} from 'rc-form';
import {NavBar, Icon, Button, InputItem, List, Toast,ImagePicker} from 'antd-mobile';
import styles from './AddressForm.less';


function AddressForm(props) {
  const {type, id} = props.params;
  const {getFieldProps} = props.form;
  const {files,currentData} = props.serviceaddress;
  return (
    <div className={styles.normal}>
      <NavBar
        mode="dark"
        onLeftClick={() => {
          props.history.goBack()
        }}
      >{type == 'add' ? '新增' : '编辑'}地址</NavBar>
      <List>
        <InputItem
          {...getFieldProps('name', {
            initialValue: currentData.name||'',
            rules: [{required: true, message: '联系人姓名不能为空'}]
          })}
          placeholder="请输入联系人姓名"
        >联系人</InputItem>
        <InputItem
          {...getFieldProps('address', {
            initialValue: currentData.address||'',
            rules: [{required: true, message: '地址不能为空'}]
          })}
          placeholder="请输入地址"
        >地址</InputItem>
        <InputItem
          {...getFieldProps('phone', {
            initialValue: currentData.phone||'',
            rules: [{required: true,pattern: /^1(3|4|5|7|8)[0-9]\d{8}$/, message: '电话号码格式不正确'}]
          })}
          type="number"
          maxLength={11}
          placeholder="工程师将通过该电话联系您"
        >电话</InputItem>
        <InputItem
          {...getFieldProps('shop_name', {
            initialValue: currentData.shop_name||''
          })}
          placeholder="非门店用户可不填写"
        >补充门店名称</InputItem>
        <InputItem
          disabled
          placeholder="非门店用户可不上传"
        >补充营业执照</InputItem>
      </List>




      <div className="mt-20 flex-col bg-color-f ai-center pt-50">
        <ImagePicker
          className={'my-ip-' + (4 - (files.length % 4 + (files.length == 1?0:1)))}
          files={files}
          onChange={(files, type, index) => {
            if (type == 'add') {
              props.dispatch({
                type: 'serviceaddress/uploadImg',
                files: files,
                begin: () => {
                  Toast.loading("上传中", 0, () => {
                  }, true);
                },
                end: () => {
                  Toast.hide();
                }
              })
            } else {
              props.dispatch({
                type: 'serviceaddress/filesChange',
                files: files
              })
            }

          }}
          selectable={files.length < 1}
        />
      </div>
      <div className="fixed-lb width-full">
        <Button className="zrcf-btn" type="primary" onClick={() => {
          props.form.validateFields((errors, values) => {

            if (errors) {
              for (let f in errors) {
                let errs = props.form.getFieldError(f);
                let errsMsg = errs[0];
                Toast.info(errsMsg, 2);
                return;
              }
            }

            if (type == 'add') {
                props.dispatch({
                  type: 'serviceaddress/insert',
                  param: values,
                  begin:()=>{
                    Toast.loading("提交中", 0, () => {
                    }, true);
                  },
                  success:()=>{
                    Toast.hide();
                    props.history.goBack();
                  },
                  fail:(msg)=>{
                    Toast.hide();
                    Toast.info(msg, 2);
                  }
                });
              } else {
                props.dispatch({
                  type: 'serviceaddress/update',
                  param: {...values,id:id},
                  begin:()=>{
                    Toast.loading("提交中", 0, () => {
                    }, true);
                  },
                  success:()=>{
                    Toast.hide();
                    props.history.goBack();
                  },
                  fail:(msg)=>{
                    Toast.hide();
                    Toast.info(msg, 2);
                  }
                });
              }
          })
        }}>
          保存
        </Button>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {...state};
}
const AddressFormWrapper = createForm()(AddressForm);
export default connect(mapStateToProps)(AddressFormWrapper);
