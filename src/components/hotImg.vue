<template>
 	<!--第一名相片展示区域100%  -->
    <!-- <div id="first_one" class="rel w100" v-for="item in list">
  		<div title="' + item.rownum + '.' + item.productName + '" data-school="' + item.productName + '">
        <div class="icons">
          <div class="hot_pic ab">
            <span class="ab">Hot</span>
            <img src="img/hot-icon.png" alt="热门标志">
          </div>
          <div class="tick_pic ab bs100" data-id="' + item.productId + '"></div>
        </div>
        <div class="pic">
          <img class="w100" data-src="' + item[img] + '" src="' + item[img] + '" alt="第一名图片">
        </div>
        <div class="pic_msg ab w100 bs_bb">
          <p class="msg_title">
            <span class="list"> rownum + </span>
            <span>.</span>
            <span class="school_name"> item.productName + </span>
          </p>
          <div class="first">
            <div class="author fl">
              <span>作者: </span>
              <span class="elp"> item.author + </span>
            </div>
            <div class="like fr">
              <div  data-vote="false" class="like_num"> item.voteNum + </div>
            </div>
          </div>
        </div>
      </div>
    </div> -->
</template>

<script>
export default {
  data () {
    return {
      list: []
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
