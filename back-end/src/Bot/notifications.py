from src.Bot.bot import bot
from src.repository.BotRepository import BotRepository
from src.Order.models import Orders
from src.Promo.models import Promo


async def notif_create_order(user_id: int, order: Orders):
    text_message = (f'Вы успешно создали заказ <b>№{order.id}</b>!\nСумма к оплате: <b>{order.total_price}</b> у.е.')
    try:
        chat_id = await BotRepository.get_chat_id(user_id)
        if chat_id:
            await bot.send_message(chat_id, text_message, parse_mode='html')
    except BaseException() as ex:
        print(str(ex))


async def notif_pay_order(user_id: int, order: Orders):
    text_message = (f'Вы успешно оплатили заказ <b>№{order.id}</b>!')
    try:
        chat_id = await BotRepository.get_chat_id(user_id)
        if chat_id:
            await bot.send_message(chat_id, text_message, parse_mode='html')
    except BaseException() as ex:
        print(str(ex))


async def notif_create_promo(promo: Promo):
    text_message = (f'<b>Добавлен новый промокод</b>!\n{promo.code} на скидку в {promo.sale} у.е.\n'
                    f'<b>Успейте им воспользоваться!</b>')
    try:
        chats_id = await BotRepository.get_all_chats_id()
        for chat_id in chats_id:
            await bot.send_message(chat_id, text_message, parse_mode='html')
    except BaseException() as ex:
        print(str(ex))

