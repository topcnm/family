/**
 * Created by zhongwangsheng on 2017/12/18.
 */
//const baseUrl = 'http://app.ecsphere.net:9011';
const baseUrl = '';

module.exports = {
  login: `${baseUrl}/user/login`,
  logout: `${baseUrl}/user/logout`,
  register: `${baseUrl}/user/register`,

  createArticle: `${baseUrl}/post/create`,
  updateArticle: `${baseUrl}/post/update`,
  getArticleDetail: `${baseUrl}/post/detail`,
  queryArticleList: `${baseUrl}/post/page`,

  uploadFiles: `${baseUrl}/album/upload`,
  getPictureList: `${baseUrl}/album/pic/list`,
  getAlbumList: `${baseUrl}/album/list`,
  getAlbumDetail: `${baseUrl}/album/detail`,
  createAlbum: `${baseUrl}/album/create`,
  deleteAlbum: `${baseUrl}/album/delete`,

  setPictureBelong: `${baseUrl}/album/pic/belong`,
  setFrontPic: `${baseUrl}/album/setFront`,
};
