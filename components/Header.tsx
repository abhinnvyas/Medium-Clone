import Link from "next/link";

function Header() {
  return (
    <header
      className="flex items-center justify-between p-5
    max-w-5xl mx-auto"
    >
      <div className="flex items-center space-x-5">
        <Link href="/">
          <img
            className="w-44 object-contain cursor-pointer"
            src="https://links.papareact.com/yvf"
            alt=""
          />
        </Link>
      </div>
      <div className="flex space-x-5 items-center">
        <div
          className="hidden md:inline-flex 
        items-center space-x-5 cursor-pointer text-black"
        >
          <h3 className="cursor-pointer">About</h3>
          <h3 className="cursor-pointer">Contact</h3>
          <h3 className="border px-4 py-1 border-black rounded-full cursor-pointer">
            Follow
          </h3>
        </div>
        <h1 className="hidden sm:inline-flex cursor-pointer">Sign in</h1>
        <h1 className="text-white bg-black py-1 px-4 rounded-full cursor-pointer">
          Get Started
        </h1>
      </div>
    </header>
  );
}

export default Header;
