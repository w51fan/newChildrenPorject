<template>
  <div class="learningParkPage">
    <van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft" :width="360">
      <template #title>
        <div class="navTitle">学习乐园</div>
      </template>
    </van-nav-bar>
    <van-tabs class="learningParkPageTabs" v-model="selected">
      <van-tab title="红色爱国教育">
        <div class="gap"></div>
        <div class="Content">
          <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
            <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
              <div
                v-for="(article,index) in articlelist"
                :key="index"
                class="ContentItem"
                @click="viewDetail(article)"
              >
                <video :src="article.Url" :autoplay="autoplay" controls style="width: 100%;"></video>
                <div class="flex">
                  <div class="articleTitle">
                    <div style="color:#171114;font-size: 15px;font-weight: 600;">{{article.Title}}</div>
                    <div style="color:#CCCCCC;font-size: 12px;">{{article.subTitle}}</div>
                  </div>
                  <div class="flex" style="line-height: 62px;flex: 1;">
                    <img
                      :src="dianzanIcon"
                      style="width: 16px;height: 17px;margin-top: 20px;margin-right: 10px;margin-left: 60px;"
                      alt
                    />
                    <div style="color:#666666;font-size:12px;">点赞</div>
                    <div style="color:#666666;font-size:12px;">{{article.dianzanNum}}W</div>
                    <img
                      :src="fensxiangIcon"
                      style="width: 16px;height: 17px;margin-top: 20px;margin-left: 10px;"
                      alt
                    />
                  </div>
                </div>
              </div>
            </van-list>
          </van-pull-refresh>
        </div>
      </van-tab>
      <van-tab title="家庭尽责学习">
        <div class="gap"></div>
        <div class="Content">
          <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
            <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
              <div
                v-for="(article,index) in articlelist"
                :key="index"
                class="ContentItem"
                @click="viewDetail(article)"
              >
                <video :src="article.Url" :autoplay="autoplay" controls style="width: 100%;"></video>
                <div class="flex">
                  <div class="articleTitle">
                    <div style="color:#171114;font-size: 15px;font-weight: 600;">{{article.Title}}</div>
                    <div style="color:#CCCCCC;font-size: 12px;">{{article.subTitle}}</div>
                  </div>
                  <div class="flex" style="line-height: 62px;flex: 1;">
                    <img
                      :src="dianzanIcon"
                      style="width: 16px;height: 17px;margin-top: 20px;margin-right: 10px;margin-left: 60px;"
                      alt
                    />
                    <div style="color:#666666;font-size:12px;">点赞</div>
                    <div style="color:#666666;font-size:12px;">{{article.dianzanNum}}W</div>
                    <img
                      :src="fensxiangIcon"
                      style="width: 16px;height: 17px;margin-top: 20px;margin-left: 10px;"
                      alt
                    />
                  </div>
                </div>
              </div>
            </van-list>
          </van-pull-refresh>
        </div>
      </van-tab>
      <van-tab title="儿童书屋">
        <div class="gap"></div>
        <div class="Content">
          <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
            <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
              <div
                v-for="(article,index) in articlelist"
                :key="index"
                class="ContentItem"
                @click="viewDetail(article)"
              >
                <video :src="article.Url" :autoplay="autoplay" controls style="width: 100%;"></video>
                <div class="flex">
                  <div class="articleTitle">
                    <div style="color:#171114;font-size: 15px;font-weight: 600;">{{article.Title}}</div>
                    <div style="color:#CCCCCC;font-size: 12px;">{{article.subTitle}}</div>
                  </div>
                  <div class="flex" style="line-height: 62px;flex: 1;">
                    <img
                      :src="dianzanIcon"
                      style="width: 16px;height: 17px;margin-top: 20px;margin-right: 10px;margin-left: 60px;"
                      alt
                    />
                    <div style="color:#666666;font-size:12px;">点赞</div>
                    <div style="color:#666666;font-size:12px;">{{article.dianzanNum}}W</div>
                    <img
                      :src="fensxiangIcon"
                      style="width: 16px;height: 17px;margin-top: 20px;margin-left: 10px;"
                      alt
                    />
                  </div>
                </div>
              </div>
            </van-list>
          </van-pull-refresh>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  name: "learningParkPage",
  data() {
    return {
      autoplay: false,
      dianzanIcon: require("../assets/icon_dianzan_sel@2x.png"),
      fensxiangIcon: require("../assets/icon_fensxiang@2x.png"),
      videoUrl:
        "http://1257354027.vod2.myqcloud.com/5fac28c3vodgzp1257354027/94c2dc9c5285890803955787383/rhpGwXhpRC4A.mp4",
      articlelist: [
        {
          NewsThumbnail: require("../assets/icon_shipin@2x.png"),
          Title: "青少年红色爱国主义基地",
          subTitle: "由市创文办、市民政局、邵阳经开区",
          dianzanNum: "4.2",
          Url:
            "http://1257354027.vod2.myqcloud.com/5fac28c3vodgzp1257354027/94c2dc9c5285890803955787383/rhpGwXhpRC4A.mp4"
        },
        {
          NewsThumbnail: require("../assets/img_shaoyang@2x.png"),
          Title: "“童享蓝天，放飞梦想”",
          subTitle: "由市创文办、市民政局、邵阳经开区",
          dianzanNum: "4.2",
          Url:
            "http://1257354027.vod2.myqcloud.com/5fac28c3vodgzp1257354027/94c2dc9c5285890803955787383/rhpGwXhpRC4A.mp4"
        },
        {
          NewsThumbnail: require("../assets/icon_shipin@2x.png"),
          Title: "青少年红色爱国主义基地",
          subTitle: "由市创文办、市民政局、邵阳经开区",
          dianzanNum: "4.2",
          Url:
            "http://1257354027.vod2.myqcloud.com/5fac28c3vodgzp1257354027/94c2dc9c5285890803955787383/rhpGwXhpRC4A.mp4"
        }
      ]
    };
  },
  methods: {
    onClickLeft() {
      this.$router.push({
        name: "homePage"
      });
    }
  }
};
</script>

<style lang="less">
.learningParkPage {
  .navTitle {
    font-size: 18px;
    font-weight: 600;
  }
  .flex {
    display: flex;
  }
  .learningParkPageTabs {
    /deep/.van-tabs__line {
      width: 34% !important;
      background-color: #171114;
    }
  }
  .Content {
    .ContentItem {
      .articleTitle {
        text-align: left;
        padding: 10px;
        flex: 1;
      }
    }
  }
}
</style>
