import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData();
  const firstName = data.get("firstname");
  const lastName = data.get("lastname");
  const email = data.get("email");
  const phone = data.get("phone");
  const company = data.get("company");
  const attendeeType = data.get("attendeeType");

  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !company ||
    !attendeeType
  ) {
    return new Response(
      JSON.stringify({
        message: "Missing required fields",
      }),
      { status: 400 },
    );
  }

  // Add additional validation to check formats etc

  return new Response(
    JSON.stringify({
      message: "Success!",
    }),
    { status: 200 },
  );
};
