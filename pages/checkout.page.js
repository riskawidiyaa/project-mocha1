const { By, until } = require('selenium-webdriver');

// Daftar elemen yang digunakan
const FIELD_FIRSTNAME = By.id('first-name'); 
const FIELD_LASTNAME = By.id('last-name');
const FIELD_POSTALCODE = By.id('postal-code');
const BTN_CONTINUE = By.id('continue');
const BTN_FINISH = By.id('finish');
const CO_COMPLETE_CONTAINER = By.id('checkout_complete_container');
const BTN_BACK_HOME = By.id('back-to-products');

class CheckoutPage {
  constructor(driver) {
    this.driver = driver;
  }

  async fillForm() {
	// Tunggu sampai muncul field First Name
	await this.driver.wait(until.elementLocated(FIELD_FIRSTNAME), 10000);
		
	// Isi field first name
    await this.driver.findElement(FIELD_FIRSTNAME).sendKeys('Riska');
	// Isi field last name
    await this.driver.findElement(FIELD_LASTNAME).sendKeys('Widiya');
	// Isi field postal code
    await this.driver.findElement(FIELD_POSTALCODE).sendKeys('12345');
	// Klik button continue
    await this.driver.findElement(BTN_CONTINUE).click();
  }
  
  async finish() {
	await this.driver.executeScript('arguments[0].scrollIntoView({ behavior: "smooth", block: "center" });', await this.driver.findElement(BTN_FINISH));

	await this.driver.sleep(1000);
	
	// Klik button finish
    await this.driver.findElement(BTN_FINISH).click();
	
	// Tunggu sampai muncul order selesai dan button back home
	await this.driver.wait(until.elementLocated(CO_COMPLETE_CONTAINER), 10000);
	await this.driver.wait(until.elementLocated(BTN_BACK_HOME), 10000);
  }
}

module.exports = CheckoutPage;