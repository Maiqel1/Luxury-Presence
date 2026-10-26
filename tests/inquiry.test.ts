import { describe, expect, it } from "vitest";
import { composeLenderInquiry, composeSearchInquiry, formatPrice, priceError, type SearchCriteria } from "@/lib/inquiry";

const base: SearchCriteria = {
  location: "Pahrump, NV",
  property: "a home",
  beds: "Any Number",
  baths: "Any Number",
  minPrice: null,
  maxPrice: null,
  sort: "Newest",
};

describe("composeSearchInquiry", () => {
  it("writes a plain request when no filters are set", () => {
    expect(composeSearchInquiry(base)).toBe(
      "Hi Marci, I'm looking for a home in Pahrump, NV. Could you send me listings that match, newest first?",
    );
  });

  it("includes rooms, price range and sort order", () => {
    expect(
      composeSearchInquiry({
        ...base,
        property: "a single-family home",
        beds: "3+",
        baths: "2+",
        minPrice: 300_000,
        maxPrice: 1_500_000,
        sort: "Least Expensive to Most",
      }),
    ).toBe(
      "Hi Marci, I'm looking for a single-family home in Pahrump, NV with 3+ bedrooms and 2+ baths, priced between $300k and $1.5M. Could you send me listings that match, lowest price first?",
    );
  });

  it("handles studios, open-ended prices and a blank location", () => {
    expect(composeSearchInquiry({ ...base, location: "  ", beds: "Studio", maxPrice: 250_000 })).toBe(
      "Hi Marci, I'm looking for a home in Pahrump, NV with a studio layout, priced up to $250k. Could you send me listings that match, newest first?",
    );
    expect(composeSearchInquiry({ ...base, minPrice: 2_000_000 })).toContain("priced from $2M.");
  });
});

describe("priceError", () => {
  it("flags a min above the max", () => {
    expect(priceError(500_000, 300_000)).not.toBeNull();
    expect(priceError(300_000, 500_000)).toBeNull();
    expect(priceError(null, 300_000)).toBeNull();
  });
});

describe("formatPrice", () => {
  it("abbreviates thousands and millions", () => {
    expect(formatPrice(450_000)).toBe("$450k");
    expect(formatPrice(1_000_000)).toBe("$1M");
    expect(formatPrice(1_250_000)).toBe("$1.3M");
  });
});

describe("composeLenderInquiry", () => {
  it("summarises the estimate", () => {
    expect(composeLenderInquiry(400_000, 20, 30)).toBe(
      "Hi Marci, I'm budgeting for a home around $400k with 20% down on a 30-year loan. Could you connect me with a lender you trust?",
    );
  });
});
