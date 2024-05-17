import type { APIRoute } from "astro";

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

  return new Response(
    JSON.stringify({
      message: "Success!",
    }),
    { status: 200 },
  );
};
