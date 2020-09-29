<template>
  <div class="learningParkPage">
    <van-nav-bar
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
      :width="360"
    >
      <template #title>
        <div class="navTitle">学习乐园</div>
      </template>
    </van-nav-bar>
    <van-tabs class="learningParkPageTabs" v-model="selected">
      <van-tab title="红色爱国教育">
        <div class="gap"></div>
        <div class="Content">
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
              >
                <video
                  :src="article.Url"
                  :autoplay="autoplay"
                  controls
                  style="width: 100%"
                ></video>
                <div class="flex">
                  <div class="articleTitle">
                    <div
                      style="color: #171114; font-size: 15px; font-weight: 600"
                    >
                      {{ article.Title }}
                    </div>
                    <!-- <div style="color:#CCCCCC;font-size: 12px;">{{article.Description}}</div> -->
                    <div style="color: #cccccc; font-size: 12px">
                      {{ article.CreateTime }}
                    </div>
                  </div>
                  <div class="flex" style="line-height: 62px; flex: 1">
                    <img
                      :src="dianzanIcon"
                      style="
                        width: 16px;
                        height: 17px;
                        margin-top: 20px;
                        margin-right: 10px;
                        margin-left: 60px;
                      "
                      class="gry"
                      alt
                      @click="dianZanFun(article, index)"
                      v-if="article.Likes > 0"
                    />
                    <img
                      :src="notDianzanIcon"
                      style="
                        width: 16px;
                        height: 17px;
                        margin-top: 20px;
                        margin-right: 10px;
                        margin-left: 60px;
                      "
                      class="gry"
                      alt
                      @click="dianZanFun(article, index)"
                      v-else
                    />
                    <div
                      style="color: #666666; font-size: 12px"
                      @click="dianZanFun(article, index)"
                    >
                      点赞
                    </div>
                    <div style="color: #666666; font-size: 12px">
                      {{ article.Orders }}W
                    </div>
                    <img
                      :src="fensxiangIcon"
                      style="
                        width: 16px;
                        height: 17px;
                        margin-top: 20px;
                        margin-left: 10px;
                      "
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
            <van-list
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad"
            >
              <div class="familyResponsibilityHead">
                <img src="../assets/jiatingjinze.png" alt />
                <div class="text">
                  <div>家庭教育系列课程</div>
                </div>
              </div>
              <div
                style="
                  text-align: left;
                  padding: 20px;
                  font-weight: 600;
                  font-size: 20px;
                "
              >
                课程列表
              </div>
              <div style="margin-bottom: 60px">
                <div
                  v-for="(course, index) in courseList"
                  :key="index"
                  class="flex"
                  style="padding: 10px 20px 20px"
                  @click="courseDetail(course)"
                >
                  <img
                    :src="course.Professor.HeadPortrait"
                    alt
                    style="height: 120px; width: 100px; border-radius: 8px"
                  />
                  <div style="padding-left: 10px">
                    <div
                      style="
                        font-size: 18px;
                        font-weight: 900;
                        text-align: left;
                      "
                    >
                      {{ course.Professor.Name }}
                    </div>
                    <div
                      style="
                        text-align: left;
                        font-size: 16px;
                        font-weight: 600;
                        padding: 5px 0;
                        color: #5f5b5b;
                      "
                    >
                      {{ course.CourseName }}
                    </div>
                    <div
                      style="
                        text-align: left;
                        font-size: 14px;
                        color: #a5a0a0;
                        padding: 5px 0;
                      "
                    >
                      点击观看
                    </div>
                  </div>
                </div>
              </div>
            </van-list>
          </van-pull-refresh>
        </div>
      </van-tab>
      <van-tab title="儿童主任课程">
        <div class="gap"></div>
        <div class="Content">
          <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
            <!-- <van-list
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad"
              >暂无数据</van-list
            > -->
            <van-list
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad"
            >
              <div class="familyResponsibilityHead">
                <img src="../assets/jiatingjinze.png" alt />
                <div class="text">
                  <div>儿童主任系列课程</div>
                </div>
              </div>
              <div
                style="
                  text-align: left;
                  padding: 20px;
                  font-weight: 600;
                  font-size: 20px;
                "
              >
                课程列表
              </div>
              <div style="margin-bottom: 60px">
                <div
                  v-for="(course, index) in courseList"
                  :key="index"
                  class="flex"
                  style="padding: 10px 20px 20px"
                  @click="courseDetail(course)"
                >
                  <img
                    :src="course.Professor.HeadPortrait"
                    alt
                    style="height: 120px; width: 100px; border-radius: 8px"
                  />
                  <div style="padding-left: 10px">
                    <div
                      style="
                        font-size: 18px;
                        font-weight: 900;
                        text-align: left;
                      "
                    >
                      {{ course.Professor.Name }}
                    </div>
                    <div
                      style="
                        text-align: left;
                        font-size: 16px;
                        font-weight: 600;
                        padding: 5px 0;
                        color: #5f5b5b;
                      "
                    >
                      {{ course.CourseName }}
                    </div>
                    <div
                      style="
                        text-align: left;
                        font-size: 14px;
                        color: #a5a0a0;
                        padding: 5px 0;
                      "
                    >
                      点击观看
                    </div>
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
import { patrioticLikes, getPatrioticList, getCourseList } from '@/api/home';

export default {
  name: 'learningParkPage',
  data() {
    return {
      selected: '1',
      autoplay: false,
      loading: false,
      finished: false,
      refreshing: false,
      courseList: [],
      // eslint-disable-next-line global-require
      notDianzanIcon: require('../assets/icon_dianzankongxin.png'),
      // eslint-disable-next-line global-require
      dianzanIcon: require('../assets/icon_dianzan_sel@2x.png'),
      // eslint-disable-next-line global-require
      fensxiangIcon: require('../assets/icon_fensxiang@2x.png'),
      // videoUrl:
      //   'http://1257354027.vod2.myqcloud.com/5fac28c3vodgzp1257354027/94c2dc9c5285890803955787383/rhpGwXhpRC4A.mp4',
      articlelist: [
        // {
        //   NewsThumbnail: require('../assets/icon_shipin@2x.png'),
        //   Title: '青少年红色爱国主义基地',
        //   subTitle: '由市创文办、市民政局、邵阳经开区',
        //   dianzanNum: '4.2',
        //   Url:
        //     'http://1257354027.vod2.myqcloud.com/5fac28c3vodgzp1257354027/94c2dc9c5285890803955787383/rhpGwXhpRC4A.mp4',
        // },
        // {
        //   NewsThumbnail: require('../assets/img_shaoyang@2x.png'),
        //   Title: '“童享蓝天，放飞梦想”',
        //   subTitle: '由市创文办、市民政局、邵阳经开区',
        //   dianzanNum: '4.2',
        //   Url:
        //     'http://1257354027.vod2.myqcloud.com/5fac28c3vodgzp1257354027/94c2dc9c5285890803955787383/rhpGwXhpRC4A.mp4',
        // },
        // {
        //   NewsThumbnail: require('../assets/icon_shipin@2x.png'),
        //   Title: '青少年红色爱国主义基地',
        //   subTitle: '由市创文办、市民政局、邵阳经开区',
        //   dianzanNum: '4.2',
        //   Url:
        //     'http://1257354027.vod2.myqcloud.com/5fac28c3vodgzp1257354027/94c2dc9c5285890803955787383/rhpGwXhpRC4A.mp4',
        // },
      ],
      pageNumber: 10,
      pageSize: 1,
    };
  },
  computed: {
    Token() {
      return this.$store.state.common.Token
        ? this.$store.state.common.Token
        : window.localStorage.getItem('Token');
    },
  },
  mounted() {
    this.getPatrioticListFun();
    getCourseList()
      .then((res) => {
        this.courseList = res.data.courseList;
        this.showOverlay = false;
      })
      .catch((err) => {
        console.log('getCourseList', err);
        this.showOverlay = false;
      });
  },
  methods: {
    onClickLeft() {
      this.$router.push({
        name: 'homePage',
      });
    },
    dianZanFun(article, index) {
      patrioticLikes(this.Token, article.Id)
        .then((res) => {
          console.log('patrioticLikes', res);
          if (article.Likes > 0) {
            this.articlelist[index].Likes = 0;
          } else {
            this.articlelist[index].Likes = 1;
          }
        })
        .catch((err) => {
          console.log('patrioticLikes', err);
        });
    },
    getPatrioticListFun() {
      getPatrioticList(this.pageNumber, this.pageSize)
        .then((res) => {
          console.log('getPatrioticList', res);
          this.articlelist = res.data.patrioticList;
        })
        .catch((err) => {
          console.log('getPatrioticList', err);
        });
    },
    onLoad() {
      if (this.refreshing) {
        // this.articlelist = [];
        this.refreshing = false;
      }
      if (this.articlelist.length < this.total) {
        this.getArticleList(
          this.cityId,
          this.selected + 1,
          this.pageNumber++ + 1,
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
    courseDetail(course) {
      this.$store.commit('common/getCourseId', course.CourseId);
      this.$router.push({
        name: 'courseDetailPage',
        query: {
          Id: course.CourseId,
        },
      });
    },
  },
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
      .gry {
        color: rgba(205, 205, 205, 1);
      }
    }
    .familyResponsibilityHead {
      position: relative;
      img {
        width: 100%;
      }
      .text {
        position: absolute;
        bottom: 44%;
        left: 34%;
        color: #fff;
        font-size: 22px;
      }
    }
  }
}
</style>
