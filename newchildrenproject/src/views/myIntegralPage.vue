<template>
  <div class="myIntegralPage">
    <van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft" :width="360">
      <template #title>
        <div class="navTitle">我的积分</div>
      </template>
    </van-nav-bar>
  </div>
</template>

<script>
export default {
  name: 'myIntegralPage',
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
.myIntegralPage {
  .navTitle {
    font-size: 18px;
    font-weight: 600;
  }
}
</style>
