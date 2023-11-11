import { getPost } from "@/app/lib/getPost";
import { Post, Section } from "@/app/types";
import ScrollTo from "./ScrollTo";
import { polishToEnglish } from "@/app/utils/polishToEnglish";
import { renderMarkdown } from "@/app/lib/parseMarkdown";
import Link from "next/link";
import Footer from "@/app/components/Footer";
export async function generateStaticParams() {
  const { posts } = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/blog?secret=${process.env.API_SECRET_KEY}`
  ).then((res) => res.json());

  return posts.posts.map((post: Post) => ({ slug: post.url }));
}

export default async function Page({ params }: { params: any }) {
  const { post }: { post: Post } = await getPost(params.slug);

  if (post)
    return (
      <>
        {" "}
        <div className={`w-full px-3 lg:px-[8vw] bg-white pt-12`}>
          <Link
            href="/blog"
            className="w-full text-center text-3xl lg:text-4xl lg:w-max mx-auto lg:mx-0 italic bg-white text-black p-4 px-8 lg:rounded-lg shadow-md shadow-zinc-700 font-coco font-bold my-12"
          ></Link>
          <div className="grid grid-cols-1 lg:grid-cols-2 w-full font-coco mt-12">
            {/* 1 */}
            <div className="flex flex-col h-full">
              <div className="prose 2xl:prose-xl prose-invert">
                <h1 className="!text-3xl lg:!text-4xl 2xl:!text-5xl mx-auto font-bold text-green-300">
                  {post.title}
                </h1>
                <h4
                  className="pb-12 font-light"
                  dangerouslySetInnerHTML={renderMarkdown(post.intro)}
                ></h4>
                {post.sections.length > 0 && (
                  <h4 className="text-white italic drop-shadow-lg shadow-black">
                    Spis treści
                  </h4>
                )}
                <div className="flex flex-col mb-6">
                  {post.sections.map((section: Section, idx) => (
                    <h4 key={idx} className="relative h-12">
                      <ScrollTo section={section} />
                    </h4>
                  ))}
                </div>
                {post.sections.map((section: Section, idx) => (
                  <div id={`${polishToEnglish(section.title)}`} key={idx}>
                    <h3 key={idx} className="text-green-300">
                      {section.title}
                    </h3>

                    <p
                      dangerouslySetInnerHTML={renderMarkdown(section.content)}
                    />
                  </div>
                ))}
                <h4 className="w-full shadow-black font-light">{post.outro}</h4>
              </div>
            </div>
            {/* 2 */}
            <div className="flex flex-col h-full w-full items-end">
              <div className="lg:w-3/4 h-full"></div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
}

export async function generateMetadata({ params }: { params: any }) {
  // fetch data
  const { post } = await getPost(params.slug);
  const faqQuestions = post?.faq?.map(
    (item: { question: string; answer: string }) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })
  );
  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqQuestions,
  };
  const title = `${post.metaTitle} DeadlyBeatz`;
  const description = `${post.metaDescription} DeadlyBeatz`;
  if (post)
    return {
      title: title,
      description: description,
      openGraph: {
        type: "website",
        url: "https://DeadlyBeatz.com",
        title,
        description,
        siteName: "DeadlyBeatz",
        icons: [
          {
            url: "/favicon.ico",
          },
        ],

        schema: [faqPage],
        meta: [
          {
            name: "theme-color",
            content: "white", // replace with your desired theme color
          },
        ],
      },
    };
}
