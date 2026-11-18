/**
 * Money helpers for LODGIT.
 * All money is stored in pence as whole numbers. £120.00 is 12000.
 */

export type Pence = number;

/** Turns pence into a readable price, like "£120.00". */
export function formatPence(amount: Pence): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(amount / 100);
}

/** Works out the full price of a stay: price per night × nights + cleaning fee. */
export function bookingTotal(pricePerNight: Pence, nights: number, cleaningFee: Pence): Pence {
  if (!Number.isInteger(nights) || nights < 1) {
    throw new Error("A stay must be at least 1 night");
  }
  return pricePerNight * nights + cleaningFee;
}

/**
 * Splits a total equally between payers.
 * The first share is the organiser's, and it covers any leftover pennies.
 * splitEqually(10000, 3) gives [3334, 3333, 3333].
 */
export function splitEqually(total: Pence, payers: number): Pence[] {
  if (!Number.isInteger(total) || total < 0) {
    throw new Error("The total must be a whole number of pence");
  }
  if (!Number.isInteger(payers) || payers < 1) {
    throw new Error("There must be at least 1 payer");
  }

  const share = Math.floor(total / payers);
  const leftover = total - share * payers;

  return Array.from({ length: payers }, (_, index) =>
    index === 0 ? share + leftover : share,
  );
}