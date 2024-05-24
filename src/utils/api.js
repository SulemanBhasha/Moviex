import axios from "axios";



const BASE_URL="https://api.themoviedb.org/3"

const TMDB_TOKEN="eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiOTk1MjFiNjI2YzNmYThlZDI5MDM0N2I5NjIyZmE3ZSIsInN1YiI6IjY2NDhkYTI3YWMxMTFkOGI2ODdjNmRmNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yC01oD0meEOEzwq6qp5xIc_gLHkEgnGOoR7zCtQ5_G0"

const headers={
    Authorization :"bearer "+ TMDB_TOKEN,
}

export const fetchDataFromApi =async (url,params)=>{
    try {
        const {data} = await axios.get(BASE_URL+url,{
            headers,
            params
        })
        
        
        return data;

    } catch (error) {
        console.log(error);
        return error;
    }

}