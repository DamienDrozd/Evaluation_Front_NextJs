import { useEffect, useState } from "react";
import useFetch from "@/hooks/useFetch";
import Loading from "@/components/UI/Loading";
import FreelanceGrid from "@/components/freelance/FreelanceGrid";
import styles from "./index.module.scss";
import Title from "@/components/UI/Title";
import Input from "@/components/UI/Input";

const Index = () => {
  const [searchString, setSearchString] = useState("");
  const { data, error, loading, fetchData } = useFetch({url:"/user/freelance/", method:"GET", body:null, token:null});
  const { data: searchData, error: searchError, loading: searchLoading, fetchData: searchFetchData } = useFetch({url:"/user/freelance/", method:"GET", params:{searchString: searchString}, token:null});

  useEffect(() => {
    fetchData();
  },[]);

  console.log(data, "data")
  console.log(searchData, "searchData")

  const search = (e) => {
    e.preventDefault();
    console.log(e.target.search.value)
    searchFetchData()
  }

  useEffect(() => {
    if (searchData) {
      console.log(searchData, "searchData")
    }
  }, [searchData])  



  if(loading) <Loading/> 
  if (error) console.log(error);

  return (
    <>
      <Title Level="h1" title="Freelances" />
      <div className={styles.search}>
        <form onSubmit={(e) => search(e)}>
          <Input type="text" name="search" placeholder="Search" onChange={(e) => setSearchString(e)}/>
          <button type="submit">Search</button>
        </form>
      </div>
      <div className={styles.container}>
        {
          <FreelanceGrid freelances={data}/>
        }
      </div>
    </>
  );
}

export default Index;
