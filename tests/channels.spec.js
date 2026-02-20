// @ts-check
import { test, expect } from '@playwright/test';
import { Login } from './Login/login';
import { MainPageModel } from './Login/MainPageModel';
import { log } from 'node:console';
import { mainModule } from 'node:process';

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
  await page.locator('[data-test-id="webchat_toggleButton"]').hover()
  //await expect(MainPage.chatSmall).toBeVisible(); //проверяем что чат виден
  await MainPage.chatSmall.click();//Клик на чат

  await page.locator('[data-test-id="ChannelsTabList_TabButton"]', {hasText : 'Каналы'}).click();//Клик на вкладку Каналы
  await expect(MainPage.cardButton).toHaveCount(5);//Проверка что каналов всего 5
  //await expect(page.locator('.unreadMessagesIndicator-b36edece').first()).toBeVisible(); //У первого канала есть не прочитанные сообщения
  await page.locator('[data-test-id="ChannelsCard_CardButton"]').nth(1).click();//Клик на второй канал по списку
  await page.waitForTimeout(3000);
  await expect(page.locator('[data-test-id="webchat_chatBubble"]').last()).toBeVisible();//Последняя новость видна
  await page.locator('[data-test-id="webchat_message_text"]').last().hover();//Наведение мышки на текст в последней новости

  await expect(page.getByRole('button', { name: 'Опции' }).last()).toBeVisible();//Три точки у последнего  бабаа видны
  await page.getByRole('button', { name: 'Опции' }).last().hover();//Наведение на три точки
  await page.getByRole('button', { name: 'Опции' }).last().click();//Клик на три точки
  await page.locator('[data-test-id="webchat_message_optionsButton"]').last().click();
  await page.waitForTimeout(1000);

const thumbsUpItem = page.getByRole('menuitemradio', { name: 'thumbs_up' });
await thumbsUpItem.waitFor({ state: 'visible', timeout: 2000 });
// проверяем видимость
await expect(thumbsUpItem).toBeVisible({ timeout: 1000 });
  await expect(page.getByRole('menuitemradio', { name: 'thumbs_up' })).toBeVisible({timeout : 1000}); //Смайл
  await expect(page.getByRole('menuitemradio', { name: 'thumbs_down' })).toBeVisible({timeout : 1000});//Смайл
  await expect(page.getByRole('menuitemradio', { name: 'smiling_face_with_hearts' }).first()).toBeVisible();//Смайл
  await expect(page.getByRole('menuitemradio', { name: 'fire' })).toBeVisible();//Смайл
  await expect(page.getByRole('menuitemradio', { name: 'loudly_crying_face' })).toBeVisible({timeout : 1000});//Смайл
  await page.locator('[data-test-id="Reactions_MoreReactionsButton"]').click();//Клик на стрелку раскрыть
  await expect(page.getByRole('menuitemradio', { name: 'frowning_face' })).toBeVisible({timeout : 1000});//Смайл
  await expect(page.getByRole('menuitemradio', { name: 'heart' }).nth(1)).toBeVisible({timeout : 1000});//Смайл
  await expect(page.getByRole('menuitemradio', { name: 'star_struck' })).toBeVisible({timeout : 1000});//Смайл
  await expect(page.getByRole('menuitemradio', { name: 'pouting_face' })).toBeVisible({timeout : 1000});//Смайл
  await expect(page.getByRole('menuitemradio', { name: 'thumbs_up' })).toBeVisible(); //Смайл
  await expect(page.locator('[data-test-id="webchat_message_date"]').first()).toBeVisible();//Дата у новости видна
  await expect(page.locator('[data-test-id="webchat_message_time"]').first()).toBeVisible();//Время у новости видно
  await expect(page.locator('[data-test-id="Header_SettingsButton"]')).toBeVisible();//Три точки в хедере видны
  //await expect(page.locator('[data-test-id="Header_WidgetExpandButton"]')).toBeVisible();//КНопка расширить чат видна  (Щаг падает так как видит два одинаковых локатора )
  await expect(page.locator('[data-test-id="Header_BackButton"]')).toBeVisible();//Стрелвка выйти из новости видна
  //await page.locator('[data-test-id="Header_ChannelManagementButton"]').click();//Клик на хедер канала
  const btn = page.locator('[data-test-id="Header_ChannelManagementButton"]');
  await btn.waitFor({ state: 'visible', timeout: 5000 });
  await btn.click();
  //await expect(page.locator('[data-test-id="Header_BackButton"]')).toBeVisible();//Стрелка назад  есть
  await expect(page.locator('.notificationTitle-c633030c', {hasText : 'Уведомления'})).toBeVisible();
  await expect(page.locator('[data-test-id="channel-notification-switch"]')).toBeEnabled();
  //await page.locator('[data-test-id="webchat_message_text"]').first().click();//Клик на текст первой новости
  await page.waitForTimeout(4000);

});

    test('Кнопка "Больше каналов"', async ({ page }) => {
  const login = new Login(page);
  const MainPage = new MainPageModel(page);

  await login.open();//Переход по заранее прописанному урлу online.if.test****
  await login.inputPhone(phones);//Ввод номер телефона задаю через константу 
  await login.inputOTP()//ввод смс 000000
  await login.inputOKD(okd);//ввод ОКД , передаю константу в каждый тест ели нет обший концепции проверок
  await page.waitForTimeout(5000); //5 тайм аута секунд на прогрузку главной
   await page.locator('[data-test-id="webchat_toggleButton"]').hover()

  await expect(MainPage.chatSmall).toBeVisible(); //проверяем что чат виден
  await MainPage.chatSmall.click();//Клик на чат

  await page.locator('[data-test-id="ChannelsTabList_TabButton"]', {hasText : 'Каналы'}).click();//Клик на вкладку Каналы
  await expect(MainPage.moreChannelsButton).toBeVisible();//Кнопка Больще каналов видна
  await page.locator(MainPage.moreChannelsButton).click();//Клик на кнопку Больше каналов
  await expect(page.locator('[data-test-id="Header_BackButton"]')).toBeVisible(); //КНопка назад видна
  await expect(MainPage.subscriptionButton.first()).toBeVisible();//плючик добавить канал виден
  await page.locator('[aria-label="Опросы с ВТБ. Что на картинке?. "]').click();//Клик на канал с название "Опросы с ВТБ"
  await expect(page.locator('[data-test-id="Header_SettingsButton"]')).toBeVisible();//Три точки видны в канале
  await expect(page.locator('[data-test-id="Subscribe_SubscriptionButton"]')).toBeVisible();//Кнопка Подписаться видна


});