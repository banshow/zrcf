import dva from 'dva';
import { hashHistory } from 'dva/router';
import {Toast} from 'antd-mobile';
import './index.less';
// 1. Initialize
const ERROR_MSG_DURATION = 2; // 3 秒

// 1. Initialize
const app = dva({
  history: hashHistory,
  onError(e) {
    if(e.id == 100){
      Toast.info(e.message, ERROR_MSG_DURATION);
      let fromurl = encodeURIComponent(location.pathname+location.search);
      hashHistory.replace('/login?from='+fromurl)
      return;
    }
    if(e.id=='network'){
      Toast.offline(e.message, ERROR_MSG_DURATION);
      return;
    }
    Toast.info(e.message, ERROR_MSG_DURATION);
  },
});
app.model(require("./models/home"));
app.model(require("./models/servicecard"));
app.model(require("./models/coupon"));
app.model(require("./models/invoice"));
app.model(require("./models/recharge"));
app.model(require("./models/servicetype"));

app.model(require("./models/user"));

app.model(require("./models/serviceaddress"));

app.model(require("./models/order"));

app.model(require("./models/findpassword"));

app.model(require("./models/register"));

app.model(require("./models/login"));

// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/example'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
