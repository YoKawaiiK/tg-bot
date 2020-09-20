const { Markup } = require('telegraf')

module.exports = async (ctx) => {
    await ctx.reply(
        `Выбери действие`, 

        Markup.inlineKeyboard([
            {
                text: 'Узнать курс валютной пары',
                callback_data: 'currency'
            }
        ]).extra()
    )
    return
}

