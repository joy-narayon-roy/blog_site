const router = require("express").Router()

const homeRoutes = require("./homeRoutes.js");
const profileRoutes = require("./profileRoutes.js");
const postRouter = require("./postRouter.js");
const othRoutes = require("./othRoutes.js");
const apiRoutes = require("./apiRoutes.js");
const exploreRoutes = require("./exploreRoutes.js");
const searchRouters = require("./searchRouters.js");

const testRoute = require("./testRoute.js");
const notfound = require("./notfound.js");






let routes = [{
    path: '/',
    route: othRoutes
}, {
    path: '/',
    route: homeRoutes
}, {
    path: '/Profile',
    route: profileRoutes
}, {
    path: '/Post',
    route: postRouter
}, {
    path: '/api',
    route: apiRoutes
}, {
    path: '/explore',
    route: exploreRoutes
}, {
    path:'/search',
    route:searchRouters
},{
    path: '/test',
    route: testRoute
}]


module.exports = (app)=> {
    return routes.forEach(rout=> {
        app.use(rout.path, rout.route)
    })
}