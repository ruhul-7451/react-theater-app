import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.scss";
import useFetch from "../../../hooks/useFetch";
import { useSelector } from "react-redux";
import Img from "../../../components/lazyLoadImg/img";
import ContentWrapper from "../../../components/contentWrapper/contentWrapper";
const HeroBanner = () => {
  const [background, setBackground] = useState("");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { url } = useSelector((state) => state.home);
  const { data, loading, error } = useFetch("/movie/upcoming");

  useEffect(() => {
    if (data) {
      const randomIndex = Math.floor(Math.random() * data?.results.length);
      const bg = url.backdrop + data?.results?.[randomIndex]?.backdrop_path;
      setBackground(bg);
    }
  }, [data]);

  const handleQuery = (event) => {
    event.preventDefault();
    if (event.key === "Enter" && query.length > 0) {
      console.log(event.target.value);
      navigate(`/search/${query}`);
    }
  };
  return (
    <div className="heroBanner">
      {!loading && (
        <div className="backdrop-img">
          <Img src={background}></Img>
        </div>
      )}
      <div className="opacity-layer"></div>

      <ContentWrapper>
        <div className="heroBannerContent">
          <span className="title">Welcome</span>
          <span className="subTitle">
            Millions of Movies, Tv shows and people to discover. Explore now.
          </span>
          <div className="searchInput">
            <input
              type="text"
              placeholder="Search for a movie or tv show..."
              onChange={(event) => setQuery(event.target.value)}
              onKeyUp={handleQuery}
            />
            <button className="button">Search</button>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default HeroBanner;
