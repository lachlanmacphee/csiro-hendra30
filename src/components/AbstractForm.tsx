import { useState } from "preact/hooks";

export default function AbstractForm() {
  const [responseMessage, setResponseMessage] = useState("");

  async function submit(e: SubmitEvent) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const response = await fetch("/api/abstract", {
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
      <h1 class="text-3xl font-bold mb-6">Submit an Abstract</h1>
      <ol class="mb-4 list-disc pl-4">
        <li>Abstracts and travel awards due on the 14th of September.</li>
        <li>
          Participants notified of abstract acceptances and travel awards on the
          1st of October.
        </li>
        <li>Registrations due on the 1st of November.</li>
      </ol>
      <div class="mb-4">
        <label for="firstName" class="block mb-2">
          First Name
        </label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          required
          maxlength={50}
          class="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>
      <div class="mb-4">
        <label for="surname" class="block mb-2">
          Surname
        </label>
        <input
          type="text"
          id="surname"
          name="surname"
          required
          maxlength={50}
          class="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>
      <div class="mb-4">
        <label for="email" class="block mb-2">
          Email Address
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
        <label for="title" class="block mb-2">
          Abstract Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          required
          class="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>
      <div class="mb-4">
        <label for="authors" class="block mb-2">
          Authors (comma separated if multiple)
        </label>
        <input
          type="text"
          id="authors"
          name="authors"
          required
          class="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          placeholder="Author Name, Author Name"
        />
      </div>
      <div class="mb-4">
        <label for="affiliations" class="block mb-2">
          Affiliations (comma separated if multiple)
        </label>
        <input
          type="text"
          id="affiliations"
          name="affiliations"
          class="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          placeholder="Affiliation, Affiliation"
        />
      </div>
      <div class="mb-4">
        <label for="abstract" class="block mb-2">
          Abstract (max 2000 characters)
        </label>
        <textarea
          id="abstract"
          name="abstract"
          required
          rows={4}
          maxlength={2000}
          class="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
        ></textarea>
      </div>
      <div class="mb-4">
        <label class="block mb-2">Type</label>
        <div class="flex items-center">
          <input
            type="radio"
            name="type"
            id="talk"
            value="talk"
            required
            checked
            class="mr-2 text-violet-600"
          />
          <label for="talk" class="mr-4">
            Talk
          </label>
          <input
            type="radio"
            id="poster"
            value="poster"
            name="type"
            required
            class="mr-2 text-violet-600"
          />
          <label for="poster">Poster</label>
        </div>
      </div>
      <div class="mb-4">
        <label for="topic" class="block mb-2">
          Topic
        </label>
        <select
          id="topic"
          name="topic"
          required
          class="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
        >
          <option value="">Select a topic</option>
          <option value="disease-ecology">Disease Ecology</option>
          <option value="surveillance">Surveillance</option>
          <option value="behavioural-determinants">
            Behavioural determinants of transmission
          </option>
          <option value="pathogenesis">
            Pathogenesis in animal and non-animal models
          </option>
          <option value="virology-immunology">Virology and immunology</option>
          <option value="diagnostics">Diagnostics</option>
          <option value="vaccines">Vaccines</option>
          <option value="therapeutics">Therapeutics</option>
          <option value="one-health-governance">
            One Health governance and policy
          </option>
        </select>
      </div>
      <div class="mb-4">
        <div class="flex gap-2 items-center mb-2">
          <label class="block">Student / LMIC</label>
          <a
            href="https://www.oecd.org/dac/financing-sustainable-development/development-finance-standards/DAC-List-of-ODA-Recipients-for-reporting-2024-25-flows.pdf"
            target="_blank"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              width="16px"
              height="16px"
              viewBox="0 0 16 16"
              version="1.1"
            >
              <g id="surface1">
                <path
                  style="fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke:rgb(124 58 237);stroke-opacity:1;stroke-miterlimit:4;"
                  d="M 22.001953 12 C 22.001953 17.525391 17.525391 22.001953 12 22.001953 C 6.474609 22.001953 1.998047 17.525391 1.998047 12 C 1.998047 6.474609 6.474609 1.998047 12 1.998047 C 17.525391 1.998047 22.001953 6.474609 22.001953 12 Z M 22.001953 12 "
                  transform="matrix(0.666667,0,0,0.666667,0,0)"
                ></path>
                <path
                  style="fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke:rgb(124 58 237);stroke-opacity:1;stroke-miterlimit:4;"
                  d="M 12 16.001953 L 12 12 "
                  transform="matrix(0.666667,0,0,0.666667,0,0)"
                ></path>
                <path
                  style="fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke:rgb(124 58 237);stroke-opacity:1;stroke-miterlimit:4;"
                  d="M 12 7.998047 L 12.011719 7.998047 "
                  transform="matrix(0.666667,0,0,0.666667,0,0)"
                ></path>
              </g>
            </svg>
          </a>
        </div>
        <div class="flex items-center">
          <input
            type="radio"
            name="student-lmic"
            id="student"
            value="student"
            required
            checked
            class="mr-2 text-violet-600"
          />
          <label for="student" class="mr-4">
            Student
          </label>
          <input
            type="radio"
            name="student-lmic"
            id="lmic"
            value="lmic"
            required
            class="mr-2 text-violet-600"
          />
          <label for="lmic" class="mr-4">
            LMIC
          </label>
          <input
            type="radio"
            name="student-lmic"
            id="none"
            value="none"
            required
            class="mr-2 text-violet-600"
          />
          <label for="none">N/A</label>
        </div>
      </div>
      <div class="mb-4">
        <input
          type="submit"
          value="Submit"
          class="w-full bg-violet-700 hover:bg-violet-800 text-white font-bold py-2 px-4 rounded-md cursor-pointer"
        />
      </div>
      {responseMessage && <p>{responseMessage}</p>}
    </form>
  );
}
