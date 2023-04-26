import { useState } from "react";

const useFetch = ({ url, method, body, token }) => {

  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      console.log(`${process.env.NEXT_PUBLIC_API_URL}${url}`)
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
        headers: {
          "Content-Type": "Application/json",
          ...token && {
            "authorization":token
          }
        },
        method: method,
        ...body && {
          body:JSON.stringify(body)
        }
      });
      const dataJson = await response.json();
      let status_code = response.status;
      if (status_code !== 200) {
        throw new Error(dataJson.message);
      }
      dataJson.success = true;
      console.log("dataJson : ", dataJson);
      setData(dataJson);
      setLoading(false)
    }
    catch (error) {
      console.log("error : ", error);
      setError(error)
      setLoading(false)
    }
    finally {
      setTimeout(() => {
        setLoading(false)
      }, 1000)
    }
    
  }

  return {fetchData, data, error, loading}

}

export default useFetch;