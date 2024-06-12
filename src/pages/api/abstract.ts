import type { APIRoute } from "astro";
import { google } from "googleapis";
import validator from "validator";
import xss from "xss";

const MAX_NAME_LENGTH = 50;
const MAX_ABSTRACT_BODY_LENGTH = 2000;

// Initialise the Google Sheets API client
const sheets = google.sheets({
  version: "v4",
  auth: new google.auth.GoogleAuth({
    credentials: {
      type: "service_account",
      project_id: "hendra30",
      private_key_id: import.meta.env.GOOGLE_PRIVATE_KEY_ID,
      private_key: import.meta.env.GOOGLE_PRIVATE_KEY,
      client_email: import.meta.env.GOOGLE_CLIENT_EMAIL,
      client_id: import.meta.env.GOOGLE_CLIENT_ID,
      universe_domain: "googleapis.com",
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  }),
});

const spreadsheetId = "1JM8CZmKATTGBeBBckWz0ecGjgcIdvM75qTguvdmD1-U";
const sheetName = "Abstracts";

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData();
  const firstNameUnsan = data.get("firstName")?.toString() || "";
  const surnameUnsan = data.get("surname")?.toString() || "";
  const emailUnsan = data.get("email")?.toString() || "";
  const abstractTitleUnsan = data.get("title")?.toString() || "";
  const abstractAuthorsUnsan = data.get("authors")?.toString() || "";
  const abstractAffiliationsUnsan = data.get("affiliations")?.toString() || "";
  const abstractBodyUnsan = data.get("abstract")?.toString() || "";
  const abstractTypeUnsan = data.get("type")?.toString() || "";
  const abstractTopicUnsan = data.get("topic")?.toString() || "";
  const abstractStudentLmicUnsan = data.get("student-lmic")?.toString() || "";

  // Check for missing fields
  if (
    !firstNameUnsan ||
    !surnameUnsan ||
    !emailUnsan ||
    !abstractTitleUnsan ||
    !abstractAuthorsUnsan ||
    !abstractAffiliationsUnsan ||
    !abstractBodyUnsan ||
    !abstractTypeUnsan ||
    !abstractTopicUnsan ||
    !abstractStudentLmicUnsan
  ) {
    return new Response(
      JSON.stringify({
        message: "Missing one or multiple required fields",
      }),
      { status: 400 },
    );
  }

  // Check for invalid email format
  if (!validator.isEmail(emailUnsan)) {
    return new Response(
      JSON.stringify({
        message: "Invalid email format",
      }),
      { status: 400 },
    );
  }

  // Check for name length
  if (
    firstNameUnsan.length > MAX_NAME_LENGTH ||
    surnameUnsan.length > MAX_NAME_LENGTH
  ) {
    return new Response(
      JSON.stringify({
        message: `First name or surname exceeds maximum allowed length of ${MAX_NAME_LENGTH} characters`,
      }),
      { status: 400 },
    );
  }

  // Check for abstract body length
  if (abstractBodyUnsan.length > MAX_ABSTRACT_BODY_LENGTH) {
    return new Response(
      JSON.stringify({
        message: `Abstract body exceeds maximum allowed length of ${MAX_ABSTRACT_BODY_LENGTH} characters`,
      }),
      { status: 400 },
    );
  }

  // Sanitize and escape input
  const firstName = xss(validator.escape(firstNameUnsan));
  const surname = xss(validator.escape(surnameUnsan));
  const email = xss(emailUnsan);
  const abstractTitle = xss(validator.escape(abstractTitleUnsan));
  const abstractAuthors = xss(validator.escape(abstractAuthorsUnsan));
  const abstractAffiliations = xss(validator.escape(abstractAffiliationsUnsan));
  const abstractBody = xss(validator.escape(abstractBodyUnsan));
  const abstractType = xss(validator.escape(abstractTypeUnsan));
  const abstractTopic = xss(validator.escape(abstractTopicUnsan));
  const abstractStudentLmic = xss(validator.escape(abstractStudentLmicUnsan));

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
