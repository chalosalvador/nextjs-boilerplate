import fetch from 'isomorphic-unfetch';
import ArticleList from "../../components/ArticleList";
import Layout from "../../components/Layout";
import {NextPage} from "next";
import React from 'react';

interface Props {
  articles: []
}

const ArticleListPage : NextPage<Props> = ( props : Props) => (
  <>
    <ArticleList articles={props.articles}/>
  </>
);

ArticleListPage.getInitialProps = async function () {
  const res = await fetch('http://localhost:8000/api/articles');
  const data = await res.json();

  console.log(`Show data fetched. Count: ${data.length}`);

  return {
    articles: data//.map(entry => entry.title)
  };
};

export default ArticleListPage;
