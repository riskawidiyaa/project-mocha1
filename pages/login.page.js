const { By } = require('selenium-webdriver');

// Daftar elemen yang digunakan
const DATA_USERNAME = By.xpath("//h4[text()='Accepted usernames are:']/parent::div");
const DATA_PASSWORD = By.xpath("//h4[text()='Password for all users:']/parent::div");
const FIELD_USERNAME = By.id('user-name'); 
const FIELD_PASSWORD = By.id('password');
const BTN_LOGIN = By.id('login-button');

class LoginPage {
  constructor(driver) {
    this.driver = driver;
  }

  async getLogin() {
	// Buka halaman https://www.saucedemo.com/
    await this.driver.get('https://www.saucedemo.com/');
  }

  async login() {
	// Ambil data username
	let containerUsername = await this.driver.findElement(DATA_USERNAME);
    let rawUsername = await containerUsername.getAttribute('innerHTML');
	
	// Ambil data password
	let containerPassword = await this.driver.findElement(DATA_PASSWORD);
    let rawPassword = await containerPassword.getAttribute('innerHTML');

	// Ubah data username ke array
    let dataUsernameArray = rawUsername
      .replace(/<h4>Accepted usernames are:<\/h4>/, '')
      .split('<br>')
      .map(item => item.trim())
      .filter(item => item.length > 0);
	  
	// Ubah data password ke array
    let dataPasswordArray = rawPassword
      .replace(/<h4>Password for all users:<\/h4>/, '')
      .split('<br>')
      .map(item => item.trim())
      .filter(item => item.length > 0);
	  
	// Ambil hanya satu data secara acak
    let selectedUsername = dataUsernameArray[Math.floor(Math.random() * dataUsernameArray.length)];
	let selectedPassword = dataPasswordArray[Math.floor(Math.random() * dataPasswordArray.length)];

    console.log("Username yang digunakan:", selectedUsername);
	console.log("Password yang digunakan:", selectedPassword);
	
    // Isi field username
    await this.driver.findElement(FIELD_USERNAME).sendKeys(selectedUsername);
	// Isi field password
    await this.driver.findElement(FIELD_PASSWORD).sendKeys(selectedPassword);
	// Klik button login
    await this.driver.findElement(BTN_LOGIN).click();
  }
  
  async loginAsStandardUser() {
	// Isi field username
    await this.driver.findElement(FIELD_USERNAME).sendKeys('standard_user');
	// Isi field password
    await this.driver.findElement(FIELD_PASSWORD).sendKeys('secret_sauce');
	// Klik button login
    await this.driver.findElement(BTN_LOGIN).click();
  }
}

module.exports = LoginPage;