"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";
import { FAQS, generateWhatsAppLink } from "@/data/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

export function FaqSection() {
  return (
    <section id="faq" className="relative py-24 md:py-32">
      <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            align="left"
            eyebrow="FAQ"
            title={<>Pertanyaan yang <span className="text-gradient">sering ditanyakan.</span></>}
            description="Masih ragu? Wajar. Berikut jawaban jujur untuk pertanyaan yang paling sering muncul sebelum kerja sama dimulai."
            className="mb-8 md:mb-8"
          />
          <Reveal>
            <a
              href={generateWhatsAppLink("Halo, saya punya pertanyaan seputar pembuatan website.")}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex min-h-11 items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-3 pr-5 transition-colors hover:border-status/40"
            >
              <span className="grid size-10 place-items-center rounded-xl bg-status/15 text-status">
                <WhatsAppIcon className="size-5" />
              </span>
              <span>
                <span className="block text-sm font-semibold text-alabaster">Pertanyaan lain?</span>
                <span className="block text-xs text-zinc-500">Tanya langsung, dibalas &lt; 15 menit</span>
              </span>
            </a>
          </Reveal>
        </div>

        <Reveal>
          <Accordion.Root type="single" collapsible defaultValue="faq-0" className="flex flex-col gap-3">
            {FAQS.map((f, i) => (
              <Accordion.Item
                key={f.question}
                value={`faq-${i}`}
                className="group overflow-hidden rounded-2xl border border-white/[0.07] bg-surface/60 transition-colors duration-300 data-[state=open]:border-accent/30 data-[state=open]:bg-accent/[0.04] hover:border-white/[0.16]"
              >
                <Accordion.Header>
                  <Accordion.Trigger className="flex min-h-14 w-full items-center justify-between gap-4 px-5 py-4 text-left text-[15px] font-semibold text-alabaster md:px-6 md:text-base">
                    {f.question}
                    <span className="grid size-8 shrink-0 place-items-center rounded-full border border-white/10 bg-white/[0.03] transition-all duration-300 group-data-[state=open]:rotate-45 group-data-[state=open]:border-accent/40 group-data-[state=open]:bg-accent/20">
                      <Plus className="size-4" aria-hidden />
                    </span>
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="accordion-content">
                  <p className="px-5 pb-5 text-[14.5px] leading-relaxed text-muted md:px-6">{f.answer}</p>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </Reveal>
      </div>
    </section>
  );
}
