import { ChevronDown, MessageCircle } from "lucide-react";

import { faqContent } from "@/src/data/content";
import { faqs } from "@/src/data/faqs";

const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export function FaqSection() {
  return (
    <section
      id="preguntas-frecuentes"
      aria-labelledby="faq-title"
      className="scroll-mt-28 bg-white py-20 sm:py-24"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqStructuredData).replace(/</g, "\\u003c"),
        }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
          <div className="max-w-lg lg:sticky lg:top-32 lg:self-start">
            <p className="text-sm font-semibold tracking-[0.16em] text-[#4b705b] uppercase">
              {faqContent.eyebrow}
            </p>
            <h2
              id="faq-title"
              className="mt-3 text-3xl font-semibold tracking-tight text-[#183c2d] sm:text-4xl lg:text-5xl"
            >
              {faqContent.title}
            </h2>
            <p className="mt-5 text-base leading-7 text-[#56685f] sm:text-lg">
              {faqContent.description}
            </p>
            <div className="mt-8 flex items-start gap-3 rounded-2xl bg-[#eaf1e7] p-5 text-[#284f3d]">
              <MessageCircle
                aria-hidden="true"
                className="mt-0.5 size-5 shrink-0"
              />
              <p className="text-sm leading-6">{faqContent.footer}</p>
            </div>
          </div>

          <div className="divide-y divide-[#dfe6de] border-y border-[#dfe6de]">
            {faqs.map((faq, index) => {
              const answerId = `respuesta-faq-${index + 1}`;

              return (
                <details key={faq.question} className="group">
                  <summary
                    aria-controls={answerId}
                    className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-left font-semibold text-[#244434] outline-none transition-colors marker:content-none hover:text-[#2f684a] focus-visible:rounded-xl focus-visible:ring-2 focus-visible:ring-[#356f50] focus-visible:ring-offset-4 motion-reduce:transition-none [&::-webkit-details-marker]:hidden"
                  >
                    <span className="pr-2 text-base leading-6 sm:text-lg">
                      {faq.question}
                    </span>
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#edf3ea] text-[#2d6046]">
                      <ChevronDown
                        aria-hidden="true"
                        className="size-5 transition-transform duration-200 group-open:rotate-180 motion-reduce:transition-none"
                      />
                    </span>
                  </summary>
                  <div
                    id={answerId}
                    className="max-w-3xl pb-6 pr-12 leading-7 text-[#5a6a62]"
                  >
                    <p>{faq.answer}</p>
                  </div>
                </details>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
