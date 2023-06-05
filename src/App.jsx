import { useState, useEffect } from "react";
import { fetchDataFromApi } from "./utils/api";
import { useSelector, useDispatch } from "react-redux";
import { getApiConfiguration } from "./store/homeSlice";

function App() {
  const dispatch = useDispatch();
  const url = useSelector((state) => state.url);
  useEffect(() => {
    testDataFetch();
  }, []);

  const testDataFetch = () => {
    fetchDataFromApi("/movie/popular").then((res) => {
      console.log(res);
      dispatch(getApiConfiguration(res));
    });
  };

  return <div className="App">App {url?.total_pages}</div>;
}

export default App;
