import "./globals.css";

export const metadata = {
  title: "Happy Birthday Mr.J!",
  description: "A celebration of our love",
  // Google verification meta-г энд оруулж болно
  verification: {
    google: "F8zqgEe9L90EtXC2h7iQuCHOUO97ADKa8ACQNIb0TfQ",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Search Console verification */}
        <meta
          name="google-site-verification"
          content="F8zqgEe9L90EtXC2h7iQuCHOUO97ADKa8ACQNIb0TfQ"
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
