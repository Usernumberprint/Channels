// @ts-check
import { test, expect, chromium } from '@playwright/test';
import { Login } from './Login/login';
import { MainPageModel } from './Login/MainPageModel';
import { log } from 'node:console';
import { mainModule } from 'node:process';
import { ADDRGETNETWORKPARAMS } from 'node:dns';
import { defineConfig } from '@playwright/test';
import { resolveObjectURL } from 'node:buffer';
import { type } from 'node:os';
const phones = '9141679897';
const okd = '1212'

 
test('Переход в канлы', async ({ page }) => {
  const login = new Login(page);
  const MainPage = new MainPageModel(page);

  await login.open();//Переход по заранее прописанному урлу online.if.test****
  await login.inputPhone(phones);//Ввод номер телефона задаю через константу 
  await login.inputOTP()//ввод смс 000000
  await login.inputOKD(okd);//ввод ОКД , передаю константу в каждый тест ели нет обший концепции проверок
  await page.waitForTimeout(5000); //5 тайм аута секунд на прогрузку главной
  await page.locator('[data-test-id="webchat_toggleButton"]').hover();//Наведение на иконку чата на главной
  await expect(page.getByText('Чат с банком')).toBeVisible();//Текст "Чат с банком" виден
  await expect(MainPage.chatSmall).toBeVisible(); //проверяем что чат виден
  await MainPage.chatSmall.click();//Клик на чат

  await page.locator('[data-test-id="ChannelsTabList_TabButton"]', {hasText : 'Каналы'}).click();//Клик на вкладку Каналы
  await expect(MainPage.cardButton).toHaveCount(6);//Проверка что каналов всего 6
  //await expect(page.locator('.unreadMessagesIndicator-b36edece').first()).toBeVisible(); //У первого канала есть не прочитанные сообщения
  await page.locator('[data-test-id="ChannelsCard_CardButton"]').nth(1).click();//Клик на второй канал по списку
  await page.waitForTimeout(3000);
  await expect(page.locator('[data-test-id="webchat_chatBubble"]').last()).toBeVisible();//Последняя новость видна
  await page.locator('[data-test-id="webchat_message_text"]').last().hover();//Наведение мышки на текст в последней новости

  const opciy = await page.locator('[data-test-id="webchat_message_optionsButton"][title="Опции"]').last();
  //await page.getByRole('button', { name: 'Опции' });
  await opciy.last().hover({timeout : 2000});
  await expect(opciy.last()).toBeVisible({timeout :1000});//Три точки у бабла
 
  await opciy.last().click();//Клик на три точки
  await opciy.last().click();//Клик на три точки
  
  
  await expect(page.locator('[data-test-id="Reactions_MoreReactionsButton"]')).toBeVisible({timeout : 1000});//Видим отображение стрелки раскрытия реакции
 
  await expect(page.getByRole('menuitemradio', { name: 'thumbs_up' })).toBeVisible(); //Смайл
  await expect(page.getByRole('menuitemradio', { name: 'thumbs_down' })).toBeVisible();//Смайл
  await expect(page.getByRole('menuitemradio', { name: 'smiling_face_with_hearts' }).first()).toBeVisible();//Смайл
  await expect(page.getByRole('menuitemradio', { name: 'fire' })).toBeVisible();//Смайл
  await expect(page.getByRole('menuitemradio', { name: 'loudly_crying_face' })).toBeVisible({timeout : 1000});//Смайл
  await page.locator('[data-test-id="Reactions_MoreReactionsButton"]').click();//Клик на стрелку раскрыть
  await expect(page.getByRole('menuitemradio', { name: 'frowning_face' })).toBeVisible();//Смайл
  await expect(page.getByRole('menuitemradio', { name: 'heart' }).nth(1)).toBeVisible({timeout : 1000});//Смайл
  await expect(page.getByRole('menuitemradio', { name: 'star_struck' })).toBeVisible({timeout : 1000});//Смайл
  await expect(page.getByRole('menuitemradio', { name: 'pouting_face' })).toBeVisible({timeout : 1000});//Смайл
  await expect(page.getByRole('menuitemradio', { name: 'thumbs_up' })).toBeVisible(); //Смайл
  await expect(page.locator('[data-test-id="webchat_message_date"]').first()).toBeVisible();//Дата у новости видна
  await expect(page.locator('[data-test-id="webchat_message_time"]').first()).toBeVisible();//Время у новости видно
  await expect(page.locator('[data-test-id="Header_SettingsButton"]')).toBeVisible();//Три точки в хедере видны
  await expect(page.locator('[data-test-id="Header_BackButton"]')).toBeVisible();//Стрелвка выйти из новости видна
  await page.getByRole('menuitemradio', { name: 'thumbs_up' }).click();//Клик на первую реакуцию, что бы плашка с реакцией ушла.
  await expect(page.locator('[data-test-id="Reactions_MoreReactionsButton"]')).not.toBeVisible({timeout : 5000});//Проверяем что реакции не видны
  await page.locator('[data-test-id="Header_ChannelManagementButton"][type="button"]').click();//Клик на хедер канала
  await expect(page.locator('.notificationTitle-c633030c', {hasText : 'Уведомления'})).toBeVisible();//Уведомления в настройках канала видны
  await expect(page.locator('[data-test-id="channel-notification-switch"]')).toBeEnabled();//Тогла в состоянии включено
  //await page.waitForTimeout(4000);

});

    test('Кнопка "Больше каналов"', async ({ page }) => {
  const login = new Login(page);
  const MainPage = new MainPageModel(page);

  await login.open();//Переход по заранее прописанному урлу online.if.test****
  await login.inputPhone(phones);//Ввод номер телефона задаю через константу 
  await login.inputOTP()//ввод смс 000000
  await login.inputOKD(okd);//ввод ОКД , передаю константу в каждый тест ели нет обший концепции проверок
  await page.waitForTimeout(5000); //5 тайм аута секунд на прогрузку главной
  await page.locator('[data-test-id="webchat_toggleButton"]').hover();
  await expect(page.getByText('Чат с банком')).toBeVisible();//Текст "Чат с банком" виден


  await expect(MainPage.chatSmall).toBeVisible(); //проверяем что чат виден
  await MainPage.chatSmall.click();//Клик на чат

  await page.locator('[data-test-id="ChannelsTabList_TabButton"]', {hasText : 'Каналы'}).click();//Клик на вкладку Каналы
  await expect(MainPage.moreChannelsButton).toBeVisible();//Кнопка Больще каналов видна
  await MainPage.moreChannelsButton.click();//Клик на кнопку Больше каналов
  await expect(page.locator('[data-test-id="Header_BackButton"]')).toBeVisible(); //КНопка назад видна
  await expect(MainPage.subscriptionButton.first()).toBeVisible();//плючик добавить канал виден
  await page.locator('[aria-label="Опросы с ВТБ. Что на картинке?. "]').click();//Клик на канал с название "Опросы с ВТБ"
  await expect(page.locator('[data-test-id="Header_SettingsButton"]')).toBeVisible();//Три точки видны в канале
  await expect(page.locator('[data-test-id="Subscribe_SubscriptionButton"]')).toBeVisible();//Кнопка Подписаться видна


});

    test('Бабл с перелистыванием "', async ({ page }) => {
  const login = new Login(page);
  const MainPage = new MainPageModel(page);
  await login.open();//Переход по заранее прописанному урлу online.if.test****
  await login.inputPhone(phones);//Ввод номер телефона задаю через константу 
  await login.inputOTP()//ввод смс 000000
  await login.inputOKD(okd);//ввод ОКД , передаю константу в каждый тест ели нет обший концепции проверок
  await page.waitForTimeout(5000); //5 тайм аута секунд на прогрузку главной
  await page.locator('[data-test-id="webchat_toggleButton"]').hover();//Наведение кнопку чата на главной для раскрытия ее
  await expect(page.getByText('Чат с банком')).toBeVisible();//Текст "Чат с банком" виден
  await expect(MainPage.chatSmall).toBeVisible(); //проверяем что чат виден

  await MainPage.chatSmall.click();//Клик на чат
  await page.locator('[data-test-id="ChannelsTabList_TabButton"]', {hasText : 'Каналы'}).click();//Клик на вкладку Каналы
  await page.locator('[data-test-id="ChannelsCard_CardButton"][aria-label="Гид по выгоде. Хотите…. "]').click(); // Клик на канал с название "Гид по выгоде.."
  

  const targeText = await page.locator('[data-test-id="webchat_message_text"]', {hasText : 'Хотите, чтобы сбережения приносили больше дохода?'});//Заголовок в бабле
  const maxScrolls = 50; // ограничение прокруток
  let found = false;

    for (let i = 0; i < maxScrolls; i++) {
    // Попытка найти текст на странице
    const elementHandle = await page.$(`text=${targeText}`);
    if (elementHandle) {
      found = true;
      console.log('Найден текст на странице');
      break;
    }
  }

    test.step('Проверка цвета текста и его размера', async() => {
  const targeText = await page.locator('[data-test-id="webchat_message_text"]', {hasText : 'Хотите, чтобы сбережения приносили больше дохода?'});//Заголовок в бабле
  const color = await targeText.evaluate((el) => getComputedStyle(el).color);
  expect(color).toBe('rgb(34, 37, 43)');// Проверка цвета текста заголовока 
  const box = await targeText.boundingBox();
   expect(box?.height).toBeGreaterThan(63.99);
   expect(box?.width).toBeGreaterThan(397.92);
  
  });


     test.step('Проверка размера времени', async() => {
  const timeNews = await page.locator('[data-test-id="webchat_message_time"][title="11:03:25 GMT+0300 (Москва, стандартное время)"]');//Время в бабле
  const colorTime = await targeText.evaluate((el) => getComputedStyle(el).color);
  expect(colorTime).toBe('rgba(34, 37, 43, 0.7)');// Проверка цвета текста заголовка 
  const box = await timeNews.boundingBox();
   expect(box?.height).toBeGreaterThan(16.67);
   expect(box?.width).toBeGreaterThan(34.9);
  
  });


    test.step('Проверка цвета стрелки перелистывания без наведения', async() => {
  const colorStrelka = await page.locator('[data-test-id="MessageContent_MessageCarousel_NextButton"][class="pagerArrowButton-fba5a68f"]').first();//Стрелка перелистывания новости в право
  const strelkacolor2 = await colorStrelka.evaluate((el) => getComputedStyle(el).color);
  expect(strelkacolor2).toBe('rgb(103, 114, 131)');// проверка цвета стрелки перелистывания без наведения
  })

    test.step('Проверка цвета стрелки после наведения', async() => {
  const colorStrelkaHover = await page.locator('[data-test-id="MessageContent_MessageCarousel_NextButton"]').first();//Стрелка перелистывания новости в право с наведение
  await page.locator('[data-test-id="MessageContent_MessageCarousel_NextButton"]').first().hover();
  await page.waitForTimeout(1000);
  const strelkaHover = await colorStrelkaHover.evaluate((el) => getComputedStyle(el).color);
  expect(strelkaHover).toBe('rgb(27, 30, 34)');//Првоерка цвета стрелки перелистывания при наведении 


   })

//Вывод всех элемнтов button
    //  const rows = page.getByRole('button');
    //  const element = page.locator('[data-test-id="ChannelsTabList_TabButton"]', {hasText : 'Каналы'});
    //  const button = await rows.evaluateAll(
    //   list => list.map(element => element.textContent)
    //  )
    //  console.log(button);
  });