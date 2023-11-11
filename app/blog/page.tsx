async function getBlogData() {
  const req = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/blog?secret=${process.env.API_SECRET_KEY}`,
    { next: { revalidate: 3600 } }
  );
  const posts = req.json();
  return posts;
}
export default async function Blog() {
  const { posts } = await getBlogData();

  return <></>;
}
