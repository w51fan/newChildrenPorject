<template>
  <div class="volunteersListPage">
    <van-nav-bar
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
      :width="360"
    >
      <template #title>
        <div class="navTitle">{{ areaName }}{{ titleName }}</div>
      </template>
    </van-nav-bar>
    <!-- <div class="listTitle">
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
    </van-cell> -->
    <div class="Content" v-if="articlelist && articlelist.length > 0">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <div
            v-for="(article, index) in articlelist"
            :key="index"
            class="ContentItem"
            @click="viewDetail(article)"
          >
            <img :src="article.NewsThumbnail" alt />
            <div class="articleTitle">
              <div>{{ article.Title }}</div>
              <div class="gray">{{ getDate(article.CreateTime) }}</div>
            </div>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
    <div class="Content" v-else>暂无数据</div>

    <van-overlay :show="showOverlay" @click="show = false">
      <div style="margin-top: 50%">
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
      articlelist: [],
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
      refreshing: false,
      finished: false,
      loading: false,
      total: '',
    };
  },
  computed: {
    cityId() {
      return this.$store.state.common.cityId
        ? this.$store.state.common.cityId
        : window.localStorage.getItem('cityId');
    },
    PreCurrentPath() {
      return this.$store.state.common.PreCurrentPath;
    },
  },
  mounted() {
    this.showOverlay = true;
    this.titleName = this.$route.query.titleName;
    // console.log('this.cityId', this.cityId);
    getAwardList({
      cityId: this.cityId,
      type: this.$route.query.type,
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
    })
      .then((res) => {
        console.log('getAwardList', res);
        // this.volunteersList = res.data.awardList;
        this.articlelist = res.data.awardList;
        this.total = res.data.total;
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
    viewDetail(volunteer) {
      this.$router.push({
        name: 'volunteerDetailPage',
        query: {
          Id: volunteer.Id,
          titleName: this.titleName,
          type: this.$route.query.type,
        },
      });
    },
    onLoad() {
      if (this.refreshing) {
        // this.articlelist = [];
        this.refreshing = false;
      }
      if (this.articlelist.length < this.total) {
        // eslint-disable-next-line no-plusplus
        const pageNumber = this.pageNumber++;
        this.getAwardListFun(
          this.cityId,
          this.selected + 1,
          pageNumber + 1,
          this.pageSize,
        );
      } else {
        // this.finished = true;
      }
      this.loading = false;
    },
    onRefresh() {
      // 清空列表数据
      this.finished = false;
      console.log('22');
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    },
    getDate(date) {
      const activityDate = new Date(date);
      const year = activityDate.getFullYear();
      const month = activityDate.getMonth() + 1;
      const day = activityDate.getDate();
      return `${year}年${month}月${day}日`;
    },
    getAwardListFun(param) {
      const {
        cityId, type, pageNumber, pageSize,
      } = param;
      this.showOverlay = true;
      getAwardList({
        cityId,
        type,
        pageNumber,
        pageSize,
      })
        .then((res) => {
          // console.log(news);
          res.data.awardList.forEach((item) => {
            this.articlelist.push(item);
          });
          this.loading = false;
          this.showOverlay = false;
          if (!(this.articlelist.length < this.total)) this.finished = true;
        })
        .catch((err) => {
          console.log('err', err);
          this.showOverlay = false;
        });
    },
  },
};
</script>

<style lang="less">
.volunteersListPage {
  background: #e6e6e6;
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
  .Content {
    padding: 20px;
    img {
      width: 100%;
    }
    .ContentItem {
      background: #fff;
      margin-bottom: 20px;
      // box-shadow: 0px 0px 10px 5px rgba(175, 175, 175, 0.5);
      .articleTitle {
        text-align: left;
        padding: 5px 20px;
        .gray {
          font-size: 14px;
          color: #a0a0a0;
        }
      }
    }
  }
}
</style>
