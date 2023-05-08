import { useEffect, useState } from "react";
import useFetch from "@/hooks/useFetch";
import Loading from "@/components/UI/Loading";
import FreelanceGrid from "@/components/user/FreelanceGrid";
import styles from "./index.module.scss";
import SearchBar from "@/components/UI/SearchBar";
import ImageBanner from "@/components/UI/ImageBanner"
import SearchFilter from "@/components/UI/SearchFilter"

const Index = () => {
  const [searchString, setSearchString] = useState("");
  const [filters, setFilters] = useState({});
  const [data, setData] = useState([]);
  const { data: fullData, error, loading, fetchData } = useFetch({url:"/user/freelance/", method:"GET", body:null, token:null});
  const { data: searchData, error: searchError, loading: searchLoading, fetchData: searchFetchData } = useFetch({url:`/user/freelance/search/${searchString}`, method:"GET", params:{searchString: searchString}, token:null});
  const { data: filterData, error: filterError, loading: filterLoading, fetchData: filterFetchData } = useFetch({url:"/user/freelance/filter/", method:"POST", body:filters, token:null});

  useEffect(() => {
    fetchData();
  },[]);



  useEffect(() => {
    if (fullData !== undefined && fullData !== null && fullData.length > 0) {
      setData(fullData)
    }
  }, [fullData])

  useEffect(() => {
    if (searchData !== undefined && searchData !== null && searchData.length > 0) {
      setData(searchData)
    }
  }, [searchData])

  useEffect(() => {
    if (filterData !== undefined && filterData !== null && filterData.length > 0) {
      setData(filterData)
    }
  }, [filterData])



  if(loading || searchLoading || filterLoading) return <Loading/> 
  if (error) console.log(error);
  if (searchError) console.log(searchError);
  if (filterError) console.log(filterError);

  return (
    <>
      <ImageBanner  title="Trouvez votre prochain Freelance" image="https://512pixels.net/wp-content/uploads/2020/06/11-0-Color-Day-thumbnails-500x500.jpg"/>
      <div className={styles.container}>
        <div className={styles.Left}>
          <SearchFilter title="Filter your search" submit={filterFetchData} setFilters={setFilters} filters={filters}/>
        </div>
        <div className={styles.Right}>
          <SearchBar title="Rechercher" submit={searchFetchData} setSearchString={setSearchString}/>
          {data !== [] && data.length > 0 && data !== null ? <FreelanceGrid freelances={data}/> : <p>No freelances found</p>}
        </div>
      </div>
    </>
  );
}

export default Index;
