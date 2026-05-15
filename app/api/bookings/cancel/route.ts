import { NextResponse } from "next/server";
import {
  buildCancellationWhatsAppHref,
  cancelBooking,
  findBookingForCancellation,
} from "@/lib/booking-store";
import type { BookingResponse } from "@/lib/booking-types";
import { createBookingIcs, createCancellationIcs } from "@/lib/calendar";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const bookingId = url.searchParams.get("bookingId");
    const emailOrToken = url.searchParams.get("emailOrToken");

    if (!bookingId || !emailOrToken) {
      throw new Error("Bitte Buchungsnummer und E-Mail oder Stornocode eingeben.");
    }

    const booking = findBookingForCancellation(bookingId, emailOrToken);

    return NextResponse.json({ booking });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Die Buchung konnte nicht gefunden werden." },
      { status: 400 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as {
      bookingId?: string;
      emailOrToken?: string;
    };

    if (!payload.bookingId || !payload.emailOrToken) {
      throw new Error("Bitte Buchungsnummer und E-Mail oder Stornocode eingeben.");
    }

    const booking = cancelBooking(payload.bookingId, payload.emailOrToken);
    const response: BookingResponse = {
      booking,
      calendar: createBookingIcs(booking),
      cancellationCalendar: createCancellationIcs(booking),
      whatsappHref: buildCancellationWhatsAppHref(booking),
      cancellationHref: "",
    };

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Der Termin konnte nicht storniert werden." },
      { status: 400 },
    );
  }
}
