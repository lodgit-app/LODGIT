import { z } from "zod";

/* ---------- Status values (from the database plan) ---------- */

export const listingStatus = z.enum(["draft", "published"]);
export const listingType = z.enum(["home"]);
export const bookingStatus = z.enum([
  "awaiting_payment",
  "confirmed",
  "cancelled",
  "expired",
  "completed",
]);
export const paymentStatus = z.enum(["waiting", "held", "charged", "released", "refunded"]);

/* ---------- Building blocks used in every drawer ---------- */

const id = z.uuid();                                // a unique ID, made by the database
const timestamp = z.iso.datetime({ offset: true }); // a moment in time, saved in UTC
const day = z.iso.date();                           // a calendar date, like "2026-11-14"
const pence = z.number().int().nonnegative();       // money: a whole number, never negative

/* ---------- 1. People ---------- */

export const profileSchema = z.object({
  id,
  full_name: z.string().min(1).max(100),
  avatar_url: z.url().nullable(),
  bio: z.string().max(500).nullable(),
  is_host: z.boolean(),
  created_at: timestamp,
});

/* ---------- 2. Places ---------- */

export const listingSchema = z.object({
  id,
  host_id: id,
  title: z.string().min(5).max(100),
  description: z.string().max(5000),
  listing_type: listingType,
  price_per_night: pence.positive(),
  cleaning_fee: pence,
  max_guests: z.number().int().min(1).max(16),
  bedrooms: z.number().int().min(0),
  beds: z.number().int().min(1),
  bathrooms: z.number().int().min(0),
  amenities: z.array(z.string()),
  address: z.string().min(1),
  city: z.string().min(1),
  location: z.object({
    lat: z.number().min(-90).max(90),
    lng: z.number().min(-180).max(180),
  }),
  status: listingStatus,
  created_at: timestamp,
});

/* ---------- 3. Place photos ---------- */

export const listingPhotoSchema = z.object({
  id,
  listing_id: id,
  url: z.url(),
  position: z.number().int().min(1), // 1 is the cover photo
  created_at: timestamp,
});

/* ---------- 4. Blocked dates ---------- */

export const blockedDatesSchema = z
  .object({
    id,
    listing_id: id,
    start_date: day,
    end_date: day,
    reason: z.string().max(200).nullable(),
    created_at: timestamp,
  })
  .refine((b) => b.end_date >= b.start_date, {
    message: "The end date can't be before the start date",
    path: ["end_date"],
  });

/* ---------- 5. Bookings ---------- */

export const bookingSchema = z
  .object({
    id,
    listing_id: id,
    guest_id: id, // the organiser
    check_in: day,
    check_out: day,
    guest_count: z.number().int().min(1),
    total_price: pence,
    payer_count: z.number().int().min(1), // 1 for solo bookings
    status: bookingStatus,
    payment_deadline: timestamp.nullable(),
    created_at: timestamp,
  })
  .refine((b) => b.check_out > b.check_in, {
    message: "Check-out must be after check-in",
    path: ["check_out"],
  });

/* ---------- 6. Payments ---------- */

export const paymentSchema = z.object({
  id,
  booking_id: id,
  amount: pence,
  pay_code: z.string().min(8), // the code in the payment link
  payer_name: z.string().max(100).nullable(),
  payer_email: z.email().nullable(),
  status: paymentStatus,
  paid_at: timestamp.nullable(),
  created_at: timestamp,
});

/* ---------- 7. Chats ---------- */

export const conversationSchema = z.object({
  id,
  listing_id: id,
  guest_id: id,
  host_id: id,
  created_at: timestamp,
});

/* ---------- 8. Messages ---------- */

export const messageSchema = z.object({
  id,
  conversation_id: id,
  sender_id: id,
  body: z.string().min(1).max(2000),
  created_at: timestamp,
});

/* ---------- 9. Reviews ---------- */

export const reviewSchema = z.object({
  id,
  booking_id: id,
  listing_id: id,
  author_id: id,
  rating: z.number().int().min(1).max(5),
  comment: z.string().max(2000).nullable(),
  created_at: timestamp,
});

/* ---------- Types for TypeScript (made automatically from the shapes above) ---------- */

export type ListingStatus = z.infer<typeof listingStatus>;
export type BookingStatus = z.infer<typeof bookingStatus>;
export type PaymentStatus = z.infer<typeof paymentStatus>;

export type Profile = z.infer<typeof profileSchema>;
export type Listing = z.infer<typeof listingSchema>;
export type ListingPhoto = z.infer<typeof listingPhotoSchema>;
export type BlockedDates = z.infer<typeof blockedDatesSchema>;
export type Booking = z.infer<typeof bookingSchema>;
export type Payment = z.infer<typeof paymentSchema>;
export type Conversation = z.infer<typeof conversationSchema>;
export type Message = z.infer<typeof messageSchema>;
export type Review = z.infer<typeof reviewSchema>;