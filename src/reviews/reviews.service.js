const knex = require("../db/connection");

function read(review_id){
  return knex("reviews").select("*").where({ review_id }).first();
}

function readJoinCritics(review_id){
  return knex("reviews as r")
    .join("critics as c", "c.critic_id", "r.critic_id")
    .select("r.*", "c.*")
    .where({ review_id: review_id });
}

function update(updatedReview){
  return knex("reviews")
    .select("*")
    .where({ review_id: updatedReview.review_id })
    .update(updatedReview, "*")
    .then(updatedRecords => updatedRecords[0]);
}

function destroy(review_id){
  return knex("reviews").where({ review_id }).del();
}

module.exports = {
  read,
  readJoinCritics,
  update,
  delete: destroy,
}