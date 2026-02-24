import { Reporter, TestCase, TestResult } from '@playwright/test/reporter';
import { createJiraTicket } from '../api/jira/jiraHelper.js';

require('dotenv').config({ path: '../.env' });

class JiraReporter implements Reporter {

  async onTestEnd(test: TestCase, result: TestResult) {


    // Only run in CI
    if (!process.env.CI) {
      return;
    }

    if (result.status !== 'failed') return;

    const title = test.title;
    const file = test.location.file;
    const error = result.error?.message || 'Unknown error';

    await createJiraTicket(title, error, file);

  }

}

export default JiraReporter;