import { Reporter, TestCase, TestResult } from '@playwright/test/reporter';
import { createJiraTicket } from 'Playwright/api/Jira/jiraHelper';

class JiraReporter implements Reporter {

  async onTestEnd(test: TestCase, result: TestResult) {

    if (result.status !== 'failed') return;

    const title = test.title;
    const file = test.location.file;
    const error = result.error?.message || 'Unknown error';

    await createJiraTicket(title, error, file);
    
  }

}

export default JiraReporter;