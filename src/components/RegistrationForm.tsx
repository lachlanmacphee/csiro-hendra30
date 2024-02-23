import { useState } from "preact/hooks";
export const prerender = false;

export default function RegistrationForm() {
  const [responseMessage, setResponseMessage] = useState("");

  async function submit(e: SubmitEvent) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const response = await fetch("/api/register", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    if (data.message) {
      setResponseMessage(data.message);
    }
  }

  return (
    <form onSubmit={submit}>
      <h1 class="text-3xl font-bold mb-6">Register Your Interest</h1>
      <div class="mb-4">
        <label for="firstname" class="block mb-2">
          First Name
        </label>
        <input
          type="text"
          id="firstname"
          name="firstname"
          required
          class="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>
      <div class="mb-4">
        <label for="lastname" class="block mb-2">
          Last Name
        </label>
        <input
          type="text"
          id="lastname"
          name="lastname"
          required
          class="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>
      <div class="mb-4">
        <label for="email" class="block mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          class="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>
      <div class="mb-4">
        <label for="phone" class="block mb-2">
          Phone
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          required
          class="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>
      <div class="mb-4">
        <label for="company" class="block mb-2">
          Company/Organisation
        </label>
        <input
          type="text"
          id="company"
          name="company"
          class="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>
      <div class="mb-4">
        <label for="attendeeType" class="block mb-2">
          Attendee Type
        </label>
        <select
          id="attendeeType"
          name="attendeeType"
          class="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
        >
          <option value="general">General Attendee</option>
          <option value="speaker">Speaker</option>
          <option value="sponsor">Sponsor</option>
          <option value="media">Media</option>
        </select>
      </div>
      <div class="mb-4">
        <input
          type="submit"
          value="Register"
          class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md cursor-pointer"
        />
      </div>
      {responseMessage && <p>{responseMessage}</p>}
    </form>
  );
}
