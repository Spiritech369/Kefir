import { describe, expect, it } from "vitest";

import { faqs } from "../../src/data/faqs";
import { products } from "../../src/data/products";
import {
  createFaqJsonLd,
  createProductJsonLd,
  serializeJsonLd,
} from "../../src/lib/structured-data";

describe("structured data", () => {
  it("maps every published FAQ without changing its answer", () => {
    const data = createFaqJsonLd(faqs);
    const entities = data.mainEntity as Array<{
      name: string;
      acceptedAnswer: { text: string };
    }>;

    expect(entities).toHaveLength(faqs.length);
    expect(entities[0]?.name).toBe(faqs[0].question);
    expect(entities[0]?.acceptedAnswer.text).toBe(faqs[0].answer);
  });

  it("does not expose demo prices as real search-engine offers", () => {
    const data = createProductJsonLd(products[0]);
    expect(data.offers).toBeUndefined();
  });

  it("escapes script-closing input", () => {
    const serialized = serializeJsonLd({
      "@context": "https://schema.org",
      text: "</script><script>alert(1)</script>",
    });

    expect(serialized).not.toContain("<");
    expect(serialized).toContain("\\u003c/script>");
  });
});
