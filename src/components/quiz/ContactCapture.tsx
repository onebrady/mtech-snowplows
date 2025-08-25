import { useState } from "react";
import { emitAnalytics } from "../../lib/analytics";

export function ContactCapture() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function isValidEmail(value: string) {
    return /.+@.+\..+/.test(value);
  }

  return (
    <section aria-labelledby="contact-capture" className="mt-8">
      <h3 id="contact-capture" className="font-medium">
        Want a follow-up?
      </h3>
      <p className="text-sm text-slate-600">
        Optional. No account required. We do not store data server-side in this phase.
      </p>
      {submitted ? (
        <p className="mt-2 text-green-700" role="status" aria-live="polite">
          Thanks! We'll be in touch.
        </p>
      ) : (
        <form
          className="mt-3 flex flex-col gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            setError(null);
            if (email && !isValidEmail(email)) {
              setError("Please enter a valid email.");
              return;
            }
            emitAnalytics("quiz_contact_submit", { hasEmail: Boolean(email) });
            setSubmitted(true);
          }}
        >
          <label className="flex flex-col">
            <span className="text-sm">Name (optional)</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border rounded px-3 py-2"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-sm">Email (optional)</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border rounded px-3 py-2"
              aria-describedby={error ? "email-error" : undefined}
            />
          </label>
          {error && (
            <p id="email-error" className="text-sm text-red-700" aria-live="polite">
              {error}
            </p>
          )}
          <div>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-slate-900 text-white hover:bg-slate-800"
            >
              Send
            </button>
          </div>
        </form>
      )}
    </section>
  );
}


