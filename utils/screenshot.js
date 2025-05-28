const fs = require('fs');
const path = require('path');

async function takeScreenshot(driver, filename) {
  const dir = path.resolve(__dirname, '../reports/screenshots');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const image = await driver.takeScreenshot();
  const filePath = path.join(dir, `${filename}.png`);
  fs.writeFileSync(filePath, image, 'base64');
}

module.exports = takeScreenshot;