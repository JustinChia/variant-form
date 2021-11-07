import 'babel-polyfill'
import './utils/debug-console'
import Vue from 'vue'
import axios from "axios";
import App from './App.vue'
import ElementUI from 'element-ui'
import './utils/directive'
import './icons'

import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss'
import '@/iconfont/iconfont.css'

import ViewUI from 'view-design';

import {loadExtension} from '@/extension/extension-loader'
import {viewDesignExtensions} from '@/extension/view-ui/iview-extension-loader'

loadExtension([viewDesignExtensions]);

Vue.use(ElementUI, { size: 'small' })
Vue.use(ViewUI, { size: 'small' })

if (typeof window !== 'undefined') {
  window.axios = axios
}

Vue.config.productionTip = false

new Vue({
  el: "#app",
  render: h => h(App),
})
