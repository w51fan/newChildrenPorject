<template>
  <div class="volunteerDetailPage">
    <van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft" />
    <div>{{ newsTitle }}</div>
    <div v-html="newsContent" class="newsContent"></div>
    <van-overlay :show="showOverlay" @click="show = false">
      <div style="margin-top: 50%">
        <van-loading type="spinner" />
      </div>
    </van-overlay>
  </div>
</template>

<script>
import { getAwardDetail } from '@/api/home';

export default {
  name: 'volunteerDetailPage',
  data() {
    return {
      newsTitle: '',
      newsContent: '',
      showOverlay: true,
    };
  },
  mounted() {
    const { Id } = this.$route.query;

    this.showOverlay = true;
    getAwardDetail(Id)
      .then((res) => {
        console.log('getAwardDetail', res.data.award);
        this.newsTitle = res.data.award.Title;
        this.newsContent = res.data.award.Content;
        this.showOverlay = false;
      })
      .catch((err) => {
        console.log('getArticleDetail', err);
        this.showOverlay = false;
      });
  },
  methods: {
    onClickLeft() {
      this.$router.push({
        name: 'volunteersListPage',
        query: {
          titleName: this.$route.query.titleName,
          type: this.$route.query.type,
        },
      });
    },
  },
};
</script>

<style lang="less">
.volunteerDetailPage {
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
  .volunteerDetailHeader {
    background: #ff8077;
    color: #ffffff;
    .img {
      width: 54px;
      height: 54px;
    }
  }
  .dataTitle {
    background: rgba(232, 232, 232, 0.5);
    text-align: left;
  }
  .tableHeader {
    padding: 20px 20px 10px;
    .item {
      // flex: 3;
      text-align: center;
    }
  }
  .dataInfo {
    padding: 20px 20px 10px;
    .tableContent {
      .item {
        flex: 3;
      }
    }
  }
  .myActivity {
    .title {
      text-align: left;
    }
  }
}
</style>
