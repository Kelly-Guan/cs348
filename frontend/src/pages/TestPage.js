import React, { useState } from "react";
import MovieCard from "../components/MovieCard";
import RatingCard from "../components/RatingCard";
import { Rat } from "lucide-react";

function Test() {
  
    const data = {
      mid: 10,
      title: "A Very Cool Movie",
      release_date: "2012-12-01",
      runtime: 90,
      description:
        "A movie about a number of important different topics revolving around around the main character and his friend.",
      poster_link: "https://image.tmdb.org/t/p/w500/vzmL6fP7aPKNKPRTFnZmiUfciyV.jpg",
    };


    const rev = {
        uid : 50,
        mid: 10,
        score : 3,
        rating_text : "movie's highly poggers",
        date_posted : "2024-06-02",
    };


  return (
    <div className="w-5/6 ml-auto p-12">
      <MovieCard movieInfo={data} cast={["Jeff Goldblum"]} genres={["Horror", "Science Fiction"]} />
      <RatingCard ratingInfo={rev} movieInfo={data} username={"rainkoybow"}/>
    </div>
  );
}

export default Test;
