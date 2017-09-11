<template>
<!--banner图片  -->
    <div class="header_pic rel">
        <img class="banner" src="../assets/banner.png" alt="最酷毕业季广东高校摄影大赛">
        <img @click="showIntroPic()" class="intro ab" src="../assets/activity-info.png" alt="活动介绍">
    </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  data () {
    return {
    }
  },
  props: ['hideIntro'],
  computed: {
    ...mapState([
      'introPic'
    ])
  },
  methods: {
    showIntroPic: function () {
      this.$store.dispatch('getIntroPic', true)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
