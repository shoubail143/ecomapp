import { useState } from "react";
import bannerImg from "../../assets/bannerImg.jpg";

const Subscribe = () => {
  const [email, setEmail] = useState("");
  const [submittedEmail, setSubmittedEmail] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmittedEmail(email.trim());
  };

  return (
    <div
      data-no-order-popup
      data-aos="zoom-in"
      className="relative bg-gray-900 text-white py-16 overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-20 bg-cover bg-center pointer-events-none"
        style={{ backgroundImage: `url(${bannerImg})` }}
      ></div>

      <div className="relative container mx-auto px-4 z-10">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-2xl mx-auto p-8 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-black dark:text-white mb-6">
            Get <span className="text-blue-500">notified</span> about new
            products
          </h1>
          <form
            onSubmit={handleSubmit}
            className="flex w-full max-w-lg mx-auto flex-col gap-4 sm:flex-row"
          >
            <input
              name="email"
              type="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setSubmittedEmail("");
              }}
              aria-label="Email address"
              autoComplete="email"
              required
              placeholder="Enter your Email"
              className="w-full py-3 px-4 rounded-lg text-black bg-white border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300 w-full sm:w-auto whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
          {submittedEmail && (
            <p
              className="mt-4 text-sm font-medium text-green-700 dark:text-green-400"
              role="status"
            >
              Thanks for subscribing, {submittedEmail}.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
