<template>
  <div class="volunteersListPage">
    <van-nav-bar
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
      :width="360"
    >
      <template #title>
        <div class="navTitle">{{ areaName }}{{titleName}}</div>
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
          v-for="(volunteer, index) in volunteersList"
          :key="index"
          @click="detail(volunteer)"
        >
          <div class="item">{{ index + 1 }}</div>
          <div class="item flex">
            <img
              :src="volunteer.img"
              alt
              style="width: 24px; height: 24px; margin-right: 10px"
            />
            <div style="text-align: left">{{ volunteer.name }}</div>
          </div>
          <div class="item">{{ volunteer.time }}</div>
          <div class="item">{{ volunteer.integral }}</div>
        </div>
      </template>
    </van-cell>
    <van-overlay :show="showOverlay" @click="show = false">
      <div style="margin-top: 50%;">
        <van-loading type="spinner" />
      </div>
    </van-overlay>
  </div>
</template>

<script>
import { getAwardList } from '@/api/home';

export default {
  name: 'volunteersListPage',
  data() {
    return {
      areaName: '邵阳市',
      titleName: '优秀志愿者',
      showOverlay: false,
      volunteersList: [
        // {
        //   name: '含课件',
        //   time: '3个月',
        //   integral: '3333',
        //   img: require('../assets/img_ertong01@2x.png'),
        //   id: 1,
        // },
        // {
        //   name: '洗洁精哦不知道炒菜',
        //   time: '3个月',
        //   integral: '3333',
        //   img: require('../assets/img_ertong01@2x.png'),
        //   id: 2,
        // },
        // {
        //   name: '与会',
        //   time: '3个月',
        //   integral: '3333',
        //   img: require('../assets/img_ertong01@2x.png'),
        //   id: 3,
        // },
      ],
      pageNumber: 1,
      pageSize: 10,
    };
  },
  computed: {
    cityId() {
      // return this.$store.state.common.cityId;
      return 2018;
    },
    PreCurrentPath() {
      return this.$store.state.common.PreCurrentPath;
    },
  },
  mounted() {
    this.showOverlay = true;
    this.titleName = this.$route.query.titleName;
    getAwardList({
      cityId: this.cityId,
      type: this.$route.query.type,
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
    })
      .then((res) => {
        console.log('getAwardList', res);
        this.volunteersList = res.data.aawardList;
        this.showOverlay = false;
      })
      .catch((err) => {
        console.log('getAwardList', err);
        this.showOverlay = false;
      });
  },
  methods: {
    onClickLeft() {
      this.$router.push({
        name: 'growthStoryPage',
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
