const config = require('@/config').value;
const chromium = require('chrome-aws-lambda');

module.exports = async () => {
    const options = {
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-infobars', '--window-position=0,0', '--ignore-certifcate-errors', '--ignore-certifcate-errors-spki-list', `--user-agent=${config.ua}`],
        headless: true,
        ignoreHTTPSErrors: true,
        userDataDir: './tmp',
        executablePath: await chromium.executablePath,
    };

    let browser;
    if (config.puppeteerWSEndpoint) {
        browser = await chromium.puppeteer.connect({
            browserWSEndpoint: config.puppeteerWSEndpoint,
        });
    } else {
        browser = await chromium.puppeteer.launch(options);
    }
    setTimeout(async () => {
        browser.close();
    }, 30000);

    return browser;
};
