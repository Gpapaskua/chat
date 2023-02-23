import { useCurrentUser } from "@/features/user/hooks";

const Header = () => {
  const { user } = useCurrentUser();
  const { firstName = "", lastName = "" } = user || {};
  return (
    <div className="w-full h-16 bg-white flex items-center justify-between px-12 border-b border-gray">
      <div>
        <img
          className="w-[160px] object-cover"
          src="https://download.logo.wine/logo/WeChat/WeChat-Logo.wine.png"
        />
      </div>
      <div className="flex items-center gap-2">
        <p>{`${firstName} ${lastName}`}</p>
        <button
          type="button"
          id="dropdownDefault"
          data-dropdown-toggle="dropdown"
          className="cursor-pointer"
        >
          <img
            alt="user"
            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
            className="w-12 h-12 rounded-xl"
          />
        </button>
        <div
          id="dropdown"
          className="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700"
        >
          <ul
            className="py-1 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownDefault"
          >
            <li>
              <a
                href="#"
                className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Dashboard
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
