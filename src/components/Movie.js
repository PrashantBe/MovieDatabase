import React from "react";
import { useParams } from 'react-router-dom';
//config
import { IMAGE_BASE_URL, POSTER_SIZE } from "../config";
//Components
import Grid from "./Grid/Index";
import Spinner from "./Spinner/Index";
//Hook
import { useMovieFetch } from "./hooks/useMovieFetch";
//Image
import NoImage from "../images/no_image.jpg";
import BreadCrumb from "./BreadCrumb/Index";
import MovieInfo from './MovieInfo/Index'
import MovieInfoBar from "./MovieInfoBar";
import Actor from "./Actor";

const Movie = () => {
  const { movieId} = useParams();
  
  const { state: movie, loading, error} = useMovieFetch(movieId);
  if(loading) return <Spinner />
  if(error) return <div>Something Went Wrong....</div>
  return (
    <>
      <BreadCrumb movieTitle={movie.original_title} />
      <MovieInfo movie={movie}/>
      <MovieInfoBar 
        time={movie.runtime}
        budget={movie.budget}
        revenue={movie.revenue}
      />
      <Grid header='Actors'>
          {movie.actors.map(actor => (
            <Actor
              key={actor.credit_id}
              name={actor.name}
              character={actor.character}
              imageUrl={
                actor.profile_path
                  ? `${IMAGE_BASE_URL}${POSTER_SIZE}${actor.profile_path}`
                  : NoImage
              }
            />
          ))}
        </Grid>
    </>
  );
};

export default Movie;
