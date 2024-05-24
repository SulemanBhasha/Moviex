import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import "./style.scss";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import useFetch from "../../../hooks/UseFetch.js";
import Genres from "../../../components/genres/Genres";
import CircleRating from "../../../components/circleRating/CircleRating";
import Img from "../../../components/lazyLoadImage/Img.jsx";
import PosterFallback from "../../../assets/no-poster.png";
import { PlayBtn } from "./PlayBtn.jsx";
import VideoPopup from "../../../components/videoPopup/VideoPopup.jsx";

const DetailsBanner = ({ video, crew }) => {
  
  
    const[videoId, setVideoId]= useState(null)
    const[show ,setShow]= useState(false)

  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}`);

  const { url } = useSelector((state) => state.home);

  const _genres = data?.genres?.map((g) => g.id);

  const director = crew?.filter((f) => f.job === "Director");
  const writer = crew?.filter(
    (f) => f.job === "Story" || f.job === "Writer" || f.job === "Screenplay"
  );

  const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
  };

  return (
    <div className="detailsBanner">
      {!loading ? (
        <>
          {!!data && (
            <React.Fragment>
              <div className="backdrop-img">
                <Img src={url.backdrop + data?.backdrop_path}></Img>
              </div>
              <div className="opacity-layer"></div>
              <ContentWrapper>
                <div className="content">
                  <div className="left">
                    {data.poster_path ? (
                      <Img
                        className="posterImg"
                        src={url.backdrop + data.poster_path}
                      ></Img>
                    ) : (
                      <Img className="posterImg" src={PosterFallback}></Img>
                    )}
                  </div>
                  <div className="right">
                    <div className="title">
                      {`${data.name || data.title} (${dayjs(
                        data.realese_date
                      ).format("YYYY")})`}
                    </div>
                    <div className="subtitle">{data.tagline}</div>
                    <Genres data={_genres}></Genres>
                    <div className="row">
                      <CircleRating
                        rating={data?.vote_average.toFixed(1)}
                      ></CircleRating>
                      <div
                        className="playbtn"
                                 onClick={(s)=>
                                    (setShow(true),
                                    setVideoId(video.key)
                                 )}
                                
                      >
                        <PlayBtn></PlayBtn>
                        <span className="text">Watch Trailer</span>
                      </div>
                    </div>

                    <div className="overview">
                      <div className="heading">Overview</div>
                      <div className="description">{data.overview}</div>
                    </div>
                    <div className="info">
                      {data?.status && (
                        <div className="info-item">
                          <span className="text bold">Status : </span>
                          <span className="text ">{data.status}</span>
                        </div>
                      )}
                      {data?.release_date && (
                        <div className="info-item">
                          <span className="text bold">Release Date : </span>
                          <span className="text ">
                            {dayjs(data.release_date).format("MMM D YYYY")}
                          </span>
                        </div>
                      )}

                      {data?.runtime && (
                        <div className="info-item">
                          <span className="text bold">Duration : </span>
                          <span className="text ">
                            {toHoursAndMinutes(data?.runtime)}
                          </span>
                        </div>
                      )}
                    </div>

                    {director?.length > 0 && (
                      <div className="info">
                        <span className="text bold">Director: </span>
                        <span className="text">
                          {director?.map((d, i) => (
                            <span key={i}>
                              {d.name}
                              {director.length - 1 !== i && ", "}
                              {director.length - 1 == i && " ."}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}
                    {writer?.length > 0 && (
                      <div className="info">
                        <span className="text bold">writer: </span>
                        <span className="text">
                          {writer?.map((d, i) => (
                            <span key={i}>
                              {d?.name}
                              {writer.length - 1 !== i && ", "}
                              {writer.length - 1 == i && " ."}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}
                    {data?.created_by?.length > 0 && (
                      <div className="info">
                        <span className="text bold">writer: </span>
                        <span className="text">
                          {data?.created_by?.map((d, i) => (
                            <span key={i}>
                              {d.name}
                              {data?.created_by?.length - 1 !== i && ", "}
                              {data?.created_by?.length - 1 == i && " ."}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <VideoPopup 
                show={show}
               setShow={setShow}
                videoId={videoId}
                setVideoId={setVideoId}
                ></VideoPopup>
                
              </ContentWrapper>
            </React.Fragment>
          )}
        </>
      ) : (
        <div className="detailsBannerSkeleton">
          <ContentWrapper>
            <div className="left skeleton"></div>
            <div className="right">
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
            </div>
          </ContentWrapper>
        </div>
      )}
    </div>
  );
};

export default DetailsBanner;
