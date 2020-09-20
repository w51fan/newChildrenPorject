<template>
  <div class="myIntegralPage">
    <van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft" :width="360">
      <template #title>
        <div class="navTitle">用户反馈</div>
      </template>
    </van-nav-bar>
    <van-field v-model="message" rows="6" autosize type="textarea" placeholder="输入您的意见或建议…" />
    <div class="submitBtn" @click="go">
      <div>提交意见</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "myIntegralPage",
  data() {
    return {};
  },
  methods: {
    onClickLeft() {},
    go() {
      //   this.$router.push({
      //     name: 'loginPage',
      //   });
    }
  }
};
</script>

<style lang="less">
.myIntegralPage {
  .navTitle {
    font-size: 18px;
    font-weight: 600;
  }
  /deep/.van-field__body {
    background: #f2f2f2;
    .van-field__control {
      padding: 10px;
    }
  }
  /deep/.van-cell::after {
    border-bottom: none;
  }
  .submitBtn {
    text-align: center;
    margin: auto;
    width: 240px;
    padding: 20px;
    background: url("../assets/btn_jinrupingtai@2x.png") no-repeat center;
    // background: rgba(197, 53, 42);
    color: white;
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 35px;
    margin-top: 20px;
    &:hover {
      background: rgba(197, 53, 42, 0.5);
    }
  }
}
</style>
