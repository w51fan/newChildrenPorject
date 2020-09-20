import axios from 'axios';
import qs from 'qs';

//获取轮播图
export const getHomeImgList = function (cityId) {
    return axios.request({
        url: `https://api.quanjiaxue.net/news/list?cityId=${cityId}&type=${1}`,
        method: "get"
    });
}
//置顶
export const getMenuList = function (cityId) {
    return axios.request({
        url: `https://api.quanjiaxue.net/news/list?cityId=${cityId}&type=${2}`,
        method: "get"
    });
}
//新闻列表
export const getNewsList = function (cityId, pageNumber, pageSize) {
    return axios.request({
        url: `https://api.quanjiaxue.net/news/list?cityId=${cityId}&type=${3}&pageNumber=${pageNumber}&pageSize=${pageSize}`,
        method: "get"
    });
}

//领导小组
export const getGoveList = function (cityId) {
    return axios.request({
        url: `https://api.quanjiaxue.net/news/list?cityId=${cityId}&type=${4}`,
        method: "get"
    });
}
