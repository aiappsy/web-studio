
import './globals.css';

export const metadata = {
  title: 'WebStudio',
  description: 'AI Builder SaaS',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
