<template>
  <div class="home ui main container">
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
      <div class="blue card" v-for="(goods, index) in item.items" :key="index">
        <div class="ui header">{{goods.item_name}}  {{goods.item_count}}個</div>
        <div>
          <i class="male blue icon left floated meta" v-if="item.sex == '男'"></i>
          <i class="female red icon left floated meta" v-else-if="item.sex == '女'"></i>
          <i class="user green icon left floated meta" v-else-if="item.sex == 'その他'"></i>
          <div class="left floated detail">{{item.age}}</div>
          <div class="right floated detail">{{item.buyTime.getFullYear()}}/{{item.buyTime.getMonth()}}/{{item.buyTime.getDay()}}</div>
        </div>
        <router-link :to="{name:'edit',params:{id:item.id}}" class="ui bottom attached button">修正</router-link>
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
        data.items.forEach(function (item) {
          _this.sum_price += item.item_price
          _this.sum_num += item.item_count
        })
        data.buyTime = data.buyTime.toDate()
        _this.items.push(data)
      })
      // console.log(_this.items)
      _this.$store.dispatch('updateHistoryList', _this.items)
    })
  },
  methods: {
  }
}
</script>

<style>

</style>
