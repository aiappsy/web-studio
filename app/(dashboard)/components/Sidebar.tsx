
export default function Sidebar() {
  return (
    <div className="w-64 bg-white border-r p-4 hidden md:block">
      <h2 className="font-bold text-xl mb-4">WebStudio</h2>
      <nav className="space-y-2">
        <a href="/projects" className="block">Projects</a>
        <a href="/settings" className="block">Settings</a>
      </nav>
    </div>
  );
}
