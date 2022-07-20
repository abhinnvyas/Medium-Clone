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
        <div
          className="hidden md:inline-flex 
        items-center space-x-5"
        >
          <h3>About</h3>
          <h3>Contact</h3>
          <h3
            className="text-white bg-green-600
          py-1 px-4 rounded-full"
          >
            Follow
          </h3>
        </div>
      </div>
      <div
        className="flex space-x-5 items-center
      text-green-600"
      >
        <h1>Sign in</h1>
        <h1 className="border px-4 py-1 border-green-600 rounded-full">
          Get Started
        </h1>
      </div>
    </header>
  );
}

export default Header;
