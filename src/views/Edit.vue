<template>
    <div class="edit">
        <div class="ui card">
            <div class="content">
                {{age}}
            </div>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase'
import 'firebase/firestore'
export default {
  data () {
    return {
      db: null,
      items: [],
      age: 0,
      sum: 0,
      sex: null,
      buyTime: null
    }
  },
  created () {
    this.db = firebase.firestore()
    let _this = this
    this.db.collection('historys').doc(this.$route.params.id).onSnapshot(function (doc) {
      _this.items = []
      let datas = doc.data()
      datas.buyTime = datas.buyTime.toDate()
      _this.buyTime = datas.buyTime
      _this.age = datas.age
      _this.sex = datas.sex
      _this.items = []
      datas.items.forEach(function (item) {
        _this.items.push(item)
      })
    })
  }
}
</script>
