<template>
  <div class="bottomNavPage">
    <div style="margin: 16px 0;color: #969799;font-size: 14px;line-height: 24px;border-color: #2c6bca;border-style: solid;border-width: 0;"></div>
    <van-tabbar v-model="active">
      <van-tabbar-item
        :name="nav.path"
        :icon="nav.icon"
        v-for="(nav,index) in  navList"
        :key="index"
      >{{nav.navName}}</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'bottomNavPage',
  props: ['selectedNav'],
  data() {
    return {
      active: 'homePage',
      navList: [],
    };
  },
  computed: {
    currentPage() {
      return this.$store.state.common.currentPage;
    },
  },
  mounted() {
    this.init();
  },
  watch: {
    // eslint-disable-next-line no-unused-vars
    active(val) {
      this.$emit('update:selectedNav', val);
      this.$store.commit('common/getCurrentPage', val);
      if (this.currentPage !== this.selectedNav) {
        this.$router.push({
          name: val,
        });
      }
      return val;
    },
  },
  methods: {
    init() {
      this.active = this.selectedNav;
      this.navList = [
        {
          navName: '首页',
          icon: 'wap-home',
          path: 'homePage',
        },
        {
          navName: '成长故事',
          icon: 'column',
          path: 'growthStoryPage',
        },
        {
          navName: '用户中心',
          icon: 'user-circle-o',
          path: 'userCenterPage',
        },
      ];
    },
  },
};
</script>

<style lang="less">
.bottomNavPage {
  .van-tabbar{
    border-top: 1px solid rgba(217, 217, 217, 1);
  }
  .van-tabbar-item--active {
    color: rgba(210, 30, 25, 1);
  }
}
</style>
