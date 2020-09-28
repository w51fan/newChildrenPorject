<template>
  <div class="childrenHomeListPage">
    <van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft" :width="360">
      <template #title>
        <div class="navTitle">儿童之家列表</div>
      </template>
    </van-nav-bar>
  </div>
</template>

<script>
export default {
  name: 'childrenHomeListPage',
  data() {
    return {};
  },
  methods: {
    onClickLeft() {
      this.$router.push({
        name: 'userCenterPage',
      });
    },
    go() {
      //   this.$router.push({
      //     name: 'loginPage',
      //   });
    },
  },
};
</script>

<style lang="less">
.childrenHomeListPage {
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
