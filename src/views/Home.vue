<template>
  <div class="home">
    <div class="ui horizontal statistic">
      売り上げ金額
      <div class="label">￥</div>
      <div class="value">{{sum_price}}</div>
    </div>
    <div class="ui horizontal statistic">
      売り上げ個数
      <div class="value">{{sum_num}}</div>
      <div class="label">個</div>
    </div>
  <div class="ui cards" v-for="(item,key) in items" :key="key">
    <div class="card">
      <a class="ui bule label" v-if="item.sex == '男'">
        男
        <div class="detail">{{item.age}}</div>
        <div class="detail">{{item.buyTime.getFullYear()}}/{{item.buyTime.getMonth()}}/{{item.buyTime.getDay()}}</div>
      </a>
      <a class="ui red label" v-else-if="item.sex == '女'">
        女
        <div class="detail">{{item.age}}</div>
        <div class="detail">{{item.buyTime.getFullYear()}}/{{item.buyTime.getMonth()}}/{{item.buyTime.getDay()}}</div>
      </a>
      <div class="ui relaxed divided list" v-for="(goods, index) in item.items" :key="index">
        {{goods.item_name}}   {{goods.item_count}}個   {{goods.item_price}}円
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import 'firebase/firestore'
export default {
  data: function () {
    return {
      db: null,
      items: [],
      sum_price: 0,
      sum_num: 0
    }
  },
  created: function () {
    this.db = firebase.firestore()
    let _this = this
    this.db.collection('historys').onSnapshot(function (querySnapshot) {
      _this.items = []
      querySnapshot.forEach(function (doc) {
        var data = doc.data()
        data.id = doc.id
        data.buyTime = data.buyTime.toDate()
        for (let i = 0; i < data.items.length; i++) {
          _this.sum += data.items[i].item_price
        }
        _this.items.push(data)
      })
    })
  }
}
</script>
