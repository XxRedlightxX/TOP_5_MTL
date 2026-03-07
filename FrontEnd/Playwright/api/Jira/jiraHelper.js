import dotenv from 'dotenv';
import { request } from '@playwright/test';
import fs from 'fs';
dotenv.config({ path: '../.env' });


// Jira Credentials
const JIRA_HOST = process.env.JIRA_HOST;
const JIRA_EMAIL = process.env.JIRA_EMAIL;
const JIRA_API_TOKEN = process.env.JIRA_API_TOKEN;
const JIRA_PROJECT_KEY = process.env.JIRA_PROJECT_KEY;



/**
 * Creates a Jira ticket for a failed test execution.
 * 
 * This function connects to the Jira REST API using Basic Authentication
 * and creates a new issue in the specified project.
 * 
 * @param pTitle - The pTitle of the failed test.
 * @param pError - The pError message associated with the failure.
 * @param pFile - The pFile path where the test failure occurred.
 * 
 * @returns A Promise that resolves when the Jira issue creation request completes.
 * 
 */
export async function createJiraTicket(pTitle, pError, pFile, pScreenshot="") {
  const auth = Buffer.from(`${JIRA_EMAIL}:${JIRA_API_TOKEN}`).toString('base64');

  const apiContext = await request.newContext({
    baseURL: `https://${JIRA_HOST}`,
    extraHTTPHeaders: {
      Authorization: `Basic ${auth}`,
      Accept: 'application/json',
      
    }
  });

  const response = await apiContext.post('/rest/api/3/issue', {
    data: {
      fields: {
        project: { key: JIRA_PROJECT_KEY },
        summary: `Test Failed: ${pTitle}`,
        description: {
          type: 'doc',
          version: 1,
          content: [
            {
              type: 'paragraph',
              content: [{ type: 'text', text: `File : ${pFile}` }]
            },
            {
              type: 'paragraph',
              content: [
                { type: 'text', text: `Error: ${pError}` }
              ]
            },
             { type: 'inlineCard', attrs: { url: `https://${JIRA_HOST}/secure/attachment/${filename}` } }
          ]
        },
        issuetype: { name: 'Tâche' }
      }
    }
  });

  if (response.ok()) {

    const data = await response.json();
    const issueKey = data.key;

    console.log('Issue created:', issueKey);

    // Attach screenshot if it exists
    if (pScreenshot && fs.existsSync(pScreenshot)) {

      await apiContext.post(`/rest/api/3/issue/${issueKey}/attachments`, {
        multipart: {
           file: fs.createReadStream(pScreenshot)
        },
        headers: {
          'X-Atlassian-Token': 'no-check',
          'Content-Type': 'multipart/form-data',
          'Authorization': `Basic ${auth}`,
        }
      });

      console.log('Screenshot attached');
    }

    

  } else {
    console.error('Failed:', await response.text());
  }

  await apiContext.dispose();
}