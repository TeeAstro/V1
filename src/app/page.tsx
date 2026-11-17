import { C2Hero } from "@/components/site/C2Hero";
import { C2Mark } from "@/components/site/C2Logo";
import { C2Newsletter } from "@/components/site/C2Newsletter";
import { C2Parallax } from "@/components/site/C2Parallax";
import { PieceCard } from "@/components/site/PieceCard";
import { ThobeFeature } from "@/components/site/ThobeFeature";
import { getProductByCategory } from "@/utils/catalog";

export default function HomePage() {
  const thobe = getProductByCategory("thobes");
  const shirt = getProductByCategory("shirts");
  const hat = getProductByCategory("hats");

  return (
    <>
      <C2Hero />

      <div className="pt-28 md:pt-48">
        <ThobeFeature product={thobe} />
      </div>

      {/* Shirt and hat */}
      <section className="c2-shell grid gap-x-6 gap-y-24 pt-32 md:pt-56 lg:grid-cols-12" aria-label="Shirts and hats">
        <PieceCard product={shirt} className="lg:col-span-5" sizes="(min-width: 1024px) 42vw, 100vw" />
        <PieceCard
          product={hat}
          className="lg:col-span-5 lg:col-start-8 lg:mt-56"
          sizes="(min-width: 1024px) 42vw, 100vw"
        />
      </section>

      {/* One full-width photograph */}
      <section className="mt-32 md:mt-56" aria-label="Athar">
        <C2Parallax
          src="/images/c2/story-horizon.jpg"
          alt="A man in a white thobe and shemagh, seen from behind, looking out over a quiet landscape"
          className="h-[70svh] min-h-[26rem] md:h-[92svh]"
        />
      </section>

      {/* Our story */}
      <section id="story" className="c2-shell scroll-mt-24 py-32 text-center md:py-56" aria-labelledby="c2-story">
        <C2Mark className="mx-auto w-28 text-maroon md:w-36" />
        <h2 id="c2-story" className="c2-caps mt-12 text-muted">
          Our story
        </h2>
        <p className="c2-h3 mx-auto mt-8 max-w-3xl">
          In Arabic, athar is what remains after someone has passed: a footprint in sand, a scent
          in a room, a good word remembered. We make clothing worthy of that idea.
        </p>
      </section>

      {/* Newsletter */}
      <section className="bg-parchment py-24 text-center md:py-36" aria-labelledby="c2-letters">
        <div className="c2-shell">
          <h2 id="c2-letters" className="c2-h2">
            Letters <span className="italic">from Athar</span>
          </h2>
          <p className="mx-auto mb-10 mt-6 max-w-md text-base text-muted">
            New colours and limited runs, before anyone else.
          </p>
          <C2Newsletter />
        </div>
      </section>
    </>
  );
}
