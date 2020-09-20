module.exports = async (ctx, next) => {
    if (ctx.from.is_bot == true) {
        ctx.reply('Ошибка, я общаюсь только с людьми!')
    }
    else {
        next()
    }
}