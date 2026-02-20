import { TIMEOUT } from "dns";
const TARGET_URL = process.env.TARGET_URL || 'https://online.if.test.vtb.ru/login';
export class Login {

    constructor (page) {
        this.page = page;
        this.phonenumber = page.locator('[data-test-id="phone-number-input_input"]');
        this.submitphonenumber = page.locator('[data-test-id="submit-phone-number-button"]');
        this.textbox = page.getByRole('textbox');
        this.okdCode = page.getByRole('textbox');
        this.webchattoggleButton = page.locator('[data-test-id="webchat_toggleButton"]');
        this.webchatchattitle = page.locator('[data-test-id="webchat_chat_title"]').getByRole('img');
        this.settingschat = page.getByRole('button', { name: 'Настройки чата' });
    }

    async open() {
        await this.page.goto(TARGET_URL);
    }

    async inputPhone(phone) {
        await this.phonenumber.click();
        await this.phonenumber.fill(phone);
        await this.submitphonenumber.click();
    }

    async inputOTP(){
        await this.textbox.click();
        await this.textbox.fill('000000')

}
    async inputOKD(okd){
        await this.okdCode.click();
        await this.okdCode.fill(okd)
    }

    async openChant() {
        
        await this.webchattoggleButton.click();
        // await this.webchatchattitle.click();
        // await this.settingschat.click();
    }
}
