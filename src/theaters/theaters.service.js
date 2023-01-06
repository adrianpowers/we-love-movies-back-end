const knex = require("../db/connection");

function list(){
  return knex("theaters as t")
    .join("movies_theaters as mt", "mt.theater_id", "mt.theater_id")
    .join("movies as m", "m.movie_id", "mt.movie_id")
    .groupBy("t.theater_id", "m.movie_id")
    .select("t.*", "m.*");
}

module.exports = {
  list
}