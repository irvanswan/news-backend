const authRoute = require('./auth')
const newsRoute = require('./news')
const usersRoute = require('./users')
const commentsRoute = require('./comments')
const categoryRoute = require('./categories')

const routes = (route, prefix)=>{
    route.use(`${prefix}/auth`, authRoute)
    route.use(`${prefix}/news`, newsRoute)
    route.use(`${prefix}/users`, usersRoute)
    route.use(`${prefix}/comments`, commentsRoute)
    route.use(`${prefix}/categories`, categoryRoute)
}

module.exports = routes