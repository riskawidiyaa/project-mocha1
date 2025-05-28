const { Builder, By, until } = require('selenium-webdriver');
const { expect } = require('chai');
const takeScreenshot = require('../utils/screenshot');

// Ambil halaman
const LoginPage = require('../pages/login.page');

describe('Automate Login (Dynamic Credentials)', function () {
  let driver;
  this.timeout(50000);

  before(async () => {
	// Buka browser
    driver = await new Builder().forBrowser('firefox').build();
	
	// Inisiasi halaman login
	loginPage = new LoginPage(driver);
  });

  after(async () => {
	// Tutup browser
    await driver.quit();
  });

  afterEach(async function () {
	// Buat file screenshot setiap selesai menjalankan test
    const testName = this.currentTest.title.replace(/\s+/g, '_');
    const status = this.currentTest.state === 'passed' ? 'success' : 'failed';
    const filename = `${testName}_${status}`;
    const filepath = `./reports/screenshots/${filename}.png`;

    await takeScreenshot(driver, filename);
    console.log(`[[ATTACHMENT|${filepath}]]`);
  });

  it('should login successfully with valid credentials', async () => {
	// Buka halaman login
	await loginPage.getLogin();
	
	// Login dengan menggunakan username dan password acak
	await loginPage.login();

	// Tunggu 10 detik sampai masuk ke halaman beranda
    await driver.wait(until.urlContains('inventory.html'), 10000);
    const currentUrl = await driver.getCurrentUrl();
    expect(currentUrl).to.include('inventory.html');
  });
});