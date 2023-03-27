import './globals.css';

export const metadata = {
  title: 'Cal App',
  description: 'Calorie, Water, Exercise Tracker',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  );
}
