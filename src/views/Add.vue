<template>
    <div class="add">
        <!-- <form class="ui form">
            <div class="field">
                <label>商品</label>
                <div class="ui labeled input">
                    <div class="label">商品名</div>
                    <input v-model="items['1'].name">
                </div>
                <div class="ui labeled input">
                    <div class="label">個数</div>
                    <input v-model="items['1'].count">
                </div>
                <div class="ui labeled input">
                    <div class="label">値段</div>
                    <input v-model="items['1'].price">
                </div>
            </div>
            <div class="field">
                <label>性別</label>
                <input v-model="sex" type="radio" value="男">
                <label>男</label>
                <input v-model="sex" type="radio" value="女">
                <label>女</label>
            </div>
            <div class="field">
                <label>年齢</label>
                <div class="ui selection dropdown">
                  <input type="hidden" name="性別">
                  <i class="dropdown icon"></i>
                  <div class="default text">性別</div>
                  <div class="menu">
                    <div class="item" data-value="1">男</div>
                    <div class="item" data-value="0">女</div>
                  </div>
                </div>
            </div>
            <button class="ui button" v-on:click="addItems">追加</button>
        </form> -->
        <input v-model="age" type="number">
        <button v-on:click="addItems()">テスト追加</button>
    </div>
</template>

<script>
import firebase from 'firebase'
import 'firebase/firestore'
export default {
  name: 'add',
  data: function () {
    return {
      db: null,
      // sum: '',
      // sex: '',
      age: ''
      // items: {
      //   1: {
      //     name: '',
      //     count: '',
      //     price: ''
      //   }
      // }
    }
  },
  created: function () {
    this.db = firebase.firestore()
  },
  methods: {
    addItems: function () {
      var _this = this

      // todos コレクションにドキュメントを追加
      this.db.collection('historys').add({
        // sum: _this.sum,
        // sex: _this.sex,
        age: _this.age
        // items: {
        //   1: {
        //     name: _this['1'].name,
        //     count: _this['1'].count,
        //     price: _this['1'].price
        //   }
        // }
      })
        .then(function () {
        // 追加に成功したら、name を空にする
          // _this.sum = ''
          // _this.sex = ''
          _this.age = ''
          // _this['1'].name = ''
          // _this['1'].count = ''
          // _this['1'].count = ''
        })
        .catch(function () {
        // エラー時の処理
          console.log('dbの追加エラー')
        })
    }
  }
}
</script>
