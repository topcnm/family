/**
 * Created by zhongwangsheng on 2017/12/18.
 */
//const baseUrl = 'http://app.ecsphere.net:9011';
const baseUrl = '';

module.exports = {
  login: `${baseUrl}/blog/login`,
  logout: `${baseUrl}/blog/logout`,

  createArticle: `${baseUrl}/blog/create`,
  updateArticle: `${baseUrl}/blog/update`,
  getArticleDetail: `${baseUrl}/blog/detail`,

  queryArticleList: `${baseUrl}/blog/page`,
};
