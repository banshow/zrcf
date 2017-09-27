import React from 'react';
import { connect } from 'dva';
import {NavBar,Button,List,InputItem,Toast,Tabs} from 'antd-mobile';

function Auth(props) {
  const {history} = props;
  const {title} = props.children.props.route;
  return (
    <div className="height-full">
      {props.children}
    </div>
  );
}

function mapStateToProps({user}) {
  return {user};
}

export default connect()(Auth);
