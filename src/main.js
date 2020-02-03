import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import firebase from 'firebase'

Vue.config.productionTip = false

const firebaseConfig = {
  apiKey: 'AIzaSyDfV3w0JzNvRClj-PiTpd0USJecqK_sEBI',
  authDomain: 'event-analyze.firebaseapp.com',
  databaseURL: 'https://event-analyze.firebaseio.com',
  projectId: 'event-analyze',
  storageBucket: 'event-analyze.appspot.com',
  messagingSenderId: '929300820213',
  appId: '1:929300820213:web:9cf4b9722ead6af38b55bc',
  measurementId: 'G-XJBRH5VGC4'
}

firebase.initializeApp(firebaseConfig)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
