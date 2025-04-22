const { QualWeb } = require('@qualweb/core');
const { ACTRules } = require('@qualweb/act-rules');
const { WCAGTechniques } = require('@qualweb/wcag-techniques');

/**
 * @param {string} urlToEvaluate
 */
async function evaluate(url, screenWidth, screenHeight, isMobile, isLandscape) {
  const plugins = {
  };
  const qualweb = new QualWeb(plugins);

  const clusterOptions = {
    maxConcurrency: 5, // Performs several urls evaluations at the same time - the higher the number given, more resources will be used. Default value = 1
    timeout: 60 * 1000, // Timeout for loading page. Default value = 30 seconds
    monitor: true // Displays urls information on the terminal. Default value = false
  };

  const puppeteerOptions = {
    args: [
      '--disable-dev-shm-usage',
      '--disable-gpu',
      '--disable-setuid-sandbox',
      '--no-sandbox',
      '--no-zygote',
      '--deterministic-fetch',
      '--disable-features=IsolateOrigins',
      '--disable-site-isolation-trials',
      '--disable-extensions',
      '--disable-component-extensions-with-background-pages',
      '--disable-default-apps',
      '--mute-audio',
      '--no-default-browser-check',
      '--autoplay-policy=user-gesture-required',
      '--disable-background-timer-throttling',
      '--disable-backgrounding-occluded-windows',
      '--disable-notifications',
      '--disable-background-networking',
      '--disable-breakpad',
      '--disable-component-update',
      '--disable-domain-reliability',
      '--disable-sync',
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

  // Evaluates the given options - will only return after all urls have finished evaluating or resulted in an error
  const reports = await qualweb.evaluate(
    {
      url: url,
      modules: [
        wcagTechniquesModule,
        actRulesModule
      ]
    }
  );

  // Remember to stop QualWeb once you're done. This closes the Puppeteer
  // instance.
  await qualweb.stop();

  return reports;
}

module.exports = evaluate;