from telebot.async_telebot import AsyncTeleBot
from email_validator import validate_email, EmailNotValidError
from telebot import types
from src.repository.BotRepository import BotRepository


async def telegram_bot():
    bot = AsyncTeleBot('7501101529:AAE8yT0isiPGJUtMkr6rTVyginfwiMtFWmQ')
    command1 = types.BotCommand('start', 'Начать общение с ботом')
    command2 = types.BotCommand('site', 'Перейти на веб-сайт')
    command3 = types.BotCommand('info', 'Получить список важных команд')
    await bot.set_my_commands([command1, command2, command3])

    def check_link_email(chat_id) -> bool:
        if BotRepository.get_check_link_user_with_bot(chat_id) != chat_id:
            return False
        return True

    async def answer_not_link(chat_id):
        await bot.send_message(chat_id, 'Вы не привязали телеграмм-бота к вашей учетной записи в '
                                        'онлайн-магазине, чтобы это сделать введите команду "/start" и '
                                        'следуйте дальнейшим инструкциям!')

    @bot.message_handler(commands=['start'])
    async def start(message):
        markup = types.InlineKeyboardMarkup()
        button = types.InlineKeyboardButton('Перейти на сайт', url='https://127.0.0.1:3000')
        markup.row(button)
        await bot.send_message(message.chat.id,
                               'Начните общение с ботом магазина прямо сейчас! Введите команду "/login" и '
                               'после команды через пробел укажите свой логин (email), '
                               'с которым зарегистрировались на сайте магазина. '
                               '\nПример: /login example@mail.ru', reply_markup=markup)

    @bot.message_handler(commands=['info'])
    async def handler(message):
        # Проверка на наличие id_chat в БД
        chat_id = message.chat.id
        check = check_link_email(chat_id)
        if not check:
            await answer_not_link(chat_id)
        else:
            markup = types.ReplyKeyboardMarkup()
            button_1 = types.KeyboardButton('Посмотреть заказы')
            button_2 = types.KeyboardButton('Посмотреть статус заказа')
            button_3 = types.KeyboardButton('Промокоды')

            markup.row(button_1)
            markup.row(button_2)
            markup.row(button_3)

            await bot.send_message(message.chat.id, 'Вот список полезных команд с описанием:\n '
                                                    '1. Чтобы вывести список всех активных заказов '
                                                    'используйте команду: "/orders"\n '
                                                    '2. Чтобы узнать статус заказа введите: "/order id", '
                                                    'где id - номер заказа\n'
                                                    '3. Чтобы узнать ваши активные промокоды введите: "/promo"',
                                   reply_markup=markup)

    @bot.message_handler(commands=['site'])
    async def handler(message):
        markup = types.InlineKeyboardMarkup()
        button = types.InlineKeyboardButton('Перейти на сайт', url='https://127.0.0.1:3000')
        markup.row(button)
        await bot.send_message(message.chat.id, 'Нажимай на кнопку ниже!', reply_markup=markup)

    @bot.message_handler(commands=['login'])
    async def set_login(message):
        chat_id = message.chat.id
        text_message = message.text.split(' ')
        if len(text_message) != 2:
            await bot.send_message(message.chat.id, 'Неверно указан логин (email)!')
        email = text_message[1]
        try:
            validate_email(email)
            is_valid = True
        except EmailNotValidError as e:
            print("Invalid email address:", str(e))
            is_valid = False
        if not is_valid:
            await bot.send_message(chat_id, 'Неверно указан логин (email)!')
        # Добавление id чата в БД
        result = BotRepository.link_chat_id_with_user(email, chat_id)
        if result != chat_id:
            # Если не нашли такую почту в БД
            await bot.send_message(chat_id, 'Учётной записи с таким логином не существует!')
        else:
            await bot.send_message(chat_id, 'Аккаунт успешно привязан!')

    @bot.message_handler(commands=['orders'])
    async def get_all_orders(message):
        chat_id = message.chat.id
        check = check_link_email(chat_id)
        if not check:
            await answer_not_link(chat_id)
        else:
            # Получение всех заказов пользователя из БД
            orders = BotRepository.get_all_orders(chat_id)
            # Если нет заказов
            if not orders:
                await bot.send_message(chat_id, 'У вас нет активных заказов')
            # Если есть заказы
            else:
                await bot.send_message(chat_id, orders)


    @bot.message_handler(commands=['order'])
    async def get_order_by_order_id(message):
        chat_id = message.chat.id
        check = check_link_email(chat_id)
        if not check:
            await answer_not_link(chat_id)
        else:
            text_message = message.text.split(' ')
            if len(text_message) != 2:
                await bot.send_message(message.chat.id, 'Команда указана неверно!')
            try:
                order_id = int(text_message[1])
            except:
                await bot.send_message(message.chat.id, 'Номер заказа указан неверно!')
            # Обращение к БД + проверка, что у чела есть такой заказ
            order = BotRepository.get_order_by_order_id(order_id, chat_id)
            if not order:
                # Если не нашли заказ
                await bot.send_message(chat_id, 'Такого заказа не существует!')
            else:
                await bot.send_message(chat_id, order)


    @bot.message_handler(commands=['promo'])
    async def get_promo(message):
        chat_id = message.chat.id
        check = check_link_email(chat_id)
        if not check:
            await answer_not_link(chat_id)
        else:
            promo = BotRepository.get_promo()
            if not promo:
                # Если не нашли промокоды
                await bot.send_message(chat_id, 'У вас нет промокодов')
            else:
                await bot.send_message(chat_id, promo)


    @bot.message_handler(content_types=['text'])
    async def get_info_of_orders_or_promo(message):
        chat_id = message.chat.id
        check = check_link_email(chat_id)
        if not check:
            await answer_not_link(chat_id)
        else:
            if message.text == 'Посмотреть заказы':
                await bot.send_message(chat_id, 'У тебя ничего нет!!!!!')
            elif message.text == 'Посмотреть статус заказа':
                await bot.send_message(chat_id, 'Введите номер заказа')
            elif message.text == 'Промокоды':
                await bot.send_message(chat_id, 'У тебя нет промокодов!!!!!')
            elif int(message.text):
                # Обращение к БД + проверка, что у чела есть такой заказ
                order_id = int(message.text)
                order = BotRepository.get_order_by_order_id(order_id, chat_id)
                if not order:
                    await bot.send_message(chat_id, "Такого заказа не существует!")
                else:
                    await bot.send_message(chat_id, "Информация о заказе")

    await bot.infinity_polling()
