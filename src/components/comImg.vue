<template>

  <!--剩下队伍相片展示，分为两列  -->
    <div id="other_pics">
        <!--相片外面的盒子，一个盒子显示两张相片  -->
        <div class="pic_box w100" v-for="(item,index) in list">
            <!--下面为单独的相片  -->
            <div class="pic_wrap bs_bb fl">
              <div :title='item.rownum+ "."+item.productName' class="pic_wrap_inner rel" :class="{bd: isTick}">
               <div :data-school="item.productName">
                  <div @click="tickPic()" :class="{ yel_tick: isTick }" class="tick_pic ab bs100" :data-id="item.productId"></div>
                  <div class="pic" @click="showVotePage">
                    <img class="bor_tb w100 bs_bb" :src="item.productUrl">
                  </div>
                  <div class="pic_msg ab w100 bs_bb">
                    <div class="msg_other">
                      <div class="author fl">
                        <span class="list"> {{item.rownum}} </span>
                        <span>.</span>
                        <span class="elp"> {{item.author}}</span>
                      </div>
                      <div class="like fr">
                        <div :class="{yel_heart:isTick}" class="like_num"> {{item.voteNum}}</div>
                      </div>
                    </div>
                  </div>
              </div> 
            </div>
          </div>
        </div>
        <!--相片外面的盒子结束  -->
    </div>
    <!--其他图片展示结束  -->
</template>

<script>
import axios from 'axios'
import {mapState} from 'vuex'
export default {
  data () {
    return {
      page: 0,
      isTick: false,
      list: []
    }
  },
  mounted () {
    this.showImg(this.page)
  },
  computed: {
    ...mapState([
      'loading',
      'voteBtn',
      'votePage',
      'datas',
      'tick'
    ])
  },
  methods: {
    // 点击小勾，选择当前对象
    tickPic: function () {
      this.isTick = !this.$store.state.tick
      this.$store.dispatch('getTickPic', !this.$store.state.tick)
      this.$store.dispatch('getVoteBtn', !this.$store.state.voteBtn)
    },
    // 点击图片，显示投票页面
    showVotePage: function () {
      this.$store.dispatch('getVotePage', !this.$store.state.votePage)
    },
    // 加载数据到页面
    showImg: function (page) {
      var _this = this
      // this.$http.get('../js/data.js').then(function (datas) {
      //   console.log('加载本地json文件成功')
      //   console.log(datas)
      //   _this.list = datas.bodyText
      //   console.log(_this.list)
      // }, function (error) {
      //   console.log(error)
      // })
      axios.get(
          'http://uc.nfapp.southcn.com/amuc/api/mileMoments/productInfos', {
            params: {
              page: page,
              orderType: 'hot',
              pageRows: 10
            }
          }
        ).then(function (response) {
          // console.log('加载成功')
          console.log(response.data)
          // var datas = response.data
         // var totalPerson = datas.totalProductsNum
        //  _this.$store.dispatch('getDatas', response.data.list)
        //  console.log(_this.$store.datas)
          _this.list = response.data.list
        }, function (error) {
          // console.log('加载出错')
          console.log(error)
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
