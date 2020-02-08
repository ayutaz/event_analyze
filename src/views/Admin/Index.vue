<template>
    <div class="adminIndex">
        <div class="ui buttons" v-for="(item,key) in items" :key="key">
            <router-link :to="{name:'adminEdit',params:{id:item.id}}" class="ui blue big button">{{item.item_name}}</router-link>
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
      items: []
    }
  },
  created () {
    this.db = firebase.firestore()
    let _this = this
    this.db.collection('items_index').onSnapshot(function (querySnapshot) {
      _this.items = []
      querySnapshot.forEach(function (doc) {
        let data = doc.data()
        data.id = doc.id
        _this.items.push(data)
      })
    })
  }
}
</script>
