<template>
  <div class="growthRecordPage">
    <van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft" :width="360">
      <template #title>
        <div class="navTitle">成长记录</div>
      </template>
    </van-nav-bar>
    <div class="myRecordsList">
      <div
        v-for="(myIntegral,index) in myRecordsList"
        :key="index"
        class="flex"
        style="border-bottom: 1px solid rgba(151, 151, 151, 0.3);padding: 10px 10px;margin: 0 10px;"
      >
        <div style="flex:4;">
          <div class="text">{{myIntegral.name}}</div>
          <div class="time">{{myIntegral.time}}</div>
        </div>
        <div class="integral">{{myIntegral.integral}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getVisitList } from '@/api/home';

export default {
  name: 'growthRecordPage',
  data() {
    return {
      myRecordsList: [
        {
          name: '参与双沟桥村童享蓝天，关注留守儿童活动',
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
  computed: {
    Token() {
      return this.$store.state.common.Token
        ? this.$store.state.common.Token
        : window.localStorage.getItem('childrenToken');
    },
  },
  mounted() {
    getVisitList(this.Token)
      .then((res) => {
        console.log('getVisitList', res);
      })
      .catch((err) => {
        console.log('getVisitList', err);
      });
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
.growthRecordPage {
  .navTitle {
    font-size: 18px;
    font-weight: 600;
  }
  .flex {
    display: flex;
  }
  .myRecordsList {
    .text {
      color: rgba(6, 25, 44, 1);
      font-size: 14px;
      text-align: left;
      padding-bottom: 5px;
    }
    .time {
      color: rgba(155, 155, 155, 1);
      font-size: 14px;
      text-align: left;
    }
    .integral {
      color: rgba(6, 25, 44, 1);
      font-size: 14px;
      text-align: right;
      line-height: 35px;
      flex: 1;
    }
  }
}
</style>
