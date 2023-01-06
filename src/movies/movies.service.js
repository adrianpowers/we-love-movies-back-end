const knex = require("../db/connection");

function list(){
  return knex("movies").select("*");
}

function currentlyShowing(){
  return knex("movies as m")
  .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
  .groupBy("m.movie_id")
  .select("m.*")
  .where("mt.is_showing", true);
}

function read(movieId){
  return knex("movies as m")
  .select("m.*")
  .where({ "m.movie_id": movieId })
  .first();
}

function movieTheaters(movie){
  return knex("movies as m")
  .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
  .join("theaters as t", "mt.theater_id", "t.theater_id")
  .select("t.*", "mt.is_showing", "m.movie_id")
  .where({ "m.movie_id": movie.movie_id });
}

function movieReviews(movie){
  return knex("movies as m")
    .join("reviews as r", "m.movie_id", "r.movie_id")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select("r.*", "c.*")
    .where({ "m.movie_id": movie.movie_id });
}
  
  module.exports = {
    list,
    currentlyShowing,
    read,
    movieTheaters,
    movieReviews
}