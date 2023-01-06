const reviewsService = require("./reviews.service");
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');
const reduceProperties = require('../utils/reduce-properties');

async function reviewExists(req, res, next){
  const review = await reviewsService.read(req.params.reviewId);
  if(review){
    res.locals.review = review;
    return next();
  }
  next({ status: 404, message: "Review cannot be found." })
}

async function read(req, res, next){
  const { review: data } = res.locals;
  res.json({ data });
}

async function update(req, res, next){
  const updatedReview = {
    ...req.body.data,
    review_id: res.locals.review.review_id,
  }

  await reviewsService.update(updatedReview);
  
  const data = await reviewsService.readJoinCritics(res.locals.review.review_id);
  const reduceCritic = reduceProperties("review_id", {
    critic_id: ["critic", "critic_id"],
    preferred_name: ["critic", "preferred_name"],
    surname: ["critic", "surname"],
    organization_name: ["critic", "organization_name"],
  })
  res.json({ data: reduceCritic(data)[0] });
}

async function destroy(req, res, next){
  const { review } = res.locals;
  await reviewsService.delete(review.review_id);
  res.sendStatus(204);
}

module.exports = {
  read: [asyncErrorBoundary(reviewExists), read],
  update: [asyncErrorBoundary(reviewExists), update],
  delete: [reviewExists, destroy],
}