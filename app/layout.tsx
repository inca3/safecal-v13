import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

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
      <body className='bg-lightSkinLighter font-poppins'>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
