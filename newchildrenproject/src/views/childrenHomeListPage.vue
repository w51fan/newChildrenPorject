<template>
  <div class="childrenHomeListPage">
    <van-nav-bar
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
      :width="360"
    >
      <template #title>
        <div class="navTitle">儿童之家列表</div>
      </template>
    </van-nav-bar>
    <div>
      <div
        v-for="(childrenHome, index) in childrenHomeList"
        :key="index"
        class="childrenHomeList"
      >
        <div class="childrenHome" @click="go(childrenHome)">
          <div class="flex childrenHomeHeader">
            <img src="../assets/icon_ertongzhijia_red.png" class="img" alt />
            <div class="childrenHomeName">{{ childrenHome.Name }}</div>
          </div>
          <div class="gap gapone"></div>
          <div class="flex space-between tableHeader">
            <div class="item">人数</div>
            <div class="item">活动次数</div>
            <div class="item">评分</div>
          </div>
          <van-cell class="childrenInfo">
            <!-- 使用 title 插槽来自定义标题 -->
            <template #title>
              <div class="flex space-between tableContent">
                <div class="item custom-title">
                  {{ childrenHome.ChildrenCount }}人
                </div>
                <div class="item">{{ childrenHome.ActivityCount }}次</div>
                <div class="item">
                  <ul class="cleanfloat flex" style="justify-content: center;">
                    <li
                      v-for="(n, index) in 5"
                      :key="index"
                      :class="[
                        index + 1 > childrenHome.Score / 10
                          ? 'grayStar'
                          : 'star',
                      ]"
                    >
                      ★
                    </li>
                  </ul>
                </div>
              </div>
            </template>
          </van-cell>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getChildrenHomeList } from '@/api/home';

export default {
  name: 'childrenHomeListPage',
  data() {
    return {
      childrenHomeList: [],
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
    getChildrenHomeList(this.Token)
      .then((res) => {
        console.log('getChildrenHomeList', res);
        this.childrenHomeList = res.data.childrenHomeList;
      })
      .catch((err) => {
        console.log('getChildrenHomeList', err);
      });
  },
  methods: {
    onClickLeft() {
      this.$router.push({
        name: 'userCenterPage',
      });
    },
    go(childrenHome) {
      this.$store.commit('common/getVillageId', childrenHome.VillageId);
      this.$store.commit('common/getPreCurrentPath', 'childrenHomeListPage');
      this.$router.push({
        name: 'childrenHomePage',
      });
    },
  },
};
</script>

<style lang="less">
.childrenHomeListPage {
  background: #efefef;
  height: 100vh;
  .flex {
    display: flex;
  }
  .space-between {
    justify-content: space-between;
  }
  .star {
    color: rgba(255, 60, 53, 1);
  }
  .grayStar {
    color: #e0e0e0;
  }
  .navTitle {
    font-size: 18px;
    font-weight: 600;
  }
  /deep/.van-field__body {
    background: #f2f2f2;
    .van-field__control {
      padding: 10px;
    }
  }
  /deep/.van-cell::after {
    border-bottom: none;
  }
  .childrenHomeList {
    .childrenHome {
      background: #fff;
      margin: 10px;
      .childrenHomeHeader {
        padding: 10px 16px;
        .img {
          margin-right: 15px;
        }
      }
      .tableHeader {
        padding: 0 16px;
        width: 100%;
        box-sizing: border-box;
        .item {
          flex: 1;
          color: rgba(74, 74, 74, 1);
          font-size: 14px;
          font-weight: 400;
          padding: 10px 10px 5px;
        }
      }
      .tableContent {
        .item {
          flex: 1;
          padding: 0 10px;
          color: rgba(155, 155, 155, 1);
        }
      }
      .img {
        width: 24px;
        height: 24px;
      }
      .childrenHomeName {
        color: rgba(6, 25, 44, 1);
        font-size: 16px;
        font-weight: 600;
      }
    }
  }
  .gap {
    width: 100%;
    height: 8px;
    background: #e6e6e6;
  }
  .gapone {
    height: 1px;
  }
}
</style>
