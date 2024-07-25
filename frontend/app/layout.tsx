import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from './layout/header'
import Footer from './layout/footer'
import StoreProvider from './StoreProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Car details',
  description: '',
}

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>): React.ReactElement => {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <StoreProvider>
          <Header />
          <main>
            {children}
          </main>
          <Footer />
        </StoreProvider>
      </body>
    </html>
  )
}

export default RootLayout
