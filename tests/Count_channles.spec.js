
import { test, expect, chromium } from '@playwright/test';
import { Login } from './Login/login';
import { MainPageModel } from './Login/MainPageModel';
const fs = require('fs');
const { PNG } = require('pngjs');
const pixelmatch = require('pixelmatch');

const phones = '9141679897';
const okd = '1212'


test('Каналы Безопасность ', async ({ page }) => {
    const login = new Login(page);
      const MainPage = new MainPageModel(page);
    
    await login.open();//Переход по заранее прописанному урлу online.if.test****
    await login.inputPhone(phones);//Ввод номер телефона задаю через константу 
    await login.inputOTP()//ввод смс 000000
    await login.inputOKD(okd);//ввод ОКД , передаю константу в каждый тест ели нет обший концепции проверок
    await page.waitForTimeout(5000); //5 тайм аута секунд на прогрузку главной

    //await page.locator('[data-test-id="webchat_toggleButton"]').hover();//Наведение на иконку чата на главной
    //await expect(page.getByText('Чат с банком')).toBeVisible();//Текст "Чат с банком" виден
    //await expect(MainPage.chatSmall).toBeVisible(); //проверяем что чат виден
    //await page.locator('[data-test-id="profile_mf_buttonicon"][aria-label="Профиль"]').click();
    //await MainPage.chatSmall.click();//Клик на чат
    const banner = await page.locator('[data-test-id="longread_modal_close-button"]');//Появилшся баннер на главной .его кнопка закрыть
    if (banner) {
        await banner.click();
    }
    //Переход в чат через профиль
    await page.getByRole('button', {name : 'Профиль'}).click();//переход в Профиль    
    await page.locator('[data-test-id="profile-btn-action-chat"]').click();//Переход в чат через профиль
    
    const Bezopasnost = await page.getByRole('button', {name : 'Безопасность'});    
    //Переход в каналы
    await page.locator('[data-test-id="ChannelsTabList_TabButton"]', {hasText : 'Каналы'}).click();//Клик на вкладку Каналы
    //await Bezopasnost.screenshot({path : './Count_channles.spec.js-snapshots/Bezopasnost.png'});//Сделать скриншот
    await expect(Bezopasnost).toHaveScreenshot('Bezopasnost.png', {maxDiffPixelRatio : 0.2});//Сравнения скриншота
    const color = await Bezopasnost.evaluate((el) => getComputedStyle(el).color);
    expect(color).toBe('rgb(34, 37, 43)');//Проверка цвета текста "Безопасность"
    await expect(page.getByText('Вместе выгоднее: кешбэки, скидки и бонусы. Пригласите близких и объединитесь в группу в ВТБ Онлайн — и выгода активируется 💙 Что получаете сразу после вступления: • 5% кешбэка в супермаркетах • кешбэк рублями, без баллов и условий Платите за покупки как обычно — а банк возвращает больше. Отличный повод пригласить близких 👨👩👧👦')).toBeVisible();//Текст у канала виден 
    
    //Переход в ленту канала
    await Bezopasnost.click();//Клик по каналу
    await expect(page.locator('[data-test-id="Header_ChannelManagementButton"]')).toHaveText(/Безопасность/);//В хедере видно название канала и Имеет название "Безопасность"
    //Переход в профиль канала
    await page.locator('[data-test-id="Header_ChannelManagementButton"]').click();//Клик на Хедер канала
    await expect(page.locator('.title-f76f2987')).toHaveText('Безопасность');//В профиле канала видно название канала "Безопасность"
    const backGround = await page.locator('.description-f4aba16a');//Берем класс подложки на которой находится текст "Всё об уловках мошенников и цифровой гигиене."
    const ColorBackgroud = backGround.evaluate((el) => getComputedStyle(el).backgroundColor);//Беру его цветовую состовляющую , в данном случае цвет background
    expect(ColorBackgroud).toBe('rgba(103, 114, 131, 0.08)');//Проверка цвета подложки под текстом в профиле канала
    await expect(page.getByText('Всё об уловках мошенников и цифровой гигиене.')).toBeVisible();//Текст под названием Канала в профиле канала
    await expect(page.locator('.notificationTitle-c633030c', {name : 'Уведомления'})).toBeVisible();//Уведомления
    await expect(page.locator('[data-test-id="channel-notification-switch"]')).toBeEnabled();//Проверка что тогл в состоянии включено

});

test('Каналы Дело твое ', async ({ page }) => {
    const login = new Login(page);
      const MainPage = new MainPageModel(page);
    
    await login.open();//Переход по заранее прописанному урлу online.if.test****
    await login.inputPhone(phones);//Ввод номер телефона задаю через константу 
    await login.inputOTP()//ввод смс 000000
    await login.inputOKD(okd);//ввод ОКД , передаю константу в каждый тест ели нет обший концепции проверок
    await page.waitForTimeout(5000); //5 тайм аута секунд на прогрузку главной

    const banner = await page.locator('[data-test-id="longread_modal_close-button"]');
    if (banner) {
        await banner.click();
    }
     //Переход в чат через профиль
    await page.getByRole('button', {name : 'Профиль'}).click();//переход в Профиль 
    await page.locator('[data-test-id="profile-btn-action-chat"]').click();//Переход в чат через профиль
   
    const DeloTvoe = await  page.getByRole('button', {name : 'Дело твоё'});

     //Переход в каналы
    await page.locator('[data-test-id="ChannelsTabList_TabButton"]', {hasText : 'Каналы'}).click();//Клик на вкладку Каналы
    await expect(DeloTvoe).toBeVisible();//Канал Дело твое виден
    //await DeloTvoe.screenshot({path : './Count_channles.spec.js-snapshots/DeloTvoe.png'});Сделать скриншот
    await expect(DeloTvoe).toHaveScreenshot('DeloTvoe.png');//Сравнения скриншота
    const color = await DeloTvoe.evaluate((el) => getComputedStyle(el).color);
    expect(color).toBe('rgb(34, 37, 43)')
    await expect(page.getByText('Моя любовь к тебе навечно')).toBeVisible();//Текст у канала виден 

    //Переход в ленту канала
    await DeloTvoe.click();//Клик по каналу
    await expect(page.locator('[data-test-id="Header_ChannelManagementButton"]')).toHaveText(/Дело твоё/);//В хедере видно название канала и Имеет название "Дело твоё"

    //Переход в профиль канала
    await page.locator('[data-test-id="Header_ChannelManagementButton"]').click();//Клик на Хедер канала
    await expect(page.locator('.title-f76f2987')).toHaveText('Дело твоё');//В профиле канала видно название канала "Дело твоё"
    await expect(page.getByText('Канал для тех, кто работает на себя или планирует начать. Советы, цифры и реальные истории предпринимателей.')).toBeVisible();//Текст под названием Канала в профиле канала
    await expect(page.locator('.notificationTitle-c633030c', {name : 'Уведомления'})).toBeVisible();//Уведомления
    await expect(page.locator('[data-test-id="channel-notification-switch"]')).toBeEnabled();//Проверка что тогл в состоянии включено
});

test('Каналы Гид по выгоде ', async ({ page }) => {
    const login = new Login(page);
      const MainPage = new MainPageModel(page);
    
    await login.open();//Переход по заранее прописанному урлу online.if.test****
    await login.inputPhone(phones);//Ввод номер телефона задаю через константу 
    await login.inputOTP()//ввод смс 000000
    await login.inputOKD(okd);//ввод ОКД , передаю константу в каждый тест ели нет обший концепции проверок
    await page.waitForTimeout(5000); //5 тайм аута секунд на прогрузку главной

    const banner = await page.locator('[data-test-id="longread_modal_close-button"]');
    if (banner) {
        await banner.click();
    }

     //Переход в чат через профиль
    await page.getByRole('button', {name : 'Профиль'}).click();//переход в Профиль
    await page.locator('[data-test-id="profile-btn-action-chat"]').click();//Переход в чат через профиль

    const GitpoVigode = await  page.getByRole('button', {name : 'Гид по выгоде'});//константа канала

    //Переход в каналы
    await page.locator('[data-test-id="ChannelsTabList_TabButton"]', {hasText : 'Каналы'}).click();//Клик на вкладку Каналы    
    await expect(GitpoVigode).toBeVisible();//Канал Гид по выгоде виден
    //await GitpoVigode.screenshot({path : './Count_channles.spec.js-snapshots/GitpoVigode.png'});//Скриншот канала
    await expect(GitpoVigode).toHaveScreenshot('GitpoVigode.png');//Сравнения скриншота с тем что есть
    const color = await GitpoVigode.evaluate((el) => getComputedStyle(el).color); //Беру значения цвета из DOM
    expect(color).toBe('rgb(34, 37, 43)');//Сравниваю с тем что прописано 
    await expect(page.getByText('Хотите, чтобы сбережения приносили больше дохода? Выполняйте простые условия и повышайте ставки. Как получить надбавку даже по действующему ВТБ-Вкладу — варианты на выбор: ✅ перевести зарплату или пенсию в ВТБ ✅ подключить подписку ВТБ Плюс А при открытии вклада повышенная ставка полагается премиальным клиентам банка, новым вкладчикам и всем остальным — за «новые» деньги. Подробнее о надбавках по вкладам расскажем в следующем посте.')).toBeVisible();//Текст у канала виден 

    //Переход в ленту канала
    await GitpoVigode.click();//Клик по каналу
    await expect(page.locator('[data-test-id="Header_ChannelManagementButton"]')).toHaveText(/Гид по выгоде/);//В хедере видно название канала и Имеет название "Гид по выгоде"

   //Переход в профиль канала
    await page.locator('[data-test-id="Header_ChannelManagementButton"]').click();//Клик на Хедер канала
    await expect(page.locator('.title-f76f2987')).toHaveText('Гид по выгоде');//В профиле канала видно название канала "Гид по выгоде"
    await expect(page.getByText('Вся выгода в одном канале: кешбэк недели, скидки от друзей ВТБ и простые лайфхаки. Научим экономить, не экономя на себе')).toBeVisible();
    await expect(page.locator('.notificationTitle-c633030c', {name : 'Уведомления'})).toBeVisible();//Уведомления
    await expect(page.locator('[data-test-id="channel-notification-switch"]')).toBeEnabled();

});

test('Каналы Что нового ', async ({ page }) => {
    const login = new Login(page);
      const MainPage = new MainPageModel(page);
    
    await login.open();//Переход по заранее прописанному урлу online.if.test****
    await login.inputPhone(phones);//Ввод номер телефона задаю через константу 
    await login.inputOTP()//ввод смс 000000
    await login.inputOKD(okd);//ввод ОКД , передаю константу в каждый тест ели нет обший концепции проверок
    await page.waitForTimeout(5000); //5 тайм аута секунд на прогрузку главной

    const banner = await page.locator('[data-test-id="longread_modal_close-button"]');
    if (banner) {
        await banner.click();
    }

     //Переход в чат через профиль
    await page.getByRole('button', {name : 'Профиль'}).click();//переход в Профиль 
    await page.locator('[data-test-id="profile-btn-action-chat"]').click();//Переход в чат через профиль

    const WhatsNew = await  page.getByRole('button', {name : 'Что нового'});//Константа канала

     //Переход в каналы
    await page.locator('[data-test-id="ChannelsTabList_TabButton"]', {hasText : 'Каналы'}).click();//Клик на вкладку Каналы
    await expect(WhatsNew).toBeVisible();//Канал Что нового виден
    //await WhatsNew.screenshot({path : './Count_channles.spec.js-snapshots/WhatsNew.png'});//Скриншот канала
    await expect(WhatsNew).toHaveScreenshot('WhatsNew.png');//Сравнения скриншота с тем что есть 
    const color = await WhatsNew.evaluate((el) => getComputedStyle(el).color); //Беру значения цвета из DOM
    expect(color).toBe('rgb(34, 37, 43)');//Сравниваю с тем что прописано     
    await expect(page.getByText('Заголовок. Инлайн кнопка')).toBeVisible();//Текст у канала виден 

    //Переход в ленту канала
    await WhatsNew.click();//Клик по каналу
    await expect(page.locator('[data-test-id="Header_ChannelManagementButton"]')).toHaveText(/Что нового/);//В хедере видно название канала и Имеет название "Что нового"

     //Переход в профиль канала
    await page.locator('[data-test-id="Header_ChannelManagementButton"]').click();//Клик на Хедер канала
    await expect(page.locator('.title-f76f2987')).toHaveText('Что нового');//В профиле канала видно название канала "Что нового"
    await expect(page.getByText('Всё об обновлении в ВТБ Онлайн. Функции, сервисы и настройки, которые упростят вам жизнь.')).toBeVisible();//Текст под названием Канала в профиле канала
    await expect(page.locator('.notificationTitle-c633030c', {name : 'Уведомления'})).toBeVisible();//Уведомления
    await expect(page.locator('[data-test-id="channel-notification-switch"]')).toBeEnabled();//Проверка что тогл в состоянии включено
});