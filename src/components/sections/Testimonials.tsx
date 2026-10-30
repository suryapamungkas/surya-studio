import Image from "next/image";
import { Quote, Star } from "lucide-react";
import { TESTIMONIALS } from "@/data/content";
import { Marquee } from "@/components/ui/Marquee";
import { SectionHeading } from "@/components/ui/SectionHeading";

type Testimonial = (typeof TESTIMONIALS)[number];

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <figure className="mx-2.5 flex w-[320px] shrink-0 flex-col rounded-3xl border border-white/[0.08] bg-surface/80 p-6 transition-colors duration-300 hover:border-white/[0.18] sm:w-[400px]">
      <div className="flex items-center justify-between">
        <div className="flex gap-0.5" aria-label={`Rating ${t.rating} dari 5`}>
          {Array.from({ length: t.rating }).map((_, i) => (
            <Star key={i} className="size-4 fill-amber-400 text-amber-400" aria-hidden />
          ))}
        </div>
        <Quote className="size-6 text-white/10" aria-hidden />
      </div>
      <blockquote className="mt-4 flex-1 text-[14.5px] leading-relaxed text-zinc-300">&ldquo;{t.comment}&rdquo;</blockquote>
      <figcaption className="mt-6 flex items-center gap-3">
        <Image src={t.avatar} alt={t.name} width={44} height={44} className="size-11 rounded-full object-cover ring-1 ring-white/10" />
        <div className="min-w-0">
          <div className="text-sm font-semibold text-alabaster">{t.name}</div>
          <div className="truncate text-xs text-zinc-500">{t.role}</div>
        </div>
      </figcaption>
    </figure>
  );
}

export function Testimonials() {
  // Ulangi agar marquee cukup panjang di layar lebar
  const items = [...TESTIMONIALS, ...TESTIMONIALS];
  return (
    <section id="testimoni" className="relative py-24 md:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="Kata Klien"
          title={<>Dipercaya pemilik bisnis <span className="text-gradient">di seluruh Indonesia.</span></>}
        />
      </div>
      <Marquee duration={60} ariaLabel="Testimoni klien">
        {items.map((t, i) => (
          <TestimonialCard key={`${t.id}-${i}`} t={t} />
        ))}
      </Marquee>
    </section>
  );
}
