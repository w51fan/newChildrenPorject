<template>
  <div class="addRecordPage">
    <van-nav-bar
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
      :width="360"
    >
      <template #title>
        <div class="navTitle">添加走访记录</div>
      </template>
    </van-nav-bar>
    <div>
      <van-cell-group>
        <!-- <van-field
          v-model="visitTime"
          required
          label="走访时间"
          placeholder="请输入走访时间"
        /> -->
        <van-field
          readonly
          clickable
          label="走访时间"
          :value="activityDate"
          placeholder="请输入走访时间"
          @click="showPick()"
          name="validator"
          required
          :error-message="activityDateErrText"
        />
        <van-field
          v-model="childrenName"
          required
          label="儿童姓名"
          placeholder="请输入儿童姓名"
          :error-message="childrenNameErrText"
        />
        <van-field
          v-model="phone"
          required
          label="联系电话"
          placeholder="请输入联系电话"
          :error-message="phoneErrText"
        />
        <van-field
          v-model="address"
          required
          label="儿童家庭地址"
          placeholder="请输入儿童家庭地址"
          :error-message="addressErrText"
        />
        <van-field
          v-model="objective"
          label="走访目的"
          placeholder="请输入走访目的"
        />
      </van-cell-group>
    </div>
    <div class="submitTitle">走访过程简要记录：</div>
    <van-field
      v-model="recordMessage"
      rows="6"
      autosize
      type="textarea"
      placeholder="输入您的意见或建议…"
    />
    <div class="activityImgTitle">活动图片（{{ imgFileList.length }}/6）</div>

    <div style="text-align: left; padding: 0 20px">
      <van-uploader
        :after-read="afterRead"
        :before-delete="beforeDelete"
        v-model="imgFileList"
        :max-count="6"
        :max-size="2 * 1024 * 1024"
        @oversize="onOversize"
      />
    </div>
    <div class="submitBtn" @click="sumbitFun">
      <div>提交</div>
    </div>
    <van-popup
      v-model="showPicker"
      position="bottom"
      round
      :style="{ height: '50%' }"
    >
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="onConfirmDate"
      />
    </van-popup>
    <van-overlay :show="showOverlay" @click="show = false">
      <div style="margin-top: 50%">
        <van-loading type="spinner" />
      </div>
    </van-overlay>
  </div>
</template>

<script>
import { uploadImg, addVisit, getVisitDetail } from '@/api/home';

export default {
  name: 'addRecordPage',
  data() {
    return {
      visitTime: '',
      childrenName: '',
      phone: '',
      address: '',
      objective: '',
      recordMessage: '',
      activityDate: this.getDate(new Date()),
      showPicker: false,
      showOverlay: false,
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(),
      activityDateErrText: '',
      childrenNameErrText: '',
      phoneErrText: '',
      addressErrText: '',
      imgFileList: [],
    };
  },
  computed: {
    Token() {
      return this.$store.state.common.Token
        ? this.$store.state.common.Token
        : window.localStorage.getItem('childrenToken');
    },
    PreCurrentPath() {
      return this.$store.state.common.PreCurrentPath;
    },
    urls: {
      get() {
        return this.$store.state.common.urls;
      },
      set(val) {
        this.$store.commit('common/getUrls', val);
      },
    },
  },
  watch: {
    activityDate(vale) {
      if (vale === '') {
        this.activityDateErrText = '请选择';
      } else {
        this.activityDateErrText = '';
      }
    },
    childrenName(vale) {
      if (vale === '') {
        this.childrenNameErrText = '请输入';
      } else {
        this.childrenNameErrText = '';
      }
    },
    phone(vale) {
      if (vale === '') {
        this.phoneErrText = '请输入';
      } else {
        this.phoneErrText = '';
      }
    },
    address(vale) {
      if (vale === '') {
        this.addressErrText = '请输入';
      } else {
        this.addressErrText = '';
      }
    },
  },
  mounted() {
    if (this.$route.query.id) {
      getVisitDetail(this.$route.query.id)
        .then((res) => {
          console.log('getVisitDetail', res);
          // this.childrenName = res.data.visit.Name;
          this.$set(this, 'childrenName', res.data.visit.Name);
          this.phone = res.data.visit.Phone;
          this.address = res.data.visit.Address;
          this.objective = res.data.visit.Objective;
          this.recordMessage = res.data.visit.Record;
          this.activityDate = this.getDate(res.data.visit.CreateTime);
        })
        .catch((err) => {
          console.log('getVisitDetail', err);
        });
    }
  },
  methods: {
    onClickLeft() {
      this.$router.push({
        name: 'myRecordsListPage',
      });
    },
    go() {
      //   this.$router.push({
      //     name: 'loginPage',
      //   });
    },
    getDate(date) {
      const activityDate = new Date(date);
      const year = activityDate.getFullYear();
      let month = activityDate.getMonth() + 1;
      if (month < 10) month = `0${month}`;
      let day = activityDate.getDate();
      if (day < 10) day = `0${day}`;
      return `${year}-${month}-${day}`;
    },
    showPick() {
      this.showPicker = !this.showPicker;
      // this.currentPick = index;
    },
    onConfirmDate(value) {
      this.activityDate = this.getDate(value);
      this.showPicker = false;
    },
    sumbitFun() {
      this.showOverlay = true;
      const $this = this;
      if (this.activityDate === '') {
        this.activityDateErrText = '请选择';
        this.showOverlay = false;
        return;
      }
      this.activityDateErrText = '';

      if (this.childrenName === '') {
        this.childrenNameErrText = '请输入';
        this.showOverlay = false;
        return;
      }
      this.childrenNameErrText = '';

      if (this.phone === '') {
        this.phoneErrText = '请输入';
        this.showOverlay = false;
        return;
      }
      this.phoneErrText = '';

      if (this.address === '') {
        this.addressErrText = '请输入';
        this.showOverlay = false;
      } else {
        this.addressErrText = '';
      }
      addVisit({
        token: this.Token,
        name: this.childrenName,
        date: this.activityDate,
        address: this.address,
        phone: this.phone,
        objective: this.objective,
        record: this.recordMessage,
        urls: this.urls,
      })
        .then((res) => {
          console.log('addVisit', res);
          if (res.data.error) {
            this.$notify({
              type: 'danger',
              message: res.data.error,
              duration: 500,
            });
          } else {
            this.$notify({
              type: 'success',
              message: res.data.msg,
              duration: 500,
            });
            this.$router.push({
              name: 'myRecordsListPage',
            });
          }

          this.showOverlay = false;
        })
        .catch((err) => {
          console.log('addVisit', err);
          this.$notify({
            type: 'error',
            message: err.data.error,
            duration: 500,
          });
          this.showOverlay = false;
        });
    },
    afterRead(file) {
      this.showOverlay = true;
      const formData = new window.FormData();
      formData.append('file', file.file);
      uploadImg(formData).then((res) => {
        // this.urls =
        //   this.urls === "" ? res.data.url : this.urls + "," + res.data.url;
        this.urls.push(res.data.url);
        this.activityImageList = this.imgFileList;
        this.$notify({
          type: 'success',
          message: '上传成功',
          duration: 1000,
        });
        this.showOverlay = false;
      });
    },
    beforeDelete(file, event) {
      // console.log('file',file,event)
      // console.log(this.urls)
      this.imgFileList.splice(event.index, 1);
      this.urls.splice(event.index, 1);
    },
    onOversize(file) {
      // console.log('onOversize',file);
      this.$notify({
        type: 'warning',
        message: '图片大小不能超过2M',
        duration: 1500,
      });
    },
  },
};
</script>

<style lang="less">
.addRecordPage {
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
  .submitTitle {
    font-size: 14px;
    line-height: 24px;
    text-align: left;
    padding: 10px 16px;
    color: #646566;
  }
  .activityImgTitle {
    text-align: left;
    padding: 20px;
    font-size: 14px;
    font-weight: 600;
  }
  .submitBtn {
    text-align: center;
    margin: auto;
    width: 240px;
    padding: 10px 20px;
    background: url("../assets/btn_jinrupingtai@2x.png") no-repeat center;
    // background: rgba(197, 53, 42);
    color: white;
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 35px;
    margin-top: 20px;
    &:hover {
      background: rgba(197, 53, 42, 0.5);
    }
  }
}
</style>
