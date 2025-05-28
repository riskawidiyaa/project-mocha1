const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

(async () => {
  const reportPath = path.resolve(__dirname, 'reports/mochawesome-report/report.html');
  const outputPath = path.resolve(__dirname, 'reports/mochawesome-report/report.pdf');

  if (!fs.existsSync(reportPath)) {
    console.error('HTML report not found:', reportPath);
    process.exit(1);
  }

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(`file://${reportPath}`, { waitUntil: 'networkidle0' });
  await page.pdf({ path: outputPath, format: 'A4', printBackground: true });

  await browser.close();
  console.log('PDF report saved to:', outputPath);
})();