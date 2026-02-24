require('dotenv').config({ path: '../.env' });
const { request } = require('@playwright/test');
const JIRA_HOST = process.env.JIRA_HOST;
const JIRA_EMAIL = process.env.JIRA_EMAIL;
const JIRA_API_TOKEN = process.env.JIRA_API_TOKEN;
const JIRA_PROJECT_KEY=process.env.JIRA_PROJECT_KEY;


export async function createJiraTicket(title, error, file) {
  const auth = Buffer.from(`${JIRA_EMAIL}:${JIRA_API_TOKEN}`).toString('base64');

  const apiContext = await request.newContext({
    baseURL: `https://${JIRA_HOST}`,
    extraHTTPHeaders: {
      Authorization: `Basic ${auth}`,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  });

  const response = await apiContext.post('/rest/api/3/issue', {
    data: {
      fields: {
        project: { key: JIRA_PROJECT_KEY },
        summary: `Test Failed: ${title}`,
        description: {
          type: 'doc',
          version: 1,
          content: [
            {
              type: 'paragraph',
              content: [{ type: 'text', text: `File: ${file}` }]
            },
            {
              type: 'paragraph',
              content: [
                { type: 'text', text: `Error: ${error}` }
              ]
            }
          ]
        },
        issuetype: { name: 'Tâche'  }
      }
    }
  });

  if (response.ok()) {
    const data = await response.json();
    
    console.log('✅ Issue created:', data.key);
  } else {
    console.error(' Failed:', await response.text());
    
  }
};
