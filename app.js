const Koa = require('koa')
const Router = require('koa-router')

const app = new Koa();
const router = new Router()

app.use(async (ctx, next) => {
    ctx.body = `hello ${ctx}`
    console.log("First")
    await next()
    console.log("First Done")
})

app.use(async (ctx, next) => {
    console.log("Second")
    await next()
    console.log("Second done")
})

router.post('/:id', async (ctx, next) => {
    ctx.body = ctx.request.req
    console.log(ctx.params)
    await next()
    return ctx
})

app.use(router.routes())
app.use(router.allowedMethods())
app.listen(3000, () => console.log("Server is running"))