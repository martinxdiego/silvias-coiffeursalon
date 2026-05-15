import { NextResponse } from "next/server";
import { siteConfig } from "@/data/site";
import { createBooking, buildBookingWhatsAppHref } from "@/lib/booking-store";
import type { BookingRequest, BookingResponse } from "@/lib/booking-types";
import { createBookingIcs } from "@/lib/calendar";

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as BookingRequest;
    const booking = createBooking(payload);
    const cancellationHref = `${siteConfig.cancellationPath}?id=${booking.id}&token=${booking.cancellationToken}`;
    const response: BookingResponse = {
      booking,
      calendar: createBookingIcs(booking),
      whatsappHref: buildBookingWhatsAppHref(booking),
      cancellationHref,
    };

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Die Buchung konnte nicht gespeichert werden." },
      { status: 400 },
    );
  }
}
