import React from "react";

import Carousel from "../../../components/carousel/Carousel";
import useFetch from "../../../hooks/UseFetch"

const Recommendation = ({ mediaType, id , num }) => {
    const { data, loading, error } = useFetch(  `/${mediaType}/${id}/recommendations`);
    
    return (
        <Carousel
            title="Recommendations"
            data={data?.results}
            loading={loading}
            endpoint={mediaType}
            num={num}
        />
    
    );
};

export default Recommendation;