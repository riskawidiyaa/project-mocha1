const { Builder, By, until } = require('selenium-webdriver');
const { expect } = require('chai');
const takeScreenshot = require('../utils/screenshot');

// Ambil halaman
const LoginPage = require('../pages/login.page');
const AddToCartPage = require('../pages/addtocart.page');
const CheckoutPage = require('../pages/checkout.page');

describe('Automate Add to Cart and Checkout Flow', function () {
  let driver;
  this.timeout(50000);

  before(async () => {
	// Buka browser
    driver = await new Builder().forBrowser('firefox').build();
	
	// Inisiasi halaman
	loginPage = new LoginPage(driver);
	addToCartPage = new AddToCartPage(driver);
	checkoutPage = new CheckoutPage(driver);
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

  it('should add to cart and successfully checkout item', async () => {
	// Buka halaman login 
	await loginPage.getLogin();
	
	// Login dengan menggunakan username dan password standard
	await loginPage.loginAsStandardUser();

	// Tunggu 10 detik sampai masuk ke halaman beranda
    await driver.wait(until.urlContains('inventory.html'), 10000);
	
	// Masukkan barang ke keranjang
	await addToCartPage.addToCart();
	
	// Tunggu 10 detik sampai masuk ke halaman keranjang
    await driver.wait(until.urlContains('cart.html'), 10000);
    const currentUrl = await driver.getCurrentUrl();
    expect(currentUrl).to.include('cart.html');
	
	// Checkout keranjang
	await addToCartPage.checkout();
	
	// Isi form checkout
	await checkoutPage.fillForm();
	
	// Finish
	await checkoutPage.finish();
  });
});