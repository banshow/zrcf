import React from 'react';
import {Router, Route, IndexRedirect} from 'dva/router';
import * as tokenUtil from './utils/tokenUtil';
import {is_weixin,getQueryString} from './utils/util';

import App from "./routes/App.js";
import Auth from "./routes/Auth.js";
import IndexPage from './routes/IndexPage';

import ServiceType from "./routes/ServiceType.js";

import Login from "./routes/Login.js";

import Register from "./routes/Register.js";

import FindPassword from "./routes/FindPassword.js";

import OrderDetail from "./routes/OrderDetail.js";

import Order from "./routes/Order.js";

import ServiceAddress from "./routes/ServiceAddress.js";

import AddressForm from "./routes/AddressForm.js";

import Balance from "./routes/Balance.js";

import ServiceOffer from "./routes/ServiceOffer.js";

import Recharge from "./routes/Recharge.js";

import ServiceCard from "./routes/ServiceCard.js";

import Coupon from "./routes/Coupon.js";

import Invoice from "./routes/Invoice.js";

import ApplyInvoice from "./routes/ApplyInvoice.js";

import InvoiceRecord from "./routes/InvoiceRecord.js";

function RouterConfig({history}) {
  return (
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRedirect to="/indexpage"/>
        <Route path="/auth" component={Auth} onEnter={(nextState, replaceState) => {
          if(nextState.location.pathname == '/indexpage'){
            return;
          }
          if (!tokenUtil.get()) {
            let fromurl = encodeURIComponent(nextState.location.pathname+nextState.location.search);
            replaceState('/login?from='+fromurl);
            return;
          }



          if(is_weixin()&&(!tokenUtil.getOpenid())){
              let opid = getQueryString("opid");
              if(opid){
                tokenUtil.setOpenid(opid);
                return;
              }
            let rurl = location.href.replace(location.hash,'#'+nextState.location.pathname);
            location.href='http://wx.51zrcf.com/getOpenid/?rurl='+encodeURIComponent(rurl);
          }


        }} onChange={(prevState, nextState, replace) => {
          if(nextState.location.pathname == '/indexpage'){
            return;
          }
          if (!tokenUtil.get()) {
            let fromurl = encodeURIComponent(nextState.location.pathname+nextState.location.search);
            replace('/login?from='+fromurl);
            return;
         }


          if(is_weixin()&&(!tokenUtil.getOpenid())){
            let opid = getQueryString("opid");
            if(opid){
              tokenUtil.setOpenid(opid);
              return;
            }
            let rurl = location.href.replace(location.hash,'#'+nextState.location.pathname);
            location.replace('http://wx.51zrcf.com/getOpenid/?rurl='+encodeURIComponent(rurl));
          }

        }
        }>
          <Route path="/indexpage(/:tabIndex)" component={IndexPage}/>
          <Route path="/servicetype" component={ServiceType}/>
          <Route path="/orderdetail" component={OrderDetail}/>
          <Route path="/order" component={Order}/>
          <Route path="/serviceaddress(/:from)" component={ServiceAddress}/>
          <Route path="/address/:type(/:id)" component={AddressForm}/>
          <Route path="/balance" component={Balance}/>
          <Route path="/serviceoffer" component={ServiceOffer}/>
          <Route path="/recharge" component={Recharge}/>
          <Route path="/servicecard" component={ServiceCard}/>
          <Route path="/coupon" component={Coupon}/>
          <Route path="/invoice" component={Invoice}/>
          <Route path="/applyinvoice" component={ApplyInvoice}/>
          <Route path="/invoicerecord" component={InvoiceRecord}/>
        </Route>
        <Route path="/login" component={Login}/>
        <Route path="/register" component={Register}/>
        <Route path="/findpassword" component={FindPassword}/>
      </Route>
    </Router>
  );
}

export default RouterConfig;
