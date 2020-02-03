<template>
  <div class="home">
    <div class="ui horizontal statistic">
      <div class="label">￥</div>
      <div class="value"></div>
    </div>
    <p>売り上げ個数:</p>
  <div class="ui cards">
    <div class="card">
      男:20代
      2020/1/1
      <div class="ui relaxed divided list">
        <div class="item">
          悠園物語本   5個   3000円
        </div>
      </div>
    </div>
    <div class="card">
      女:20代
      20201/1
      <div class="ui relaxed divided list">
        <div class="item">
          test1  1個 300円
        </div>
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
      items: []
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
        _this.items.push(data)
        console.log(_this.items)
      })
    })
  }
}
</script>
