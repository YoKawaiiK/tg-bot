
module.exports = async (ctx) => {
    await ctx.reply(`Привет, ${ctx.from.first_name}!`)
}

