type DayConfig = {
  opens: string;
  closes: string;
};

const openingHoursByDay: Record<number, DayConfig | null> = {
  0: null,
  1: { opens: "07:00", closes: "19:00" },
  2: { opens: "07:00", closes: "19:00" },
  3: { opens: "07:00", closes: "19:00" },
  4: { opens: "07:00", closes: "19:00" },
  5: { opens: "07:00", closes: "19:00" },
  6: { opens: "08:00", closes: "17:00" },
};

export type BookableDay = {
  date: string;
  label: string;
  shortLabel: string;
  openingLabel: string;
};

export type TimeSlot = {
  startTime: string;
  endTime: string;
};

const slotStepMinutes = 15;

export function toDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function addMinutesToTime(time: string, minutesToAdd: number) {
  const [hours, minutes] = time.split(":").map(Number);
  const total = hours * 60 + minutes + minutesToAdd;
  const nextHours = Math.floor(total / 60);
  const nextMinutes = total % 60;
  return `${String(nextHours).padStart(2, "0")}:${String(nextMinutes).padStart(2, "0")}`;
}

function timeToMinutes(time: string) {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

function dateTimeFromParts(date: string, time: string) {
  return new Date(`${date}T${time}:00`);
}

export function getBookableDays(count = 14, from = new Date()): BookableDay[] {
  const days: BookableDay[] = [];
  const cursor = new Date(from);
  cursor.setHours(0, 0, 0, 0);

  while (days.length < count) {
    const config = openingHoursByDay[cursor.getDay()];

    if (config) {
      const date = toDateKey(cursor);
      const label = new Intl.DateTimeFormat("de-CH", {
        weekday: "long",
        day: "2-digit",
        month: "2-digit",
      }).format(cursor);
      const shortLabel = new Intl.DateTimeFormat("de-CH", {
        weekday: "short",
        day: "2-digit",
        month: "2-digit",
      }).format(cursor);

      days.push({
        date,
        label,
        shortLabel,
        openingLabel: `${config.opens}-${config.closes}`,
      });
    }

    cursor.setDate(cursor.getDate() + 1);
  }

  return days;
}

export function getTimeSlotsForDate(
  date: string,
  durationMinutes: number,
  now = new Date(),
): TimeSlot[] {
  const parsedDate = new Date(`${date}T00:00:00`);
  const config = openingHoursByDay[parsedDate.getDay()];

  if (!config) {
    return [];
  }

  const slots: TimeSlot[] = [];
  const closeMinutes = timeToMinutes(config.closes);
  let cursorMinutes = timeToMinutes(config.opens);

  while (cursorMinutes + durationMinutes <= closeMinutes) {
    const startTime = `${String(Math.floor(cursorMinutes / 60)).padStart(2, "0")}:${String(
      cursorMinutes % 60,
    ).padStart(2, "0")}`;
    const endTime = addMinutesToTime(startTime, durationMinutes);
    const startDateTime = dateTimeFromParts(date, startTime);

    if (startDateTime > now) {
      slots.push({ startTime, endTime });
    }

    cursorMinutes += slotStepMinutes;
  }

  return slots;
}

export function formatBookingDate(date: string) {
  return new Intl.DateTimeFormat("de-CH", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(`${date}T12:00:00`));
}
