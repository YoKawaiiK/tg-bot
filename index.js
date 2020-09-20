"use strict"
// Library
const { Telegraf, Stage, session } = require('telegraf'),
    dotenv = require('dotenv').config()

const middlewares = require('./middlewares/index'),
    router = require('./routers/index'),
    scenes = require('./scenes/index')

// Code
const bot = new Telegraf(process.env.BOT_TOKEN)

const stage = new Stage([...scenes])

bot
    // error handler
    .catch(router.error)
    // all midlewares
    .use(...middlewares)

    // use scenes 
    // order of priority is important!
    .use(session())
    .use(stage.middleware())

    // start handler
    .start(router.start)

    .command('/menu', router.menu)

    // scenes handler
    .command('/currency', (ctx) => {
        ctx.scene.enter('currency')
    })

    // action (markdown button click)
    // too scenes handler
    .on('callback_query', async (ctx) => {
        ctx.scene.enter(ctx.update.callback_query.data)
    })

    // start working bot
    .launch()
