import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>My Portfolio</h1>
      <Link href="/me">Visit Merch Store</Link>
    </main>
  );
}