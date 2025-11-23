import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'Thinesh - Tech Blog' ,
    template: '%s | My tech blog'
  },
  description: 'A personal blog sharing thoughts, ideas, and stories about technology, life, and everything in between.',
  keywords: ['blog', 'DevOPs', 'technology', 'web development', 'programming', "python", "Deep Learning", "Machine Learning", "AI", "Cloud Computing", "pytorch", "kubernetes", "docker", "aws", ],
  authors: [{ name: 'Thinesh C V' }],
  creator: 'Thinesh C V',
  publisher: 'Thinesh C V',
  formatDetection: {
    email: true,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'Thinesh- Tech Blog',
    title: 'Thoughts, Ideas, and Stories',
    description: 'A personal blog sharing thoughts, ideas, and stories about technology, life, and everything in between.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Personal Blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Personal Blog - Thoughts, Ideas, and Stories',
    description: 'A personal blog sharing thoughts, ideas, and stories about technology, life, and everything in between.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add your verification codes here
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // bing: 'your-bing-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-theme="dark">
      <head>
        <link rel="canonical" href={process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'} />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (!theme) {
                    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                    theme = prefersDark ? 'dark' : 'light';
                  }
                  document.documentElement.setAttribute('data-theme', theme);
                } catch (e) {
                  document.documentElement.setAttribute('data-theme', 'dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}

