import { Handler, HandlerEvent } from "@netlify/functions";
import Airtable from 'airtable';
const { AIRTABLE_KEY } = process.env;
const base = new Airtable({ apiKey: AIRTABLE_KEY }).base('appdmB7A1XW7ws2UB')

const handler: Handler = async (event: HandlerEvent, context: any) => {

  try {
    const data = JSON.parse(event.body || '');
    if (!data.email) {
      return {
        statusCode: 400,
        body: 'Please include email.'
      }
    }

    base('tblEcChHrQqJHJOG0').create({
      Email: data.email
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Thanks for signing up!',
      })
    }

  } catch (error: any) {
    return {
      statusCode: 500,
      body: error.message,
    }
  }

}

export { handler };
