
'use client';
export default function Sidebar() {
  return (
    <aside className="w-64 border-r bg-white dark:bg-gray-900 p-4">
      <nav className="space-y-2">
        <a href="/projects" className="block">Projects</a>
        <a href="/settings" className="block">Settings</a>
      </nav>
    </aside>
  );
}
