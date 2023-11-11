import About from "./components/About";

import PageContent from "./components/PageContent";

export default async function HomePage() {
  return (
    <div className="">
      <PageContent />
      <About />
    </div>
  );
}
