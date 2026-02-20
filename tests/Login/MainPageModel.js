import { Locator, Page } from "@playwright/test";


export class MainPageModel {
  constructor(page) {
    this.page = page;

    // xPath main
    this.main_lupa = page.locator('[data-test-id="SearchButton_Button"]'); // Лупа на главной
    this.microphone = page.locator('[data-test-id="RecordButton_Button"]');//Микрофон в поиске
    this.delete_tesult_search = page.locator('[data-test-id="YouSearched_DeleteButton"]');//Крестик удаления значения
    this.Chastue_zaprosu = page.locator('[role="heading"]', { hasText: 'Частые запросы' });// Секция чатые запросы
    this.delete_main_search = page.locator('[data-test-id="InputContainer_ClearButton"]');//Крестик , стереть значения в поле поискка

    // Чипcы
    this.Chips = page.locator('.v1-c-fXuRtr');//Общий класс чипсов
    const chipBase = 'button.v1-c-inLDBp.v1-c-inLDBp-eihfca-size-bodyM.v1-c-inLDBp-gHjAzf-cv.v1-c-inLDBp-jzeqWw-cv.omega-ui-retail__chip';//Классы всех чипсов
    this.Chips_cashback = page.locator('[data-test-id="FaqContainer_Chip"]').filter({hasText : 'кешбэк'});//Чипс Кешбэк
    this.Chips_credit = page.locator('[data-test-id="FaqContainer_Chip"]').filter({hasText : 'кредит'});//Чипс Кредит
    this.Chips_Automobiles = page.locator('[data-test-id="FaqContainer_Chip"]').filter({hasText : 'автоплатеж'});//Чипс автоплатеж
    this.Chips_limits = page.locator('[data-test-id="FaqContainer_Chip"]').filter({hasText : 'лимиты'});//Чипс лимиты
    this.Chips_Otdelenuy_Bankomats = page.locator('[data-test-id="FaqContainer_Chip"]').filter({hasText : 'отделения и банкоматы'});//Чипс отделеня и банкоматы

    // Поиск и секции
    this.Search_Main = page.locator('[data-test-id="inputcontainer_input_input"]');//Поле поиска
    this.PlaicHolder_Search = page.locator('#mf_1397_1_smart_search__inputContainer__input');//Плейсхолдер в поле поиска
    this.Strelca_back = page.locator('[data-test-id="InputContainer_CloseButton"]');//Стрелочка закрыть поиск
    this.Wu_iskalu = page.locator('.YouSearchedContainer_title');//Секция Вы искали
    this.Lupa_search_1 = page.locator('span.v1-c-kIaFgW.YouSearchedItem_image_magnifier').first();//Лупа слева от ранее введного значени в секции
    this.X_Lupa_search_1 = page.locator('span.v1-c-kIaFgW.YouSearchedItem_image_cross').first();//Крестик удалить занчения из секции
    this.Aresru_and_vsuskanuy = page.locator('[data-test-id="Result_Item"]');

    //Нет результатов
    this.no_found = page.locator('.v1-c-gbVBIp-iPJLV-css', {hasText : 'По вашему запросу ничего не найдено. Попробуйте другой запрос или спросите у чат-бота, постараемся помочь.'});//title - "По вашему запросу ничего не найдено. Попробуйте другой запрос или спросите у чат-бота, постараемся помочь."
    this.Icon_Chats = page.locator('.v1-c-kIaFgW.EmptyResultContainer_icon');//иконка чата слева от Спросить чат-бота
    this.Ask_chat_bot_button = page.locator('[data-test-id="EmptyResultContainer_ChatButton"]');//текс-ссылка "Спросить чат-бота"
    this.Found_Supplier = page.locator('[role="heading"]', {hasText : "Ищете поставщика?"});//Секция title "Ищете поставщика?"
    this.title_pay_details = page.locator('.v1-c-gbVBIp-iPJLV-css', {hasText :"Вы можете оплатить услугу по реквизитам"});//Подзаголовок "Вы можете оплатить услугу по реквизитам"
    this.Icon_details = page.locator('span.v1-c-kIaFgW.LookingForProviderContainer_icon');//Иконка слева от кноки-ссылки "Оплатить по реквизитам"/
    this.Pay_for_requisits = page.locator('[data-test-id="LookingForProviderContainer_PayByRequisitesLink"]');//Кнопка-ссылка "Оплатить по реквизитам" 

    //Мои продкты
    this.my_product = page.locator('.v1-c-gbVBIp', {hasText : "Мои продукты"}); // Секция Мои продукты
    this.Eshe = page.locator('[data-test-id="SectionContainer_ToggleMoreButton"]');//ЕЩЕ и свернуть имеют один и тот же локатор
    this.Svernut = page.locator('[data-test-id="SectionContainer_ToggleMoreButton"]').filter('Свернуть');


    this.transfer_for_phone = page.locator('[data-test-id="Result_Item"]').filter('По номеру телефона');
    this.credut_nalich = page.locator('[data-test-id="Result_Item"]');
    //Пожсказки
    this.arestu = page.locator('[data-test-id="HintItem_Item"]').first();


  //   //_________________________________________________________________//
  // //   //Каналы//
    this.chatSmall = page.locator('[data-test-id="webchat_channels_toggleButton_title"]');
    //this.chatSmall = page.locator('[data-test-id="webchat_toggleButton"]'); //Чат кнопка внизу справа
    this.tabButton = page.locator('[data-test-id="ChannelsTabList_TabButton"]');//Вкладка Каналы 
    this.cardButton = page.locator('[data-test-id="ChannelsCard_CardButton"]');
    this.subscriptionButton = page.locator('[data-test-id="ChannelsCard_SubscriptionButton"]');
    this.moreChannelsButton = page.locator('[data-test-id="ChannelsCardList_MoreChannelsButton"]');//Кнопка Больше каналов
    this.ChannelsexpandChat = page.locator('[data-test-id="Header_WidgetExpandButton"]');// Расширить чат
    this.Channelscounter = page.locator('.unreadTopicsIndicator-e90e8a75'); //Каунтер на каналах
    this.ChannelsInCounterChannel = page.locator('.unreadMessagesIndicator-b36edece'); //Каунтер в канале 
    //Канал
    this.ChannelsthreePoint = page.locator('[data-test-id="Header_SettingsButton"]');//Три точки в канале
    this.ChannelscounterInChannel = page.locator('.unreadMessagesIndicator-b36edece.unreadIndicator-fbb128d5');//Каунтер в канале
    this.ChannelsdateInChannel =page.locator('[data-test-id="webchat_message_date"]');//Дата новости
    this.ChannelsTextInChannel = page.locator('[data-test-id="webchat_message_text"]'); //Текст в новости
    this.ChannelsTimeInChannel = page.locator('[data-test-id="webchat_message_time"]'); //Время в новости
    this.ChannelsReaction = page.locator('[data-test-id="webchat_message_reaction"]'); //Реакция на новости
    //this.ChannelsProfileChannel = page.getByrole('button', {hasText: 'Перейти в профиль канала'});//Три точки в канале
    //Профиль канала
    this.ChannelsPictuteChannel = page.locator('.image-fc285b55');//Картинка канала в профиле
    this.ChannelsNameChannelinProfile = page.locator('.title-f76f2987');//Название канала в профиле
    this.ChannelsSubscribers = page.locator('.subs_count-ff8d6cf3');//Подсписки в профиле канала
    this.ChannelsNotifications = page.locator('.notificationTitle-c633030c', {hasText : 'Уведомления'});//Уведомления в профиле канала
    this.ChannelsToglNotification = page.locator('[data-test-id="channel-notification-switch"]'); //Тогл переключения Уведомления
    //__________________________________________________________________//
    //СВязь с банком
    //this.connectionBank = page.locator('[data-test-id="ChannelsTabList_TabButton"]');//Вкладка Связь с банком
    //this.ObrashenyaMoreChannels = page.locator('[data-test-id="Tile_Button"]', {hasText : 'Обращения'});//Кнопка Обращения
    //this.Phone_is_bank = page.locator('[data-test-id="Tile_Button"]', {hasText : 'Позвонить в банк'});//Кнопка Позвонить в банк
    //this.Bankomat_and_otdelenya = page.getByrole('[data-test-id="Tile_Button"]', {hasText : 'Найти банкоматы и отделения'});//Кнопка Найти банкоматы и отделения
    //this.Evry_day_quiestions = page.getByrole('[data-test-id="Tile_Button"]', {hasText : 'Частые вопросы'});//Кнопка Частые вопросы



    

   }

}
