
// export const metadata: Metadata = {
//   title: "Cart Tech",
//   description: "Cart Tech an E-Commerce Platform",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>)
{
  return (
    <div>
      <div className="py-15">
        {children}
      </div>
    </div>
  );
}
