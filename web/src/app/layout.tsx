import './globals.css'
import AuthContext from './context/AuthContext'
import ToasterContext from './context/ToasterContext'

export const metadata = {
  title: 'Git Hub CommitWatch',
  description: 'Automation to watch a repository Github',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className='bg-slate-700 w-screen h-full'>
        <AuthContext>
          <ToasterContext />
          {children}
        </AuthContext>
      </body>
    </html>
  )
}
