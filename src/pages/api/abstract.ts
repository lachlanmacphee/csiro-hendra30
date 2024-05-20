import credentials from "../../../hendra30-ae97703a6cae.json";
import type { APIRoute } from "astro";
import { google } from "googleapis";

// Initialise the Google Sheets API client
const sheets = google.sheets({
  version: "v4",
  auth: new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  }),
});

const spreadsheetId = "1JM8CZmKATTGBeBBckWz0ecGjgcIdvM75qTguvdmD1-U";
const sheetName = "Abstracts";

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData();
  const firstName = data.get("firstName");
  const surname = data.get("surname");
  const email = data.get("email");
  const abstractTitle = data.get("title");
  const abstractAuthors = data.get("authors");
  const abstractAffiliations = data.get("affiliations");
  const abstractBody = data.get("abstract");
  const abstractType = data.get("type");
  const abstractTopic = data.get("topic");
  const abstractStudentLmic = data.get("student-lmic");

  if (
    !firstName ||
    !surname ||
    !email ||
    !abstractTitle ||
    !abstractAuthors ||
    !abstractAffiliations ||
    !abstractBody ||
    !abstractType ||
    !abstractTopic ||
    !abstractStudentLmic
  ) {
    return new Response(
      JSON.stringify({
        message: "Missing required fields",
      }),
      { status: 400 },
    );
  }

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${sheetName}!A:Z`,
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [
        [
          firstName,
          surname,
          email,
          abstractTitle,
          abstractAuthors,
          abstractAffiliations,
          abstractBody,
          abstractType,
          abstractTopic,
          abstractStudentLmic,
        ],
      ],
    },
  });

  return new Response(
    JSON.stringify({
      message: "Your abstract was added!",
    }),
    { status: 200 },
  );
};
