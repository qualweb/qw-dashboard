const { QualWeb } = require('@qualweb/core');
const { ACTRules } = require('@qualweb/act-rules');
const { WCAGTechniques } = require('@qualweb/wcag-techniques');

/**
 * @param {string} urlToEvaluate
 */
async function evaluate(urlsToEvaluate, screenWidth, screenHeight, isMobile, isLandscape) {
  const plugins = {
  };
  const qualweb = new QualWeb(plugins);

  const clusterOptions = {
    maxConcurrency: 5, // Performs several urls evaluations at the same time - the higher the number given, more resources will be used. Default value = 1
    timeout: 60 * 1000, // Timeout for loading page. Default value = 30 seconds
    monitor: true // Displays urls information on the terminal. Default value = false
  };

  const puppeteerOptions = {
    headless: true,
    args: ['--no-sandbox', '--disable-gpu'],
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
      urls: urlsToEvaluate,
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