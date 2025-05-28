const { By } = require('selenium-webdriver');

// Daftar elemen yang digunakan
const PRODUCT_CARD = By.xpath("//div[@class='inventory_item_description']");
const ATC_BACKPACK = By.id('add-to-cart-sauce-labs-backpack');
const ATC_BACKLIGHT = By.id('add-to-cart-sauce-labs-bike-light');
const DEL_BACKPACK = By.id('remove-sauce-labs-backpack');
const DEL_BACKLIGHT = By.id('remove-sauce-labs-bike-light');
const BTN_CART = By.xpath("//a[@class='shopping_cart_link']");
const BTN_CHECKOUT = By.id("checkout");

class AddToCartPage {
  constructor(driver) {
    this.driver = driver;
  }

  async addToCart() {
	// Menambahkan barang 1
	const addPrdct1 = await this.driver.findElement(ATC_BACKPACK);
    await addPrdct1.click();
	
	// Menambahkan barang 2
	const addPrdct2 = await this.driver.findElement(ATC_BACKLIGHT);
    await addPrdct2.click();
	
	await this.driver.sleep(1000);
	
	// Klik icon keranjang
	const BtnCart = await this.driver.findElement(BTN_CART);
    await BtnCart.click();
  }
  
  async checkout() {
	const BtnCheckout = await this.driver.findElement(BTN_CHECKOUT);
    await BtnCheckout.click();
	
	await this.driver.sleep(1000);
  }
}

module.exports = AddToCartPage;