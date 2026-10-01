import {
  FaFacebookF,
  FaInstagram,
  FaShoppingBag,
  FaTwitter,
} from "react-icons/fa";
import footerBanner from "../../assets/Footerr.png";

const FooterLinks = [
  {
    title: "Home",
    link: "/#",
  },
  {
    title: "About",
    link: "/#about",
  },
  {
    title: "Contact",
    link: "/#contact",
  },
  {
    title: "Blog",
    link: "/#blog",
  },
  {
    title: "Services",
    link: "/#services",
  },
  {
    title: "Support",
    link: "/#support",
  },
];
const Footer = () => {
  return (
    <footer
      className="border-t border-white/10 bg-gray-950 bg-cover bg-bottom text-gray-200"
      style={{
        backgroundImage: `linear-gradient(rgba(17, 24, 39, 0.86), rgba(17, 24, 39, 0.94)), url(${footerBanner})`,
      }}
    >
      <div className="container mx-auto grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr] lg:gap-16">
        <div className="max-w-sm">
          <a href="/#" className="mb-4 inline-flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-white shadow-md shadow-black/20">
              <FaShoppingBag aria-hidden="true" className="text-xl" />
            </span>
            <span className="text-xl font-bold text-white">
              Nexa<span className="text-primary">Store</span>
            </span>
          </a>
          <p className="text-sm leading-6">
            Find the little things that make everyday life better. Thoughtful
            picks, a smooth shopping experience, and something for everyone.
          </p>
          <div className="mt-5 flex items-center gap-3">
            {[
              {
                label: "Instagram",
                Icon: FaInstagram,
                href: "https://instagram.com",
              },
              {
                label: "Facebook",
                Icon: FaFacebookF,
                href: "https://facebook.com",
              },
              {
                label: "Twitter",
                Icon: FaTwitter,
                href: "https://twitter.com",
              },
            ].map(({ label, Icon, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 transition-colors hover:border-primary hover:bg-primary hover:text-white"
              >
                <Icon aria-hidden="true" className="text-sm" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">
            Explore
          </h2>
          <ul className="space-y-3">
            {FooterLinks.map((item) => (
              <li key={item.title}>
                <a
                  href={item.link}
                  className="text-sm transition-colors hover:text-primary"
                >
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">
            Need a hand?
          </h2>
          <p className="mb-4 max-w-xs text-sm leading-6">
            Questions about an order or product? We’re here to help.
          </p>
          <a
            href="mailto:hello@nexastore.com"
            className="text-sm font-semibold text-primary transition-colors hover:text-secondary"
          >
            hello@nexastore.com
          </a>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container mx-auto flex flex-col gap-2 py-5 text-xs text-gray-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} NexaStore. All rights reserved.</p>
          <p>Made for your everyday finds.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
