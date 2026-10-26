export type SearchCriteria = {
  location: string;
  property: string;
  beds: string;
  baths: string;
  minPrice: number | null;
  maxPrice: number | null;
  sort: string;
};

const ANY = "Any Number";

const SORT_PHRASES: Record<string, string> = {
  Newest: "newest first",
  Oldest: "oldest first",
  "Least Expensive to Most": "lowest price first",
  "Most Expensive to Least": "highest price first",
  "Bedrooms (Low to High)": "fewest bedrooms first",
  "Bedrooms (High to Low)": "most bedrooms first",
  "Bathrooms (Low to High)": "fewest bathrooms first",
  "Bathrooms (High to Low)": "most bathrooms first",
};

export function formatPrice(value: number) {
  if (value >= 1_000_000) {
    const millions = value / 1_000_000;
    return `$${Number.isInteger(millions) ? millions : millions.toFixed(1)}M`;
  }
  return `$${Math.round(value / 1000)}k`;
}

export function priceError(minPrice: number | null, maxPrice: number | null) {
  if (minPrice !== null && maxPrice !== null && minPrice > maxPrice) {
    return "Min price needs to be lower than max price.";
  }
  return null;
}

function priceRange(minPrice: number | null, maxPrice: number | null) {
  if (minPrice !== null && maxPrice !== null) return `between ${formatPrice(minPrice)} and ${formatPrice(maxPrice)}`;
  if (minPrice !== null) return `from ${formatPrice(minPrice)}`;
  if (maxPrice !== null) return `up to ${formatPrice(maxPrice)}`;
  return null;
}

function joinList(items: string[]) {
  if (items.length <= 1) return items.join("");
  return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}

export function composeSearchInquiry(criteria: SearchCriteria) {
  const details: string[] = [];
  if (criteria.beds === "Studio") details.push("a studio layout");
  else if (criteria.beds !== ANY) details.push(`${criteria.beds} bedrooms`);
  if (criteria.baths !== ANY) details.push(`${criteria.baths} baths`);

  const location = criteria.location.trim() || "Pahrump, NV";
  let message = `Hi Marci, I'm looking for ${criteria.property} in ${location}`;
  if (details.length) message += ` with ${joinList(details)}`;
  const range = priceRange(criteria.minPrice, criteria.maxPrice);
  if (range) message += `, priced ${range}`;
  message += `. Could you send me listings that match, ${SORT_PHRASES[criteria.sort] ?? "newest first"}?`;
  return message;
}

export function composeLenderInquiry(price: number, downPaymentPercent: number, years: number) {
  return `Hi Marci, I'm budgeting for a home around ${formatPrice(price)} with ${downPaymentPercent}% down on a ${years}-year loan. Could you connect me with a lender you trust?`;
}
