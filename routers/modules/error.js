module.exports = async (err, ctx) => {
    await ctx.reply('Возникла ошибка в моей работе...')
    console.log(err);
}
