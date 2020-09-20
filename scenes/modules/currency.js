const { reply } = require('telegraf/scenes/wizard');
const WizardScene = require('telegraf/scenes/wizard'),
    fetch = require('node-fetch'),
    validateCurrencyCode = require('validate-currency-code')

const currency = new WizardScene('currency',
    async (ctx) => {
        // console.log(1);
        await ctx.reply(`Введи две валюты (через запятую).` +
        ` Первая, валюта курс которой вы хотите узнать.` +
        ` Вторая - Ваша валюта.`)

        await ctx.wizard.next()
    },
    async (ctx) => {
        // array
        let currencyCode = ctx.message.text.replace(/\s+/g, '').split(',');

        let counterNotValute = 0;
        await currencyCode.forEach(value => {
            if (!validateCurrencyCode(value)) {
                counterNotValute++
            }
        })

        if (counterNotValute > 0) {
            await ctx.reply(`Это не код валюты`)
            await ctx.wizard.back()
            // 'return' is necessarily
            // else not working
            return ctx.wizard.steps[ctx.wizard.cursor](ctx)
        }

        let currencyConvertString = `${currencyCode[0]}_${currencyCode[1]}`

        try {
            let url = `https://free.currconv.com/api/v7/convert?` +
            `q=${currencyConvertString}` +
            `&compact=ultra&apiKey=${process.env.API_CURRENCY_TOKEN}`
            let response = await fetch(url, 
                {
                    method: 'GET',
                })
            response = await response.json()
            await ctx.reply(
                `${currencyConvertString}: ` +
                `${response[currencyConvertString].toFixed(2)}`
            )
        } 
        catch (error) {
            reply(`Где-то здесь возникла ошибка...`)
        }

        return ctx.scene.leave();
    } 
)

module.exports = currency