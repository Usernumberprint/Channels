
import { test, expect, chromium } from '@playwright/test';
import { Login } from '../Login/login';
import { MainPageModel } from '../Login/MainPageModel';
const fs = require('fs');
import { devices } from '@playwright/test';
const { PNG } = require('pngjs');
const pixelmatch = require('pixelmatch');

const phones = '9142416775';
const okd = '0312'

test.describe('Каналы' , async() => {

    //Функция для закрытия баннера если такой появится.В каждом тесте прописывается данный шаг
// async function banners(slider,banner) {
//     if (await slider.isVisible() || await banner.isVisible()){
//         if (await slider.isVisible()){            
//             await slider.click();    
//         }
//         if (await banner.isVisible(banner)){
//             await banner.click();
//         }   
//         else {
//     }
// }
// }


test('Канал Специально для вас', async ({ page }) => {

    const login = new Login(page);
    const slider=  await page.locator('[data-test-id="slider_modal_close-button"]');
    const banner = await page.getByRole('button', { name: 'Закрыть' });
    await login.open();//Переход по заранее прописанному урлу online.if.test****
    await login.inputPhone(phones);//Ввод номер телефона задаю через константу 
    await login.inputOTP()//ввод смс 000000
    await login.inputOKD(okd);//ввод ОКД , передаю константу в каждый тест ели нет обший концепции проверок
    await page.waitForTimeout(5000); //5 тайм аута секунд на прогрузку главной

    //await banners(slider);//Запуск функции на проверку баннера , если баннер появится то закроем его
    //await banner.click();//Запуск функции на проверку баннера , если баннер появится то закроем его
    await expect(page.locator('[data-test-id="webchat_tabbar_button"]')).toBeVisible({timeout : 10000});
    await page.locator('[data-test-id="webchat_tabbar_button"]').click();
    //  //Переход в чат через профиль
    // await page.getByRole('button', {name : 'Профиль'}).click();//переход в Профиль 
    // await expect(page.locator('[data-test-id="profile-btn-action-chat"]')).toBeVisible();
    // await page.locator('[data-test-id="profile-btn-action-chat"]').click();//Переход в чат через профиль

    const SpecialForYou = await page.locator('[data-test-id="ChannelsCard_CardButton"][aria-label="Специально для вас. С котом тестируем пуши. Вжух.. "]')//.filter(/Специально для вас/);//Константа канала

     //Переход в каналы
    await page.locator('[data-test-id="ChannelsTabList_TabButton"]', {hasText : 'Каналы'}).click();//Клик на вкладку Каналы
    await expect(SpecialForYou).toBeVisible();//Канал Что нового виден
    //await VtbMoney.screenshot({path : './Dark_Count_channles.spec.js-snapshots/VTBMoney.png'});//Скриншот канала
    //await expect(VtbMoney).toHaveScreenshot('VTBMoney.png');//Сравнения скриншота с тем что есть 
    const color = await SpecialForYou.evaluate((el) => getComputedStyle(el).color); //Беру значения цвета из DOM
    expect(color).toBe('rgb(255, 255, 255)');//Сравниваю с тем что прописано     
    await expect(page.getByRole('button', { name: 'Специально для вас. С котом тестируем пуши. Вжух' })).toBeVisible();//Текст у канала виден 
    const notNotification = page.locator('[data-test-id="ChannelsTabList_TabButton"][aria-label="Без уведомлений. Специально для вас. Вам направили приглашение в группу Близкие. Примите…. "]')
    //await expect(notNotification).not.toBeVisible();// НЕ виден Колокольчик 

    //Переход в ленту канала
    await SpecialForYou.click();//Клик по каналу
    await expect(page.locator('.header__title__titleName-ffeaa1f2')).toHaveText(/Специально для вас/);//В хедере видно название канала и Имеет название "ВТБ это к деньгам"

     //Переход в профиль канала
    await page.locator('.header__title__titleName-ffeaa1f2').click();//Клик на Хедер канала
    await expect(page.locator('.title-f76f2987')).toHaveText('Специально для вас');//В профиле канала видно название канала "ВТБ — это к деньгам"
    const backGround = await page.locator('.description-f4aba16a');//подложка под текстом
    const ColorBackgroud = await backGround.evaluate((el) => getComputedStyle(el).backgroundColor);//Беру его цветовую состовляющую , в данном случае цвет background
    expect(ColorBackgroud).toBe("rgba(124, 135, 152, 0.16)");//Проверка цвета подложки под текстом в профиле канала
    await expect(page.getByText('Персональные предложения, напоминания и важные сообщения от банка.')).toBeVisible();//Текст под названием Канала в профиле канала
    await expect(page.locator('.notificationTitle-c633030c', {name : 'Уведомления'})).toBeVisible();//Уведомления
    const notification = await page.locator('[data-test-id="channel-notification-switch"]');//Уведомления локатор
    if (notNotification.isEnabled()) {        
    }else {
        await notification.click();
    }
    await page.locator('[data-test-id="Header_BackButton"][type="button"][class="backButton-deae9738"][aria-label="Вернуться назад"]').first().click()
    //await page.locator('[data-test-id="Header_BackButton"][type="button"][class="backButton-deae9738"][aria-label="Вернуться назад"]').click()
    //await expect(page.locator('[data-test-id="channel-notification-switch"]')).toBeEnabled();//Проверка что тогл в состоянии включено

    
    //Кнопка отписаться
    await expect(page.locator('[data-test-id="Subscribe_SubscriptionButton"]')).toBeVisible();//Кнопка Отписаться видна
    await expect(page.locator('[data-test-id="Subscribe_SubscriptionButton"]')).toHaveText('Отписаться');
    const backGroundButton = await page.locator('[data-test-id="Subscribe_SubscriptionButton"]');//Делаем ее константой
    const colorBG = await backGroundButton.evaluate((el) => getComputedStyle(el).backgroundColor);//Опеределяем ее цвет в DOM
    expect(colorBG).toBe('rgba(255, 255, 255, 0.08)');//Првоеряем ее бэскграунд
    //Текст "Отписаться"
    const textOtpiska = await page.locator('[data-test-id="Subscribe_SubscriptionButton"]', {name : 'Отписаться'});//Делаем сразу константу из кнопки
    expect(textOtpiska).toBeVisible();
    const colorBGtext = await textOtpiska.evaluate((el) => getComputedStyle(el).color);
    expect(colorBGtext).toBe('rgb(255, 255, 255)');
});


test('Канал Безопасность ', async ({ page }) => {
    const login = new Login(page);
    const slider=  await page.locator('[data-test-id="slider_modal_close-button"]');

    await login.open();//Переход по заранее прописанному урлу online.if.test****
    
    //     await page.evaluate(()=> {
    // localStorage.setItem('theme' , 'dark');
    // })
    await login.inputPhone(phones);//Ввод номер телефона задаю через константу 
    await login.inputOTP()//ввод смс 000000
    await login.inputOKD(okd);//ввод ОКД , передаю константу в каждый тест ели нет обший концепции проверок
    await page.waitForTimeout(10000); //5 тайм аута секунд на прогрузку главной

    //await page.locator('[data-test-id="webchat_toggleButton"]').hover();//Наведение на иконку чата на главной
    //await expect(page.getByText('Чат с банком')).toBeVisible();//Текст "Чат с банком" виден
    //await expect(MainPage.chatSmall).toBeVisible(); //проверяем что чат виден
    //await page.locator('[data-test-id="profile_mf_buttonicon"][aria-label="Профиль"]').click();
    //await MainPage.chatSmall.click();//Клик на чат
    //Запуск функции на проверку баннера , если баннер появится то закроем его
    await banners(slider);

    //Переход в чат через профиль
    await expect(page.getByRole('button', {name : 'Профиль'})).toBeVisible();
    await page.getByRole('button', {name : 'Профиль'}).click();//переход в Профиль    
    await page.locator('[data-test-id="profile-btn-action-chat"]').click();//Переход в чат через профиль
    
    const Bezopasnost = await page.getByRole('button', {name : 'Безопасность'});//Канал "Безопасность" в виде константы  

    //Переход в каналы
    await page.locator('[data-test-id="ChannelsTabList_TabButton"]', {hasText : 'Каналы'}).click();//Клик на вкладку Каналы
    //await Bezopasnost.screenshot({path : './Dark_Count_channles.spec.js-snapshots/Bezopasnost.png'});//Сделать скриншот
    await expect(Bezopasnost).toHaveScreenshot('Bezopasnost.png', {maxDiffPixelRatio : 0.2});//Сравнения скриншота
    const color = await Bezopasnost.evaluate((el) => getComputedStyle(el).color);//Берем цвет текста канала "Безопасность"
    expect(color).toBe('rgb(255, 255, 255)');//Проверка цвета текста "Безопасность"
    await expect(page.getByText('Вместе выгоднее: кешбэки, скидки и бонусы. Пригласите близких и объединитесь в группу в ВТБ Онлайн — и выгода активируется 💙 Что получаете сразу после вступления: • 5% кешбэка в супермаркетах • кешбэк рублями, без баллов и условий Платите за покупки как обычно — а банк возвращает больше. Отличный повод пригласить близких 👨👩👧👦')).toBeVisible();//Текст у канала виден 
    
    //Переход в ленту канала
    await Bezopasnost.click();//Клик по каналу
    await expect(page.locator('[data-test-id="Header_ChannelManagementButton"]')).toHaveText(/Безопасность/);//В хедере видно название канала и Имеет название "Безопасность"
   
    //Переход в профиль канала
    await page.locator('[data-test-id="Header_ChannelManagementButton"]').click();//Клик на Хедер канала
    await expect(page.locator('.title-f76f2987')).toHaveText('Безопасность');//В профиле канала видно название канала "Безопасность"
    const backGround = await page.locator('[class=description-f4aba16a]');//Берем класс подложки на которой находится текст "Всё об уловках мошенников и цифровой гигиене."
    const ColorBackgroud = await backGround.evaluate((el) => getComputedStyle(el).backgroundColor);//Беру его цветовую состовляющую , в данном случае цвет background
    expect(ColorBackgroud).toBe("rgba(124, 135, 152, 0.16)");//Проверка цвета подложки под текстом в профиле канала

    await expect(page.getByText('Всё об уловках мошенников и цифровой гигиене.')).toBeVisible();//Текст под названием Канала в профиле канала
    await expect(page.locator('.notificationTitle-c633030c', {name : 'Уведомления'})).toBeVisible();//Уведомления
    const togON = await page.locator('[data-test-id="channel-notification-switch"]');
    const BackGroundToglOn = await togON.evaluate((el) => getComputedStyle(el).backgroundColor);
    expect(BackGroundToglOn).toBe("rgb(61, 132, 255)");//Проверка цвета тогла в состоянии включено
    await expect(page.locator('[data-test-id="channel-notification-switch"]')).toBeEnabled();//Проверка что тогл в состоянии включено
  //Кнопка отписаться нету
    await expect(page.locator('[data-test-id="Subscribe_SubscriptionButton"]')).not.toBeVisible();//Кнопка Отписаться невидна

});

test('Каналы Дело твое ', async ({ page }) => {
    const login = new Login(page);
    const slider=  await page.locator('[data-test-id="slider_modal_close-button"]');

    await login.open();//Переход по заранее прописанному урлу online.if.test****
    await login.inputPhone(phones);//Ввод номер телефона задаю через константу 
    await login.inputOTP()//ввод смс 000000
    await login.inputOKD(okd);//ввод ОКД , передаю константу в каждый тест ели нет обший концепции проверок
    await page.waitForTimeout(5000); //5 тайм аута секунд на прогрузку главной

    await banners(slider);//Запуск функции на проверку баннера , если баннер появится то закроем его
     //Переход в чат через профиль
    await page.getByRole('button', {name : 'Профиль'}).click();//переход в Профиль 
    await page.locator('[data-test-id="profile-btn-action-chat"]').click();//Переход в чат через профиль
   
    const DeloTvoe = await  page.getByRole('button', {name : 'Дело твоё'});

     //Переход в каналы
    await page.locator('[data-test-id="ChannelsTabList_TabButton"]', {hasText : 'Каналы'}).click();//Клик на вкладку Каналы
    await expect(DeloTvoe).toBeVisible();//Канал Дело твое виден
    //await DeloTvoe.screenshot({path : './Dark_Count_channles.spec.js-snapshots/DeloTvoe.png'});//Сделать скриншот
    await expect(DeloTvoe).toHaveScreenshot('DeloTvoe.png');//Сравнения скриншота
    const color = await DeloTvoe.evaluate((el) => getComputedStyle(el).color);
    expect(color).toBe('rgb(255, 255, 255)'); //Цвет текста "Дело твое"
    await expect(page.getByText('Моя любовь к тебе навечно')).toBeVisible();//Текст у канала виден 

    //Переход в ленту канала
    await DeloTvoe.click();//Клик по каналу
    await expect(page.locator('[data-test-id="Header_ChannelManagementButton"]')).toHaveText(/Дело твоё/);//В хедере видно название канала и Имеет название "Дело твоё"

    //Переход в профиль канала
    await page.locator('[data-test-id="Header_ChannelManagementButton"]').click();//Клик на Хедер канала
    await expect(page.locator('.title-f76f2987')).toHaveText('Дело твоё');//В профиле канала видно название канала "Дело твоё"
    const backGround = await page.locator('[class=description-f4aba16a]');
    const ColorBackgroud = await backGround.evaluate((el) => getComputedStyle(el).backgroundColor);//Беру его цветовую состовляющую , в данном случае цвет background
    expect(ColorBackgroud).toBe("rgba(124, 135, 152, 0.16)");//Проверка цвета подложки под текстом в профиле канала
    await expect(page.getByText('Канал для тех, кто работает на себя или планирует начать. Советы, цифры и реальные истории предпринимателей.')).toBeVisible();//Текст под названием Канала в профиле канала
    await expect(page.locator('.notificationTitle-c633030c', {name : 'Уведомления'})).toBeVisible();//Уведомления
    await expect(page.locator('[data-test-id="channel-notification-switch"]')).toBeEnabled();//Проверка что тогл в состоянии включено

    //Кнопка отписаться
    await expect(page.locator('[data-test-id="Subscribe_SubscriptionButton"]')).toBeVisible();//Кнопка Отписаться видна
    await expect(page.locator('[data-test-id="Subscribe_SubscriptionButton"]')).toHaveText('Отписаться');
    const backGroundButton = await page.locator('[data-test-id="Subscribe_SubscriptionButton"]');//Делаем ее константой
    const colorBG = await backGroundButton.evaluate((el) => getComputedStyle(el).backgroundColor);//Опеределяем ее цвет в DOM
    expect(colorBG).toBe('rgba(255, 255, 255, 0.08)');//Првоеряем ее бэскграунд
    //Текст "Отписаться"
    const textOtpiska = await page.locator('[data-test-id="Subscribe_SubscriptionButton"]', {name : 'Отписаться'});//Делаем сразу константу из кнопки
    expect(textOtpiska).toBeVisible();//Видим кнопку
    const colorBGtext = await textOtpiska.evaluate((el) => getComputedStyle(el).color);//Берем ее цвет color
    expect(colorBGtext).toBe('rgb(255, 255, 255)');//Сравниваем цвет текста "Отписаться"
});

test('Каналы Гид по выгоде ', async ({ page }) => {
    const login = new Login(page);
    const slider=  await page.locator('[data-test-id="slider_modal_close-button"]');
  
    await login.open();//Переход по заранее прописанному урлу online.if.test****
    await login.inputPhone(phones);//Ввод номер телефона задаю через константу 
    await login.inputOTP()//ввод смс 000000
    await login.inputOKD(okd);//ввод ОКД , передаю константу в каждый тест ели нет обший концепции проверок
    await page.waitForTimeout(5000); //5 тайм аута секунд на прогрузку главной

    await banners(slider);//Запуск функции на проверку баннера , если баннер появится то закроем его

     //Переход в чат через профиль
    await page.getByRole('button', {name : 'Профиль'}).click();//переход в Профиль
    await page.locator('[data-test-id="profile-btn-action-chat"]').click();//Переход в чат через профиль

    const GitpoVigode = await  page.getByRole('button', {name : 'Гид по выгоде'});//константа канала

    //Переход в каналы
    await page.locator('[data-test-id="ChannelsTabList_TabButton"]', {hasText : 'Каналы'}).click();//Клик на вкладку Каналы
    await GitpoVigode.scrollIntoViewIfNeeded();    
    await expect(GitpoVigode).toBeVisible();//Канал Гид по выгоде виден
    //await GitpoVigode.screenshot({path : './Dark_Count_channles.spec.js-snapshots/GitpoVigode.png'});//Скриншот канала
    await expect(GitpoVigode).toHaveScreenshot('GitpoVigode.png');//Сравнения скриншота с тем что есть
    const color = await GitpoVigode.evaluate((el) => getComputedStyle(el).color); //Беру значения цвета из DOM
    expect(color).toBe('rgb(255, 255, 255)');//Сравниваю с тем что прописано 
    await expect(page.getByText('Хотите, чтобы сбережения приносили больше дохода? Выполняйте простые условия и повышайте ставки. Как получить надбавку даже по действующему ВТБ-Вкладу — варианты на выбор: ✅ перевести зарплату или пенсию в ВТБ ✅ подключить подписку ВТБ Плюс А при открытии вклада повышенная ставка полагается премиальным клиентам банка, новым вкладчикам и всем остальным — за «новые» деньги. Подробнее о надбавках по вкладам расскажем в следующем посте.')).toBeVisible();//Текст у канала виден 

    //Переход в ленту канала
    await GitpoVigode.click();//Клик по каналу
    await expect(page.locator('[data-test-id="Header_ChannelManagementButton"]')).toHaveText(/Гид по выгоде/);//В хедере видно название канала и Имеет название "Гид по выгоде"

   //Переход в профиль канала
    await page.locator('[data-test-id="Header_ChannelManagementButton"]').click();//Клик на Хедер канала
    await expect(page.locator('.title-f76f2987')).toHaveText('Гид по выгоде');//В профиле канала видно название канала "Гид по выгоде"
    const backGround = await page.locator('[class=description-f4aba16a]');
    const ColorBackgroud = await backGround.evaluate((el) => getComputedStyle(el).backgroundColor);//Беру его цветовую состовляющую , в данном случае цвет background
    expect(ColorBackgroud).toBe("rgba(124, 135, 152, 0.16)");//Проверка цвета подложки под текстом в профиле канала
    await expect(page.getByText('Вся выгода в одном канале: кешбэк недели, скидки от друзей ВТБ и простые лайфхаки. Научим экономить, не экономя на себе')).toBeVisible();
    await expect(page.locator('.notificationTitle-c633030c', {name : 'Уведомления'})).toBeVisible();//Уведомления
    await expect(page.locator('[data-test-id="channel-notification-switch"]')).toBeEnabled();

    
    //Кнопка отписаться
    await expect(page.locator('[data-test-id="Subscribe_SubscriptionButton"]')).toBeVisible();//Кнопка Отписаться видна
    await expect(page.locator('[data-test-id="Subscribe_SubscriptionButton"]')).toHaveText('Отписаться');
    const backGroundButton = await page.locator('[data-test-id="Subscribe_SubscriptionButton"]');//Делаем ее константой
    const colorBG = await backGroundButton.evaluate((el) => getComputedStyle(el).backgroundColor);//Опеределяем ее цвет в DOM
    expect(colorBG).toBe('rgba(255, 255, 255, 0.08)');//Првоеряем ее бэскграунд
    //Текст "Отписаться"
    const textOtpiska = await page.locator('[data-test-id="Subscribe_SubscriptionButton"]', {name : 'Отписаться'});//Делаем сразу константу из кнопки
    expect(textOtpiska).toBeVisible();
    const colorBGtext = await textOtpiska.evaluate((el) => getComputedStyle(el).color);
    expect(colorBGtext).toBe('rgb(255, 255, 255)');

});

test('Каналы Что нового ', async ({ page }) => {
    const login = new Login(page);
    const slider=  await page.locator('[data-test-id="slider_modal_close-button"]');

    await login.open();//Переход по заранее прописанному урлу online.if.test****
    await login.inputPhone(phones);//Ввод номер телефона задаю через константу 
    await login.inputOTP()//ввод смс 000000
    await login.inputOKD(okd);//ввод ОКД , передаю константу в каждый тест ели нет обший концепции проверок
    await page.waitForTimeout(5000); //5 тайм аута секунд на прогрузку главной

    await banners(slider);//Запуск функции на проверку баннера , если баннер появится то закроем его

     //Переход в чат через профиль
    await page.getByRole('button', {name : 'Профиль'}).click();//переход в Профиль 
    await page.locator('[data-test-id="profile-btn-action-chat"]').click();//Переход в чат через профиль

    const WhatsNew = await  page.getByRole('button', {name : 'Что нового'});//Константа канала

     //Переход в каналы
    await page.locator('[data-test-id="ChannelsTabList_TabButton"]', {hasText : 'Каналы'}).click();//Клик на вкладку Каналы
    await expect(WhatsNew).toBeVisible();//Канал Что нового виден
    //await WhatsNew.screenshot({path : './Dark_Count_channles.spec.js-snapshots/WhatsNew.png'});//Скриншот канала
    await expect(WhatsNew).toHaveScreenshot('WhatsNew.png');//Сравнения скриншота с тем что есть 
    const color = await WhatsNew.evaluate((el) => getComputedStyle(el).color); //Беру значения цвета из DOM
    expect(color).toBe('rgb(255, 255, 255)');//Сравниваю с тем что прописано     
    await expect(page.getByText('Заголовок. Инлайн кнопка')).toBeVisible();//Текст у канала виден 

    //Переход в ленту канала
    await WhatsNew.click();//Клик по каналу
    await expect(page.locator('[data-test-id="Header_ChannelManagementButton"]')).toHaveText(/Что нового/);//В хедере видно название канала и Имеет название "Что нового"

     //Переход в профиль канала
    await page.locator('[data-test-id="Header_ChannelManagementButton"]').click();//Клик на Хедер канала
    await expect(page.locator('.title-f76f2987')).toHaveText('Что нового');//В профиле канала видно название канала "Что нового"
    const backGround = await page.locator('[class=description-f4aba16a]');
    const ColorBackgroud = await backGround.evaluate((el) => getComputedStyle(el).backgroundColor);//Беру его цветовую состовляющую , в данном случае цвет background
    expect(ColorBackgroud).toBe("rgba(124, 135, 152, 0.16)");//Проверка цвета подложки под текстом в профиле канала
    await expect(page.getByText('Всё об обновлении в ВТБ Онлайн. Функции, сервисы и настройки, которые упростят вам жизнь.')).toBeVisible();//Текст под названием Канала в профиле канала
    await expect(page.locator('.notificationTitle-c633030c', {name : 'Уведомления'})).toBeVisible();//Уведомления
    await expect(page.locator('[data-test-id="channel-notification-switch"]')).toBeEnabled();//Проверка что тогл в состоянии включено

    //Кнопка отписаться нету
    await expect(page.locator('[data-test-id="Subscribe_SubscriptionButton"]')).not.toBeVisible();//Кнопка Отписаться видна
});


test('Каналы ВТБ — это к деньгам ', async ({ page }) => {
    const login = new Login(page);
    const slider=  await page.locator('[data-test-id="slider_modal_close-button"]');

    await login.open();//Переход по заранее прописанному урлу online.if.test****
    await login.inputPhone(phones);//Ввод номер телефона задаю через константу 
    await login.inputOTP()//ввод смс 000000
    await login.inputOKD(okd);//ввод ОКД , передаю константу в каждый тест ели нет обший концепции проверок
    await page.waitForTimeout(5000); //5 тайм аута секунд на прогрузку главной

    await banners(slider);//Запуск функции на проверку баннера , если баннер появится то закроем его

     //Переход в чат через профиль
    await page.getByRole('button', {name : 'Профиль'}).click();//переход в Профиль 
    await expect(page.locator('[data-test-id="profile-btn-action-chat"]')).toBeVisible();
    await page.locator('[data-test-id="profile-btn-action-chat"]').click();//Переход в чат через профиль

    const VtbMoney = await  page.getByRole('button', {name : 'ВТБ — это к деньгам.'});//Константа канала

     //Переход в каналы
    await page.locator('[data-test-id="ChannelsTabList_TabButton"]', {hasText : 'Каналы'}).click();//Клик на вкладку Каналы
    await expect(VtbMoney).toBeVisible();//Канал Что нового виден
    //await VtbMoney.screenshot({path : './Dark_Count_channles.spec.js-snapshots/VTBMoney.png'});//Скриншот канала
    await expect(VtbMoney).toHaveScreenshot('VTBMoney.png');//Сравнения скриншота с тем что есть 
    const color = await VtbMoney.evaluate((el) => getComputedStyle(el).color); //Беру значения цвета из DOM
    expect(color).toBe('rgb(255, 255, 255)');//Сравниваю с тем что прописано     
    await expect(page.getByText('Заголовок. Инлайн кнопка')).toBeVisible();//Текст у канала виден 

    //Переход в ленту канала
    await VtbMoney.click();//Клик по каналу
    await expect(page.locator('.header__title__titleName-ffeaa1f2')).toHaveText(/ВТБ — это к деньгам/);//В хедере видно название канала и Имеет название "ВТБ это к деньгам"

     //Переход в профиль канала
    await page.locator('.header__title__titleName-ffeaa1f2').click();//Клик на Хедер канала
    await expect(page.locator('.title-f76f2987')).toHaveText('ВТБ — это к деньгам');//В профиле канала видно название канала "ВТБ — это к деньгам"
    const backGround = await page.locator('[class=description-f4aba16a]');
    const ColorBackgroud = await backGround.evaluate((el) => getComputedStyle(el).backgroundColor);//Беру его цветовую состовляющую , в данном случае цвет background
    expect(ColorBackgroud).toBe("rgba(124, 135, 152, 0.16)");//Проверка цвета подложки под текстом в профиле канала
    await expect(page.getByText('Канал для тех, кто хочет эффективно управлять сбережениями. Инструменты, лайфхаки, новости')).toBeVisible();//Текст под названием Канала в профиле канала
    await expect(page.locator('.notificationTitle-c633030c', {name : 'Уведомления'})).toBeVisible();//Уведомления
    await expect(page.locator('[data-test-id="channel-notification-switch"]')).toBeEnabled();//Проверка что тогл в состоянии включено

    
    //Кнопка отписаться
    await expect(page.locator('[data-test-id="Subscribe_SubscriptionButton"]')).toBeVisible();//Кнопка Отписаться видна
    await expect(page.locator('[data-test-id="Subscribe_SubscriptionButton"]')).toHaveText('Отписаться');
    const backGroundButton = await page.locator('[data-test-id="Subscribe_SubscriptionButton"]');//Делаем ее константой
    const colorBG = await backGroundButton.evaluate((el) => getComputedStyle(el).backgroundColor);//Опеределяем ее цвет в DOM
    expect(colorBG).toBe('rgba(255, 255, 255, 0.08)');//Првоеряем ее бэскграунд
    //Текст "Отписаться"
    const textOtpiska = await page.locator('[data-test-id="Subscribe_SubscriptionButton"]', {name : 'Отписаться'});//Делаем сразу константу из кнопки
    expect(textOtpiska).toBeVisible();
    const colorBGtext = await textOtpiska.evaluate((el) => getComputedStyle(el).color);
    expect(colorBGtext).toBe('rgb(255, 255, 255)');
});

})