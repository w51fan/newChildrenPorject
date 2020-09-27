<template>
  <div class="volunteersListPage">
    <van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft" :width="360">
      <template #title>
        <div class="navTitle">{{areaName}}志愿者</div>
      </template>
    </van-nav-bar>
    <div class="listTitle">
      <div class="flex space-between">
        <div class="item">排序</div>
        <div class="item">姓名</div>
        <div class="item">服务时长</div>
        <div class="item">积分</div>
      </div>
    </div>
    <van-cell class="volunteersInfo">
      <template #title>
        <div
          class="flex space-between tableContent"
          v-for="(volunteer,index) in volunteersList"
          :key="index"
          @click="detail(volunteer)"
        >
          <div class="item">{{index+1}}</div>
          <div class="item flex">
            <img :src="volunteer.img" alt style="width:24px;height:24px;margin-right:10px;" />
            <div style="text-align: left;">{{volunteer.name}}</div>
          </div>
          <div class="item">{{volunteer.time}}</div>
          <div class="item">{{volunteer.integral}}</div>
        </div>
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'volunteersListPage',
  data() {
    return {
      areaName: '邵阳市',
      volunteersList: [
        {
          name: '含课件',
          time: '3个月',
          integral: '3333',
          img: require('../assets/img_ertong01@2x.png'),
          id: 1,
        },
        {
          name: '洗洁精哦不知道炒菜',
          time: '3个月',
          integral: '3333',
          img: require('../assets/img_ertong01@2x.png'),
          id: 2,
        },
        {
          name: '与会',
          time: '3个月',
          integral: '3333',
          img: require('../assets/img_ertong01@2x.png'),
          id: 3,
        },
      ],
    };
  },
  methods: {
    onClickLeft() {
      this.$router.push({
        name: 'homePage',
      });
    },
    go() {
      //   this.$router.push({
      //     name: 'loginPage',
      //   });
    },
    detail(volunteer) {
      this.$router.push({
        name: 'volunteerDetailPage',
      });
    },
  },
};
</script>

<style lang="less">
.volunteersListPage {
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
      flex: 4;
    }
  }
  .volunteersInfo {
    padding: 0;
    .tableContent {
      .item {
        flex: 4;
        padding: 10px 0;
      }
    }
  }
}
</style>
