const moviesService = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const reduceProperties = require('../utils/reduce-properties');

async function list(req, res, next){
  const isShowing = req.query.is_showing;
  if(isShowing) {
    const data = await moviesService.currentlyShowing();
    return res.json({ data });
  }
  const data = await moviesService.list();
  res.json({ data });  
}

async function movieExists(req, res, next){
  const movie = await moviesService.read(req.params.movieId);
  if(movie){
    res.locals.movie = movie;
    return next();
  }
  next({ status: 404, message: "Movie cannot be found."})
}

async function read(req, res, next){
  const { movie: data } = res.locals;
  res.json({ data });
}

async function movieTheaters(req, res, next){
  res.json({ data: await moviesService.movieTheaters(res.locals.movie) });
}

async function movieReviews(req, res, next){
  const data = await moviesService.movieReviews(res.locals.movie)
  const reduceCritic = reduceProperties("review_id", {
    preferred_name: ["critic", "preferred_name"],
    surname: ["critic", "surname"],
    organization_name: ["critic", "organization_name"],
  })
  res.json({ data: reduceCritic(data) });
}

module.exports = {
  list: asyncErrorBoundary(list),
  read: [asyncErrorBoundary(movieExists), read],
  movieTheaters: [asyncErrorBoundary(movieExists), movieTheaters],
  movieReviews: [asyncErrorBoundary(movieExists), movieReviews]
}