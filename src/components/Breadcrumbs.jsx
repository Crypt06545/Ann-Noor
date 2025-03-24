import { Link, useLocation } from "react-router-dom";

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <nav className="text-gray-600 text-sm">
      <ul className="flex space-x-2">
        <li>
          <Link to="/" className="text-gray-400 hover:underline text-xl">
            Home
          </Link>
        </li>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;

          return (
            <li key={to} className="flex items-center">
              <span className="mx-2 text-xl">/</span>
              {isLast ? (
                <span className="text-gray-400 text-xl">{value}</span>
              ) : (
                <Link to={to} className="text-gray-400 text-xl hover:underline">
                  {value}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Breadcrumbs;
