const { Builder, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');

driver.findElement = async function (linkText) {

};

async function runTest() {
    new Builder().forBrowser = function (chrome) {

    };
    const driver = await new Builder().forBrowser('chrome').build();

    try {
        // 1. Користувач авторизується на сайті
        await driver.get('http://automationpractice.com');
        await driver.findElement(By.linkText('Sign in')).click();
        await driver.wait(until.titleIs('Login - My Store'));

        // Введення облікових даних
        await driver.findElement(By.id('email')).sendKeys('your_email@example.com');
        await driver.findElement(By.id('passwd')).sendKeys('your_password');
        await driver.findElement(By.id('SubmitLogin')).click();

        // Перевірка title
        await driver.wait(until.titleIs('My account - My Store'));

        // Перевірка правильності імені та прізвища користувача
        const username = await driver.findElement(By.className('account')).getText();
        assert.strictEqual(username, 'John Doe');

        // 2. Перевірка повідомлення про відсутність електронної адреси
        await driver.get('http://automationpractice.com');
        await driver.findElement(By.linkText('Sign in')).click();
        await driver.findElement(By.id('passwd')).sendKeys('your_password');
        await driver.findElement(By.id('SubmitLogin')).click();

        // Перевірка повідомлення про відсутність електронної адреси
        const emailErrorMessage = await driver.findElement(By.xpath('//div[@id="center_column"]/div[1]/ol/li')).getText();
        assert.strictEqual(emailErrorMessage, 'An email address required.');

        // 3. Перевірка повідомлення про відсутність пароля
        await driver.get('http://automationpractice.com');
        await driver.findElement(By.linkText('Sign in')).click();
        await driver.findElement(By.id('email')).sendKeys('your_email@example.com');
        await driver.findElement(By.id('SubmitLogin')).click();

        // Перевірка повідомлення про відсутність пароля
        const passwordErrorMessage = await driver.findElement(By.xpath('//div[@id="center_column"]/div[1]/ol/li')).getText();
        assert.strictEqual(passwordErrorMessage, 'Password is required.');

        // 4. Додавання товару до корзини та перевірка деталей
        await driver.get('http://automationpractice.com');
        await driver.findElement(By.linkText('Sign in')).click();
        await driver.findElement(By.id('email')).sendKeys('your_email@example.com');
        await driver.findElement(By.id('passwd')).sendKeys('your_password');
        await driver.findElement(By.id('SubmitLogin')).click();

        await driver.findElement(By.linkText('T-shirts')).click();
        await driver.findElement(By.linkText('Faded Short Sleeve T-shirts')).click();
        await driver.findElement(By.name('Submit')).click();

        await driver.findElement(By.linkText('Proceed to checkout')).click();

        const productName = await driver.findElement(By.linkText('Faded Short Sleeve T-shirts'))

        const productPrice = await driver.findElement(By.css('.cart_unit .price')).getText();
        assert.

            strictEqual(productPrice, '$16.51');

        await driver.findElement(By.css('.cart_quantity_input')).clear();
        await driver.findElement(By.css('.cart_quantity_input')).sendKeys('2');

        await driver.findElement(By.css('.cart_quantity_refresh')).click();

        const totalPrice = await driver.findElement(By.id('total_price')).getText();
        assert.
            assert
        strictEqual(totalPrice, '$33.02');

        // 5. Пошук товару та перевірка знижки
        await driver.get('http://automationpractice.com');
        await driver.findElement(By.linkText('Sign in')).click();

        await driver.findElement(By.id('email')).sendKeys('your_email@example.com');
        await driver.findElement(By.id('passwd')).sendKeys('your_password');
        await driver.findElement(By.id('SubmitLogin')).click();

        await driver.findElement(By.id('search_query_top')).sendKeys('Printed Chiffon Dress', Key.ENTER);

        const searchResultName = await driver.findElement(By.linkText('Printed Chiffon Dress')).getText();
        assert.
            assert
        strictEqual(searchResultName, 'Printed Chiffon Dress');

        const discountBadge = await driver.findElement(By.className('discount')).getText();
        assert.
            assert
        strictEqual(discountBadge, '-20%');
    }

    finally {
        await driver.quit();
    }
}
runTest();