import { Reporter, TestCase, TestResult } from '@playwright/test/reporter';
import { createJiraTicket } from 'Playwright/api/Jira/jiraHelper';


require('dotenv').config({ path: '../.env' });

class JiraReporter implements Reporter {


  /**
   * Called automatically by Playwright after each test finishes.
   * 
   * This method checks:
   * - If the execution is running in CI environment
   * - If the test has failed
   * 
   * If both conditions are met, it creates a Jira ticket containing:
   * - Test title
   * - Test file location
   * - Error message
   * 
   * @param test - The Playwright TestCase object containing test metadata.
   * @param result - The Playwright TestResult object containing execution results.
   * 
   * @returns A Promise that resolves when Jira ticket creation is complete.
   */
  async onTestEnd(pTest: TestCase, pResult: TestResult) {


    // Only run in CI
    if (!process.env.CI) {
      return;
    }

    if (pResult.status !== 'failed') return;

    const title = pTest.title;
    const file = pTest.location.file;
    const error = pResult.error?.message || 'Unknown error';

    await createJiraTicket(title, error, file);

  }

}

export default JiraReporter;