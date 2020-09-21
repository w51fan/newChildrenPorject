import axios from 'axios';
import qs from 'qs';
import config from '../libs/config.js';

// 获取轮播图
export const getHomeImgList = function (cityId) {
  return axios.request({
    url: `${config.hostApi}/news/list?cityId=${cityId}&type=${1}`,
    method: 'get',
  });
};
// 置顶
export const getMenuList = function (cityId) {
  return axios.request({
    url: `${config.hostApi}/news/list?cityId=${cityId}&type=${2}`,
    method: 'get',
  });
};
// 新闻列表
export const getNewsList = function (cityId, pageNumber, pageSize) {
  return axios.request({
    url: `${config.hostApi}/news/list?cityId=${cityId}&type=${3}&pageNumber=${pageNumber}&pageSize=${pageSize}`,
    method: 'get',
  });
};

// 领导小组
export const getGoveList = function (cityId) {
  return axios.request({
    url: `${config.hostApi}/news/list?cityId=${cityId}&type=${4}`,
    method: 'get',
  });
};

// 新闻咨询详情
export const getNewsDetail = function (Id) {
  return axios.request({
    url: `${config.hostApi}/news/detail?Id=${Id}`,
    method: 'get',
  });
};

// 获取活动列表
/*
type: 1.家庭教育；2.儿童团辅；3.家庭亲子；4.安全护卫
activityType:1.线下活动；2线上活动
*/
export const getActivityList = function ({
  cityId,
  areaId,
  townId,
  type,
  activityType,
  pageNumber,
  pageSize,
}) {
  const data = {
    cityId,
    areaId,
    townId,
    type,
    activityType,
    pageNumber,
    pageSize,
  };
  if (data.type) {
    return axios.request({
      url: `${config.hostApi}/activity/list?cityId=${data.cityId}&areaId=${data.areaId}&townId=${data.townId}&type=${data.type}`,
      method: 'get',
    });
  } if (data.activityType) {
    return axios.request({
      url: `${config.hostApi}/activity/list?cityId=${data.cityId}&activityType=${data.activityType}&pageNumber=${data.pageNumber}&pageSize=${data.pageSize}`,
      method: 'get',
    });
  } if (data.pageNumber) {
    return axios.request({
      url: `${config.hostApi}/activity/list?cityId=${data.cityId}&areaId=${data.areaId}&townId=${data.townId}&activityType=${data.activityType}&pageNumber=${data.pageNumber}&pageSize=${data.pageSize}`,
      method: 'get',
    });
  } if (data.areaId && data.townId) {
    return axios.request({
      url: `${config.hostApi}/activity/list?cityId=${data.cityId}&activityType=${data.activityType}&pageNumber=${data.pageNumber}&pageSize=${data.pageSize}`,
      method: 'get',
    });
  }
  return axios.request({
    url: `${config.hostApi}/activity/list?cityId=${data.cityId}&areaId=${data.areaId}&townId=${data.townId}`,
    method: 'get',
  });
};

// 数据统计总数
export const getTotalCount = function (cityId) {
  return axios.request({
    url: `${config.hostApi}/childrenhome/getTotalCount?cityId=${cityId}`,
    method: 'get',
  });
};

// 数据统计列表树状
export const getTreeCount = function (cityId) {
  return axios.request({
    url: `${config.hostApi}/childrenhome/getTreeCount?cityId=${cityId}`,
    method: 'get',
  });
};

// 活动详情
export const getActivityDetail = function (activityId) {
  return axios.request({
    url: `${config.hostApi}/activity/detail?activityId=${activityId}`,
    method: 'get',
  });
};

// 村列表
export const getVillageList = function (townId) {
  return axios.request({
    url: `${config.hostApi}/childrenhome/getVillageList?townId=${townId}`,
    method: 'get',
  });
};

// 乡镇列表
export const getTownList = function (cityId) {
  return axios.request({
    url: `${config.hostApi}/childrenhome/getTownList?cityId=${cityId}`,
    method: 'get',
  });
};

// 乡镇列表
export const getChildrenhomeDetail = function (villageId) {
  return axios.request({
    url: `${config.hostApi}/childrenhome/detail?villageId=${villageId}`,
    method: 'get',
  });
};

// 课程列表
export const getCourseList = function () {
  return axios.request({
    url: `${config.hostApi}/course/courseList`,
    method: 'get',
  });
};

// 课程详情
export const getCourseDetail = function (courseId) {
  return axios.request({
    url: `${config.hostApi}/course/courseDetail?courseId=${courseId}`,
    method: 'get',
  });
};

// 课时列表
export const getLessonList = function (courseId) {
  return axios.request({
    url: `${config.hostApi}/course/lessonList?courseId=${courseId}`,
    method: 'get',
  });
};

// 知识点列表
export const getPointList = function (courseId, lessonId) {
  return axios.request({
    url: `${config.hostApi}/course/pointList?courseId=${courseId}&lessonId=${lessonId}`,
    method: 'get',
  });
};

// 课时详情
export const getLessonDetail = function (courseId, lessonId) {
  return axios.request({
    url: `${config.hostApi}/course/lessonDetail?courseId=${courseId}&lessonId=${lessonId}`,
    method: 'get',
  });
};

// 儿童之家排名列表（关爱指数）
export const getTopChildrenHomeList = function (cityId) {
  return axios.request({
    url: `${config.hostApi}/childrenhome/getTopChildrenHomeList?cityId=${cityId}`,
    method: 'get',
  });
};

// 儿童之家列表
export const getChildrenHomeList = function (token) {
  return axios.request({
    url: `${config.hostApi}/manage/getChildrenHomeList?token=${token}`,
    method: 'get',
  });
};

// 儿童之家详情
export const getChildrenHomeDetail = function (villageId) {
  return axios.request({
    url: `${config.hostApi}/childrenhome/detail?villageId=${villageId}`,
    method: 'get',
  });
};

// 成长故事列表
/*
type: 1.家长说；2.志愿者说；3.美丽心灵
activityType:1.线下活动；2线上活动
*/
export const getArticleList = function (cityId, type, pageNumber, pageSize) {
  return axios.request({
    url: `${config.hostApi}/article/list?cityId=${cityId}&type=${type}&pageNumber=${pageNumber}&pageSize=${pageSize}`,
    method: 'get',
  });
};

// 成长故事详情
export const getArticleDetail = function (Id) {
  return axios.request({
    url: `${config.hostApi}/article/detail?Id=${Id}`,
    method: 'get',
  });
};

// 获取验证码
export const getVerifyCode = function (phone) {
  return axios.request({
    url: `${config.hostApi}/manage/getVerifyCode?phone=${phone}`,
    method: 'get',
  });
};

// 用户登录
export const login = function (phone, code) {
  return axios.request({
    url: `${config.hostApi}/manage/login?phone=${phone}&code=${code}`,
    method: 'get',
  });
};

// 获取登录用户信息
export const getUserInfo = function (token) {
  return axios.request({
    url: `${config.hostApi}/manage/getUser?token=${token}`,
  });
};
// 获取城市列表
export const getCityList = function () {
  return axios.request({
    url: `${config.hostApi}/childrenhome/getCityList`,
    method: 'get',
  });
};

// 获取民族列表
export const getNationList = function () {
  return axios.request({
    url: `${config.hostApi}/children/getNation`,
    method: 'get',
  });
};

// 更新用户消息
export const updateUser = function ({
  token,
  name,
  profilePhoto,
}) {
  const data = {
    token,
    name,
    profilePhoto,
  };
  return axios.request({
    url: `${config.hostApi}/manage/updateUser?token=${data.token}&name=${data.name}&profilePhoto=${data.profilePhoto}`,
    method: 'get',
  });
};

// 上传图片
export const uploadImg = function (file) {
  return axios.request({
    url: `${config.hostApi}/manage/uploadImg`,
    data: file,
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

// 添加活动
export const addActivity = function (param) {
  const {
    token,
    name,
    type,
    childrenHomeId,
    date,
    activityType,
    socialStationId,
    isChildrenHome,
  } = param;
  if (isChildrenHome) {
    return axios.request({
      url: `${config.hostApi}/activity/add?token=${token}&name=${name}&type=${type}&childrenHomeId=${childrenHomeId}&date=${date}&activityType=${activityType}`,
      method: 'get',
    });
  }
  return axios.request({
    url: `${config.hostApi}/activity/add?token=${token}&name=${name}&type=${type}&socialStationId=${socialStationId}&date=${date}&activityType=${activityType}`,
    method: 'get',
  });
};

// 添加儿童
// token,
// childrenHomeId,
// name,
// sex,
// photo, //非必填
// childrenType, //非必填
// nation, //非必填
// idNumber,
// childrenAddress, //非必填
// health, //非必填
// shcoolLodging, //非必填
// schoolInfo, //非必填
// economicSituation, //非必填
// economicResource, //非必填
// rescueSituation, //非必填
// fatherName, //非必填
// fatherWorkAddress, //非必填
// fatherPhone, //非必填
// motherName, //非必填
// motherWorkAddress, //非必填
// motherPhone, //非必填
// guardianName,
// guardianPhone,
// relation
export const addChildren = function (data) {
  return axios.request({
    // url: `${config.hostApi}/children/add?token=${data.token}&childrenHomeId=${data.childrenHomeId}&name=${data.name}&sex=${data.sex}&name=${data.date}&idNumber=${data.idNumber}$guardianName=&{dataguardianName}&guardianPhone=${data.guardianPhone}&relation=${data.relation}`,
    url: `${config.hostApi}/children/add`,
    data: qs.stringify(data),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    method: 'post',
  });
};

// 删除儿童
export const deleteChildren = function (token, id) {
  return axios.request({
    url: `${config.hostApi}/children/delete?token=${token}&id=${id}`,
    method: 'get',
  });
};

// 添加儿童
// token,
// childrenHomeId,
// name,
// sex,
// photo, //非必填
// childrenType, //非必填
// nation, //非必填
// idNumber,
// childrenAddress,
// health,
// shcoolLodging, //非必填
// schoolInfo, //非必填
// economicSituation, //非必填
// economicResource, //非必填
// rescueSituation, //非必填
// fatherName, //非必填
// fatherWorkAddress, //非必填
// fatherPhone, //非必填
// motherName, //非必填
// motherWorkAddress, //非必填
// motherPhone, //非必填
// guardianName,
// guardianPhone,
// relation
export const editChildren = function (data) {
  return axios.request({
    // url: `${config.hostApi}/children/add?token=${data.token}&childrenHomeId=${data.childrenHomeId}&name=${data.name}&sex=${data.sex}&name=${data.date}&idNumber=${data.idNumber}$guardianName=&{dataguardianName}&guardianPhone=${data.guardianPhone}&relation=${data.relation}`,
    url: `${config.hostApi}/children/edit`,
    data: qs.stringify(data),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    method: 'post',
  });
};

// 发布活动
export const release = function (token, id, content, urls, signInImage) {
  if (urls && signInImage) {
    return axios.request({
      url: `${config.hostApi}/activity/release?token=${token}&id=${id}&content=${content}&urls=${urls}&signInImage=${signInImage}`,
      method: 'post',
    });
  }
  return axios.request({
    url: `${config.hostApi}/activity/release?token=${token}&id=${id}&content=${content}`,
    method: 'post',
  });
};

// 获取儿童详情
export const getChildrenDetail = function (childrenId) {
  return axios.request({
    url: `${config.hostApi}/children/detail?childrenId=${childrenId}`,
    method: 'get',
  });
};

// 获取社会救助服务站列表
export const getSocialStationList = function (token) {
  return axios.request({
    url: `${config.hostApi}/manage/getSocialStationList?token=${token}`,
    method: 'get',
  });
};

// 获取社会救助服务站详情
export const getSocialstationDetail = function (id) {
  return axios.request({
    url: `${config.hostApi}/socialstation/detail?id=${id}`,
    method: 'get',
  });
};

// 获取登录用户关联的儿童之家的活动列表 status活动状态，1：未完成活动，3：已完成活动
export const getActivityListByUserId = function (token, status, pageNumber, pageSize) {
  return axios.request({
    url: `${config.hostApi}/activity/getActivityListByUserId?token=${token}&status=${status}&pageNumber=${pageNumber}&pageSize=${pageSize}`,
    method: 'get',
  });
};

// 根据社会救助服务站ID取得低保列表
export const getSubsistenceList = function (token, socialStationId) {
  return axios.request({
    url: `${config.hostApi}/subsistence/list?token=${token}&socialStationId=${socialStationId}`,
    method: 'get',
  });
};

// 获取低保详情
export const getSubsistenceDetail = function (id) {
  return axios.request({
    url: `${config.hostApi}/subsistence/detail?id=${id}`,
    method: 'get',
  });
};

// 添加低保对象
// token,
// socialStationId,
// name,
// sex,
// photo, //非必填
// childrenType, //非必填
// nation, //非必填
// idNumber,
// address, //非必填
// subsistenceType, //非必填
// shcoolLodging, //非必填
// income, //非必填
// contact, //非必填
// beginDate, //非必填
// reason, //非必填
export const addSubsistence = function (data) {
  return axios.request({
    url: `${config.hostApi}/subsistence/add`,
    data: qs.stringify(data),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    method: 'post',
  });
};

// 删除低保
export const deleteSubsistence = function (token, id) {
  return axios.request({
    url: `${config.hostApi}/subsistence/delete?token=${token}&id=${id}`,
    method: 'get',
  });
};

// 编辑低保对象
// token,
// socialStationId,
// id,
// name,
// sex,
// photo, //非必填
// childrenType, //非必填
// nation, //非必填
// idNumber,
// address, //非必填
// subsistenceType, //非必填
// shcoolLodging, //非必填
// income, //非必填
// contact, //非必填
// beginDate, //非必填
// reason, //非必填
export const editSubsistence = function (data) {
  return axios.request({
    url: `${config.hostApi}/subsistence/edit`,
    data: qs.stringify(data),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    method: 'post',
  });
};

// 学校儿童之家列表
export const getSchoolChildrenHomeList = function (cityId) {
  return axios.request({
    url: `${config.hostApi}/childrenhome/getSchoolChildrenHomeList?cityId=${cityId}`,
    method: 'get',
  });
};

// 提交活动记录
export const addRecord = function (token, id, content) {
  return axios.request({
    url: `${config.hostApi}/activity/addRecord?token=${token}&id=${id}&content=${content}`,
    method: 'post',
  });
};

// 提交活动评价
export const addComment = function (token, id, content, answer) {
  return axios.request({
    url: `${config.hostApi}/activity/addComment?token=${token}&id=${id}&content=${content}&answer=${answer}`,
    method: 'post',
  });
};

// 学校儿童之家列表
export const getSocialStationActivityListByUserId = function (token, status, pageNumber, pageSize) {
  return axios.request({
    url: `${config.hostApi}/activity/getSocialStationActivityListByUserId?token=${token}&status=${status}&pageNumber=${pageNumber}&pageSize=${pageSize}`,
    method: 'get',
  });
};

// 社工站排名列表（关爱指数）
export const getTopSocialStationList = function (cityId) {
  return axios.request({
    url: `${config.hostApi}/socialstation/getTopSocialStationList?cityId=${cityId}`,
    method: 'get',
  });
};
