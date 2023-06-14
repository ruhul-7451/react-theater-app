import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

import "./style.scss";

import { fetchDataFromApi } from "../../utils/api";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import MovieCard from "../../components/movieCard/MovieCard";
import noResults from "../../assets/no-results.png";
import Spinner from "../../components/spinner/Spinner";
const SearchResult = () => {
  const [data, setData] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const { query } = useParams();

  const fetchInitData = () => {
    setLoading(true);
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then(
      (res) => {
        setData(res);
        setPageNum((prev) => prev + 1);
        setLoading(false);
      }
    );
  };

  const fetchNextPageData = () => {
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then(
      (res) => {
        if (data?.results) {
          setData({
            ...data,
            results: [...data?.results, ...res.results],
          });
        } else {
          setData(res);
        }
        setPageNum((prev) => prev + 1);
      }
    );
  };

  useEffect(() => {
    setPageNum(1);
    fetchInitData();
  }, [query]);

  return (
    <div className="searchResultsPage">
      {loading && <Spinner initial={true} />}
      {data?.results?.length > 0 ? (
        <ContentWrapper>
          <div className="pageTitle">{`Search ${
            data?.total_results > 1 ? "results" : "result"
          } of '${query}'`}</div>
          <InfiniteScroll
            className="content"
            dataLength={data?.results?.length || []}
            next={fetchNextPageData}
            hasMore={data?.total_pages > pageNum}
            loader={<Spinner />}
          >
            {data?.results.map((item, index) => {
              if (item.media_type === "person") return;
              return <MovieCard key={index} data={item} fromSearch={true} />;
            })}
          </InfiniteScroll>
        </ContentWrapper>
      ) : (
        <span className="resultNotFound">Sorry, Results not found</span>
      )}
    </div>
  );
};

export default SearchResult;
