import { describe, expect, it } from "vitest";
import { loanAmount, monthlyPayment } from "@/lib/mortgage";

describe("monthlyPayment", () => {
  it("matches the standard amortization formula", () => {
    expect(monthlyPayment(320_000, 6.5, 30)).toBeCloseTo(2022.62, 1);
    expect(monthlyPayment(200_000, 5, 15)).toBeCloseTo(1581.59, 1);
  });

  it("splits the loan evenly at a zero rate", () => {
    expect(monthlyPayment(360_000, 0, 30)).toBe(1000);
  });

  it("returns zero when nothing is borrowed", () => {
    expect(monthlyPayment(0, 6.5, 30)).toBe(0);
  });
});

describe("loanAmount", () => {
  it("subtracts the down payment", () => {
    expect(loanAmount(400_000, 20)).toBe(320_000);
    expect(loanAmount(400_000, 100)).toBe(0);
  });
});
