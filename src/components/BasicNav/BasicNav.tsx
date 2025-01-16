import Image from "next/image";
import Link from "next/link";

const BasicNav = () => {
  const user = false;
  return (
    <nav
      className="px-24 py-5 bg-gradient-to-b from-neutral-900 flex items-center 
    justify-between"
    >
      <Image height={60} width={120} src="/logo.png" alt="logo" />
      <div className="flex items-center justify-center gap-3">
        <select
          name=""
          id=""
          className="text-white w-auto min-w-fit rounded-md m-3 py-2 px-4 
            bg-transparent border border-solid border-zinc-600 focus:outline-none"
        >
          <option value="">English</option>
          <option value="">Other</option>
        </select>
        {user ? (
          <Link
            href="auth"
            className="bg-red-600 px-4 py-2 text-white 
                        rounded-md w-full hover:bg-red-700 transition"
          >
            Sign In
          </Link>
        ) : (
          <button
            className="bg-red-600 px-4 py-2 text-white 
            rounded-md w-full hover:bg-red-700 transition"
          >
            Sign Out
          </button>
        )}
      </div>
    </nav>
  );
};

export default BasicNav;
