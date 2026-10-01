import { useEffect, useState } from "react";
import { FaShoppingBag, FaTimes } from "react-icons/fa";

const Popup = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const closePopup = () => {
    setEmail("");
    setAddress("");
    setSubmitted(false);
    onClose();
  };

  return (
    <div
      data-order-popup
      className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-950/65 px-4 py-6 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) closePopup();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="order-popup-title"
        className="relative w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 text-gray-900 shadow-2xl dark:border-gray-700 dark:bg-gray-900 dark:text-white sm:p-8"
      >
        <button
          type="button"
          onClick={closePopup}
          aria-label="Close order form"
          className="absolute right-4 top-4 grid size-9 place-items-center rounded-full text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-white"
        >
          <FaTimes aria-hidden="true" />
        </button>

        <div className="mb-5 flex size-12 items-center justify-center rounded-xl bg-primary/15 text-primary">
          <FaShoppingBag aria-hidden="true" className="text-xl" />
        </div>

        <h2 id="order-popup-title" className="text-2xl font-bold">
          {submitted ? "Thanks for your interest" : "Start your order"}
        </h2>

        {submitted ? (
          <div className="mt-3" role="status">
            <p className="text-sm leading-6 text-gray-600 dark:text-gray-300">
              {email} and {address} have been added to your order request.
            </p>
            <button
              type="button"
              onClick={closePopup}
              className="mt-6 w-full rounded-lg bg-gradient-to-r from-primary to-secondary px-4 py-3 font-semibold text-white transition hover:brightness-105"
            >
              Done
            </button>
          </div>
        ) : (
          <form
            className="mt-3"
            onSubmit={(event) => {
              event.preventDefault();
              setSubmitted(true);
            }}
          >
            <p className="mb-5 text-sm leading-6 text-gray-600 dark:text-gray-300">
              Enter your email and delivery address to continue your order.
            </p>
            <label
              htmlFor="order-email"
              className="mb-2 block text-sm font-medium"
            >
              Email address
            </label>
            <input
              id="order-email"
              name="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
              autoFocus
              required
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/25 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            />
            <label
              htmlFor="order-address"
              className="mb-2 mt-4 block text-sm font-medium"
            >
              Delivery address
            </label>
            <textarea
              id="order-address"
              name="address"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              placeholder="Street, city, region, postal code"
              autoComplete="street-address"
              rows={3}
              required
              className="w-full resize-y rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/25 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            />
            <button
              type="submit"
              className="mt-5 w-full rounded-lg bg-gradient-to-r from-primary to-secondary px-4 py-3 font-semibold text-white transition hover:brightness-105"
            >
              Continue with email
            </button>
          </form>
        )}
      </section>
    </div>
  );
};
export default Popup;
