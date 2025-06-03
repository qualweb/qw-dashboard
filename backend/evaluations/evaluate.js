const { QualWeb } = require('@qualweb/core');
const { ACTRules } = require('@qualweb/act-rules');
const { WCAGTechniques } = require('@qualweb/wcag-techniques');
const puppeteer = require('puppeteer');

/**
 * @param {string} urlToEvaluate
 */
async function evaluate(
  url, 
  screenWidth, 
  screenHeight, 
  isMobile, 
  isLandscape,
  needsAuthentication,
  usernameFieldSelector,
  passwordFieldSelector,
  loginButtonSelector,
  username,
  password
) {
  const plugins = {
  };
  const qualweb = new QualWeb(plugins);

  const clusterOptions = {
    maxConcurrency: 1, // Performs several urls evaluations at the same time - the higher the number given, more resources will be used. Default value = 1
    timeout: 60 * 1000, // Timeout for loading page. Default value = 30 seconds
    monitor: true // Displays urls information on the terminal. Default value = false
  };

  const puppeteerOptions = {
    args: [
      '--disable-gpu',
      '--no-sandbox',
      '--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36', // Modern UA
    ],
    headless: true,
    defaultViewport: {
      width: screenWidth,
      height: screenHeight,
      isMobile: isMobile,
      isLandscape: isLandscape
    }
  };

  // Starts the QualWeb core engine
  await qualweb.start(clusterOptions, puppeteerOptions);
  
  const wcagTechniquesModule = new WCAGTechniques();
  const actRulesModule = new ACTRules();

  let reports;

  if (needsAuthentication) {
    const browser = await puppeteer.launch({
      headless: true,
      args: [
          '--disable-gpu',
          '--no-sandbox',
          '--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36', // Modern UA
        ],
      timeout: 5000,
    });
    
    const page = await browser.newPage();

    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36');

    await page.setViewport({
        width: screenWidth,
        height: screenHeight,
        deviceScaleFactor: 1,
    });

    await page.goto(url, { waitUntil: 'networkidle0' })

    const html_source_code = await bypassLogin(
      page, 
      usernameFieldSelector, 
      passwordFieldSelector, 
      loginButtonSelector, 
      username, 
      password
    );

    browser.close();

    console.log(html_source_code)

    reports = await qualweb.evaluate(
      {
        html: html_source_code,
        modules: [
          wcagTechniquesModule,
          actRulesModule
        ]
      }
    );

  }
  else {
    // Evaluates the given options - will only return after all urls have finished evaluating or resulted in an error
    reports = await qualweb.evaluate(
      {
        url: url,
        modules: [
          wcagTechniquesModule,
          actRulesModule
        ]
      }
    );
  }

  // Remember to stop QualWeb once you're done. This closes the Puppeteer
  // instance.
  await qualweb.stop();

  console.log(reports);

  return reports;
}

module.exports = evaluate;

async function bypassLogin(
  page, 
  usernameFieldSelector, 
  passwordFieldSelector, 
  loginButtonSelector, 
  username, 
  password
) {
  // Fill and submit login form
  await page.evaluate((usernameFieldSelector, passwordFieldSelector, loginButtonSelector, username, password) => {
      const usernameField = document.querySelector(usernameFieldSelector);
      const passwordField = document.querySelector(passwordFieldSelector);
      const loginButton = document.querySelector(loginButtonSelector);

      if (usernameField && passwordField && loginButton) {
          usernameField.value = username;
          passwordField.value = password;
          loginButton.click();
      } else {
          throw new Error('Could not find required login elements');
      }
  }, usernameFieldSelector, passwordFieldSelector, loginButtonSelector, username, password);

  // Wait for navigation to complete (login successful)
  await page.waitForNavigation({ waitUntil: 'networkidle0' });
  
  return page.content();
}