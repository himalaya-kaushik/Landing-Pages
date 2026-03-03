export const metadata = {
  title: "Falcon Restaurant – Admin Studio",
  robots: { index: false, follow: false },
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Use the root layout's <html> and <body> to avoid hydration mismatch.
  return children;
}
