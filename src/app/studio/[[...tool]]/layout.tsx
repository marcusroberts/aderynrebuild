export const metadata = {
  title: 'Aderyn CMS Studio',
  description: 'Content management for Aderyn Building Consultancy',
}

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>
        {children}
      </body>
    </html>
  )
}
