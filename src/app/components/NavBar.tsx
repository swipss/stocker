import Search from "./Search";

export default function NavBar() {
  return (
    <nav className="w-full h-20 bg-white border-b">
      <div className="flex items-center justify-between h-full max-w-6xl px-4 m-auto lg:px-0">
        <h1 className="text-2xl font-bold text-slate-900">Stocker</h1>
        <Search />
      </div>
    </nav>
  );
}
