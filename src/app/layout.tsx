import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })
const poppins = Poppins({ weight: ['400', '600', '700'], subsets: ['latin'] })

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#F0F0F0] text-[#333333]`}>
      <header className="bg-[#1F77B4] text-white p-4">
        <h1 className={`${poppins.className} text-2xl font-bold`}><Link href='/'>Hackathon Reviews Dashboard</Link></h1>
        </header>
        <main className="container mx-auto p-4">
          {children}
        </main>
        <footer className="bg-[#333333] text-white p-4 text-center">
          <p>&copy; 2025 Hackathon Reviews. All rights reserved.</p>
        </footer>
      </body>
    </html>
  )
}

