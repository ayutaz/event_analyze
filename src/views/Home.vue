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
        <div class="ui buttons">
          <router-link :to="{name:'edit',params:{id:item.id}}" class="ui bottom attached button">修正</router-link>
          <button class="ui negative button four wide column" type="button" @click="deleteItem(item.id)">削除</button>
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
      sum_num: 0,
      sum_price: 0
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
          _this.sum_num += Number(item.item_count)
          _this.sum_price += Number(item.item_price)
        })
        data.buyTime = data.buyTime.toDate()
        _this.items.push(data)
      })
      _this.$store.dispatch('updateHistoryList', _this.items)
    })
  },
  methods: {
    deleteItem: function (id) {
      this.db.collection('historys').doc(id).delete().then(function () {
        console.log('Document successfully deleted!')
      }).catch(function (error) {
        console.error('Error removing document: ', error)
      })
    },
    setVariable: function (data) {
      if (typeof (data) !== 'number') return parseInt(data)
    }
  },
  watch: {
  }
}
</script>

<style>

</style>
