/**
 * Created by zhongwangsheng on 2018/4/7.
 */
import * as ArticleAction from '../Constant/article'
import { getData } from '../Fetch/fetch'
import Api from '../Fetch/api'

export function start_query() {
  return {
    type: ArticleAction.START_QUERY_ARTICLE_LIST,
  }
}

export function finish_query() {
  return {
    type: ArticleAction.FINISH_QUERY_ARTICLE_LIST,
  }
}

export function overwrite_query_condition(data) {
  return {
    type: ArticleAction.STORE_ARTICLE_QUERY_CONDITION,
    data
  }
}

export function store_query_list(data) {
  return {
    type: ArticleAction.STORE_ARTICLE_QUERY_LIST,
    data
  }
}

export function queryList() {
  return (dispatch, getState) => {
    const { article: { queryData } } = getState();
    dispatch(start_query());
    return getData(Api.queryArticleList, queryData).then(({success, result, error}) => {
      dispatch(finish_query());
      if (success) {
        const { list, total } = result;
        console.log(900, list)
        dispatch(store_query_list({list, total}))
      } else {
        dispatch(store_query_list([]))
      }
    })
  }
}