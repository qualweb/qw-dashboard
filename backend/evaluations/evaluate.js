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