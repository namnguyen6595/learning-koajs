const Koa = require('koa')
const Router = require('koa-router')
const rawBody = require('raw-body')
const session = require('koa-session')

const app = new Koa();
const router = new Router()

app.keys = ['key1', 'key2']
app.use(session(app))


app.use(async function (ctx, next) {
    ctx.cookies.set('name', 'tobi', { signed: true })

    if (ctx.method !== 'GET' || ctx.path !== '/message') {
        return await next()
    }

    const messages = ctx.session.messages || []

    ctx.body = ctx.req.headers.cookie
})

app.use(async function (ctx, next) {
    if (ctx.method !== 'POST' || ctx.path !== '/new-message') return await next()

    const message = await rawBody(ctx.req, {
        encoding: 'utf8'
    })

    // push the message to the session

    ctx.session.message = ctx.session.message || []
    ctx.session.message.push(message)
})

app.use(router.allowedMethods())
app.listen(3000, () => console.log("Server is running"))