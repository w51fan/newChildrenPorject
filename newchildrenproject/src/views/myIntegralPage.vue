<template>
  <div class="myIntegralPage">
    <van-nav-bar
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
      :width="360"
    >
      <template #title>
        <div class="navTitle">我的积分</div>
      </template>
    </van-nav-bar>
    <div class="listTitle">
      <div class="flex space-between">
        <div class="item" style="text-align: left; padding-left: 20px">
          积分明细
        </div>
        <div class="item">积分数</div>
        <div class="item">时间</div>
      </div>
    </div>
    <div class="myIntegralList">
      <div
        v-for="(myIntegral, index) in myIntegralList"
        :key="index"
        class="flex warp"
      >
        <div class="text">{{ myIntegral.name }}</div>
        <div class="time">{{ myIntegral.integral }}</div>
        <div class="integral">{{ myIntegral.time }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'myIntegralPage',
  data() {
    return {
      myIntegralList: [
        {
          name: '组织关爱活动',
          time: '2020-08-26',
          integral: 1,
        },
        {
          name: '参与双沟桥村童享蓝天，关注留守儿童活动',
          time: '2020-08-26',
          integral: 1,
        },
      ],
    };
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
  .flex {
    display: flex;
  }
  .space-between {
    justify-content: space-between;
  }
  .listTitle {
    background: rgba(232, 232, 232, 0.5);
    .item {
      flex: 1;
      color: rgba(155, 155, 155, 1);
      font-size: 14px;
      font-weight: 600;
      padding: 10px 0;
    }
  }
  .myIntegralList {
    .warp {
      border-bottom: 1px solid rgba(151, 151, 151, 0.3);
      padding: 10px 10px;
      margin: 0 10px;
    }
    .text {
      color: rgba(74, 74, 74, 1);
      font-size: 14px;
      padding-bottom: 5px;
      flex: 1;
      text-align: left;
    }
    .time {
      color: rgba(74, 74, 74, 1);
      font-size: 14px;
      flex: 1;
    }
    .integral {
      color: rgba(74, 74, 74, 1);
      font-size: 14px;
      flex: 1;
    }
  }
}
</style>
