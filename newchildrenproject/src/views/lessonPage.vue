<template>
  <div class="lessonPage">
    <van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft" />
    <div class="lessonVideo">
      <video :src="lesson.Url" autoplay="false" controls></video>
      <div class="topic">主题：{{ lesson.Name }}</div>
    </div>
    <div class="flex space-between pointListHead">
      <div class="title">知识点</div>
      <div class="num">{{ pointList.length }}个</div>
    </div>
    <div class="gap gapone"></div>
    <div class="pointList">
      <div v-for="(point, index) in pointList" :key="index">
        <div class="pointItemContent">{{ point.Collectcnt }}</div>
        <div class="gap gapone"></div>
      </div>
    </div>
    <div class="flex space-between pointListHead">
      <div class="title">留言</div>
    </div>
    <div class="gap gapone"></div>
    <div>
      <div v-for="(data, index) in guestbook" :key="index">
        <div
          style="
            text-align: left;
            padding: 0 20px;
            display: flex;
            line-height: 40px;
          "
        >
          <div style="font-weight: 600">{{ data.UserName }}:</div>
          <div>{{ data.Content }}</div>
          <div
            style="padding-left: 30px; color: cornflowerblue; cursor: pointer"
            @click="showAnswer(index)"
          >
            回复
          </div>
        </div>
        <div
          v-if="data.Replys && data.Replys.length > 0"
          style="margin-left: 20px"
        >
          <div v-for="(Reply, turn) in data.Replys" :key="turn">
            <div
              style="
                text-align: left;
                padding: 0 20px;
                display: flex;
                line-height: 40px;
              "
            >
              <div style="font-weight: 600">{{ Reply.UserName }}:</div>
              <div>{{ Reply.Content }}</div>
            </div>
          </div>
        </div>
        <div
          v-if="currenDataIndex === index && !showSubmitInput"
          style="padding: 20px"
        >
          <van-field
            v-model="replyContent"
            type="textarea"
            rows="2"
            placeholder="请输入您的留言"
            input-align="left"
            maxlength="500"
            show-word-limit
          />
          <div style="text-align: right; padding: 10px 20px 0">
            <van-button type="default" size="small" @click="replyComment(data)"
              >提交留言</van-button
            >
          </div>
        </div>
      </div>
    </div>
    <div
      class="activityRecordInput"
      style="padding: 20px"
      v-if="showSubmitInput"
    >
      <van-field
        v-model="evaluateContent"
        type="textarea"
        rows="4"
        placeholder="请输入您的留言"
        input-align="left"
        maxlength="500"
        show-word-limit
      />
      <div style="text-align: right; padding: 10px 20px 0">
        <van-button type="default" size="small" @click="addComment"
          >提交留言</van-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import {
  getPointList,
  getLessonDetail,
  getGuestbook,
  getGuestbookAdd,
  getGuestbookReply,
} from '@/api/home';

export default {
  name: 'lessonPage',
  data() {
    return {
      lesson: '',
      pointList: '',
      evaluateContent: '',
      guestbook: '',
      currenDataIndex: '',
      replyContent: '',
      showSubmitInput: true,
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
    this.initFun();
  },
  methods: {
    initFun() {
      getLessonDetail(
        this.$route.query.CourseId,
        this.$route.query.LessonId,
        this.Token,
      ).then((res) => {
        console.log('res', res);
        this.lesson = res.data.lesson;
        getPointList(
          this.$route.query.CourseId,
          this.$route.query.LessonId,
        ).then((result) => {
          console.log('result', result);
          this.pointList = result.data.pointList;
          getGuestbook({
            courseId: this.lesson.CourseId,
            pageNumber: '',
            pageSize: '',
          }).then((guestbook) => {
            this.guestbook = guestbook.data.guestbookList;
            console.log('guestbook', guestbook);
          });
        });
      });
    },
    onClickLeft() {
      this.$router.push({
        name: this.$route.query.currentPath,
      });
    },
    addComment() {
      getGuestbookAdd({
        token: this.Token,
        courseId: this.lesson.CourseId,
        content: this.evaluateContent,
      }).then((res) => {
        this.$notify({
          type: 'success',
          message: '提交成功',
          duration: 500,
        });
        console.log('getGuestbookAdd', res);
        this.evaluateContent = '';
        this.initFun();
      });
    },
    replyComment(data) {
      getGuestbookReply({
        token: this.Token,
        courseId: this.lesson.CourseId,
        replyId: data.Id,
        content: this.replyContent,
      }).then((res) => {
        this.$notify({
          type: 'success',
          message: '提交成功',
          duration: 500,
        });
        console.log('getGuestbookAdd', res);
        this.currenDataIndex = '';
        this.showSubmitInput = true;
        this.replyContent = '';
        this.initFun();
      });
    },

    showAnswer(index) {
      console.log('showAnswer', index);
      if (this.currenDataIndex !== '') {
        this.currenDataIndex = '';
        this.replyContent = '';
        this.showSubmitInput = true;
      } else {
        this.currenDataIndex = index;
        this.showSubmitInput = false;
      }
    },
  },
};
</script>

<style lang="less">
.lessonPage {
  .lessonVideo {
    video {
      width: 100%;
    }
    .topic {
      text-align: left;
      font-size: 16px;
      font-weight: 600;
      padding: 20px;
    }
  }
  .pointListHead {
    padding: 20px;
    .title {
      font-size: 20px;
      font-weight: 600;
    }
    .num {
      color: gray;
    }
  }
  .flex {
    display: flex;
  }
  .space-between {
    justify-content: space-between;
  }
  .gap {
    width: 100%;
    height: 8px;
    background: #e6e6e6;
  }
  .gapone {
    height: 1px;
  }
  .pointList {
    text-align: left;
    // padding: 20px;
    .pointItemContent {
      font-size: 16px;
      line-height: 35px;
      padding: 10px 20px;
    }
  }
}
</style>
