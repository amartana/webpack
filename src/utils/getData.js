const API = process.env.API
import {useState, useEffect} from 'react'

export function useGetData(){
  const [data, setData] = useState(null)

  useEffect(()=>{
    const apiURl = API;
    async function fetchData(){
    try {
      const response = await fetch(apiURl);
      const data = await response.json();
      setData(data.results[0]);
    } catch (error) {
      console.log('Fetch Error', error);
    };
  }
  fetchData()
  }, [])

  return data
}















// function getData() {
//   React.useEffect(() => {

//   const [data, setData] = React.useState({})

//   fetch()

  
//   return () => {
//     setData({});
//   };
// }, []);
// }



// const fetch = async (id) => {
//   const apiURl = id ? `${API}${id}` : API;
  
//   setData(data)
//   console.log(data)
//   return data

// };
