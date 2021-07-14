<template>
  <div class="articleDetailPage">
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
import { getArticleDetail } from '@/api/home';

export default {
  name: 'articleDetailPage',
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
    getArticleDetail(Id)
      .then((res) => {
        this.showList = false;
        console.log('getArticleDetail', res);
        this.newsTitle = res.data.article.Title;
        this.newsContent = res.data.article.Content;
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
        name: 'articleListPage',
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
.articleDetailPage {
  img {
    width: 100%;
  }
  .title {
    font-size: 20px;
    font-weight: bolder;
    text-align: left;
    padding: 20px 20px 0px;
  }
  .time {
    font-size: 12px;
    color: #a0a0a0;
    text-align: left;
    padding: 5px 20px;
  }
}
</style>
