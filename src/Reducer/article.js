/**
 * Created by zhongwangsheng on 2018/4/7.
 */
import * as ArticleAction from '../Constant/article';

const init_state = {
  // 列表部分
  queryData: {
    keyword: '',
    tagId: '',
    pageNo: 1,
    pageSize: 10,
  },

  isQuerying: false,
  list: [],
  total: 1,

  // 详情
  detailObj: {

  },

};

export default function article(state = init_state, action) {
  switch (action.type) {
    case ArticleAction.START_QUERY_ARTICLE_LIST:
      return {...state, isQuerying: true };
    case ArticleAction.FINISH_QUERY_ARTICLE_LIST:
      return {...state, isQuerying: false };
    case ArticleAction.STORE_ARTICLE_QUERY_CONDITION:
      return {...state, queryData: action.data };
    case ArticleAction.STORE_ARTICLE_QUERY_LIST:
      return {...state, list: action.data.list, totalPage: action.data.total};
    default :
      return state;
  }
}