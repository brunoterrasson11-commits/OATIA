import './globals.css';
import Sidebar from '@/components/Sidebar';

export const metadata = {
  title: 'THÉMIS – Outil d\'Analyse Territoriale Intégrée pour l\'Enseignement Agricole',
  description: 'Cartographie · Analyse de données · Intelligence Artificielle',
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          crossOrigin=""
        />
      </head>
      <body className="bg-slate-950 text-slate-100 min-h-screen">
        <Sidebar />
        <main className="ml-64 min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
