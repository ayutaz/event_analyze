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
    this.db.collection('historys').doc(this.$route.params.id).onSnapshot(function (doc) {
      let datas = doc.data()
      datas.buyTime = datas.buyTime.toDate()
      this.buyTime = datas.buyTime
      this.age = datas.age
      this.sex = datas.sex
      let _this = this
      _this.items = []
      datas.items.forEach(function (item) {
        _this.items.push(item)
      })
    })
  }
}
</script>
