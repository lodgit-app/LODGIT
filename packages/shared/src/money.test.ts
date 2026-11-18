import { describe, expect, it } from "vitest";
import { bookingTotal, formatPence, splitEqually } from "./money";

describe("formatPence", () => {
  it("shows pence as pounds", () => {
    expect(formatPence(12000)).toBe("£120.00");
    expect(formatPence(3334)).toBe("£33.34");
  });
});

describe("bookingTotal", () => {
  it("adds nights and the cleaning fee", () => {
    // 3 nights at £120 plus a £30 cleaning fee = £390
    expect(bookingTotal(12000, 3, 3000)).toBe(39000);
  });

  it("refuses a stay of 0 nights", () => {
    expect(() => bookingTotal(12000, 0, 3000)).toThrow();
  });
});

describe("splitEqually", () => {
  it("gives the organiser the leftover penny", () => {
    expect(splitEqually(10000, 3)).toEqual([3334, 3333, 3333]);
  });

  it("splits evenly when it divides exactly", () => {
    expect(splitEqually(12000, 4)).toEqual([3000, 3000, 3000, 3000]);
  });

  it("gives everything to one payer for solo bookings", () => {
    expect(splitEqually(39000, 1)).toEqual([39000]);
  });

  it("always adds back up to the total", () => {
    const shares = splitEqually(10001, 7);
    const sum = shares.reduce((a, b) => a + b, 0);
    expect(sum).toBe(10001);
  });

  it("refuses 0 payers", () => {
    expect(() => splitEqually(10000, 0)).toThrow();
  });

  it("refuses amounts that are not whole pence", () => {
    expect(() => splitEqually(100.5, 2)).toThrow();
  });
});