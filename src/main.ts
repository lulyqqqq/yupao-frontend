import { createApp } from 'vue'
import App from './App.vue'
import {Button, Card, CellGroup, DatePicker, Field, Form,Search, Tabbar, TabbarItem,Tab,Tabs} from 'vant'
import * as VueRouter from 'vue-router'
// Toast
import 'vant/es/toast/style';
import routes from './config/route'
import '../global.css'

const app = createApp(App)

app.use(Tabbar);
app.use(TabbarItem);


const router = VueRouter.createRouter({
  // 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: VueRouter.createWebHistory(),
  routes, // `routes: routes` 的缩写
})

app.use(router)
app.use(Form);
app.use(Field);
app.use(CellGroup);
app.use(Button);
app.use(Card);
app.use(DatePicker);
app.use(Search);
app.use(Tab);
app.use(Tabs);
app.mount('#app')
