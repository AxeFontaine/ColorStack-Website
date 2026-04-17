"use client";

import type { WeekDay, CalendarDisplayEvent, EventCardTheme } from "@/lib/calendar-types";

const PILL_THEME: Record<EventCardTheme, { dot: string; bg: string; text: string }> = {
  rose: { dot: "bg-rose-400", bg: "bg-rose-50", text: "text-rose-900" },
  sage: { dot: "bg-emerald-500", bg: "bg-emerald-50", text: "text-emerald-900" },
  sand: { dot: "bg-amber-400", bg: "bg-amber-50", text: "text-amber-900" },
  slate: { dot: "bg-slate-400", bg: "bg-slate-100", text: "text-slate-800" },
};

function CalendarPlusIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M12 14v4M10 16h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function buildGCalUrl(event: CalendarDisplayEvent): string {
  const params = new URLSearchParams({ action: "TEMPLATE", text: event.title });
  if (event.startISO) {
    const start = new Date(event.startISO);
    const end = new Date(start.getTime() + 60 * 60 * 1000);
    const fmt = (d: Date) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d+/, "");
    params.set("dates", `${fmt(start)}/${fmt(end)}`);
  }
  if (event.description) params.set("details", event.description);
  if (event.location) params.set("location", event.location);
  return `https://calendar.google.com/calendar/render?${params}`;
}

function EventPill({
  event,
  isPastDay,
}: {
  event: CalendarDisplayEvent;
  isPastDay: boolean;
}) {
  const t = PILL_THEME[event.theme];
  return (
    <div className="group/pill relative">
      <div
        className={`inline-flex cursor-default select-none items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium ${
          isPastDay ? "bg-neutral-200 text-neutral-400" : `${t.bg} ${t.text}`
        }`}
      >
        {!isPastDay && <span className={`h-2 w-2 shrink-0 rounded-full ${t.dot}`} />}
        <span className={isPastDay ? "line-through" : ""}>{event.title}</span>
        <span className="text-xs opacity-70">{event.time}</span>
      </div>
      <div
        className="pointer-events-none absolute bottom-[calc(100%+0.5rem)] left-0 z-20 w-52 rounded-xl border border-neutral-200 bg-white px-3 py-2.5 text-xs opacity-0 shadow-lg transition-opacity duration-150 group-hover/pill:pointer-events-auto group-hover/pill:opacity-100"
        role="tooltip"
      >
        <p className="font-semibold text-neutral-900">{event.location}</p>
        <a
          href={buildGCalUrl(event)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex items-center gap-1 font-semibold text-background hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
        >
          <CalendarPlusIcon className="shrink-0" />
          Add to calendar
        </a>
      </div>
    </div>
  );
}

function DayRow({ day }: { day: WeekDay }) {
  const rowClass = [
    "flex overflow-hidden rounded-2xl border",
    day.isPast
      ? "border-neutral-200 bg-neutral-100"
      : day.isToday
        ? "border-neutral-100 bg-white border-l-4 border-l-gold"
        : "border-neutral-100 bg-white",
  ].join(" ");

  return (
    <div className={rowClass}>
      <div
        className={`flex w-28 shrink-0 flex-col justify-center px-4 py-4 sm:w-36 ${
          day.isPast ? "text-neutral-400" : "text-neutral-900"
        }`}
      >
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-sm font-semibold">{day.label}</span>
          {day.isToday && (
            <span className="rounded-full bg-gold px-1.5 py-0.5 text-xs font-semibold text-background">
              Today
            </span>
          )}
        </div>
        <span
          className={`mt-0.5 text-xs ${day.isPast ? "text-neutral-400" : "text-neutral-500"}`}
        >
          {day.shortDate}
        </span>
      </div>

      <div
        className={`flex flex-1 flex-wrap items-center gap-2 border-l px-4 py-4 ${
          day.isPast ? "border-neutral-200" : "border-neutral-100"
        }`}
      >
        {day.events.length === 0 ? (
          <span className="text-sm text-neutral-400">No events</span>
        ) : (
          day.events.map((event) => (
            <EventPill key={event.id} event={event} isPastDay={day.isPast} />
          ))
        )}
      </div>
    </div>
  );
}

export type WeeklyEventsProps = {
  days: WeekDay[];
  fetchError: string | null;
};

export function WeeklyEvents({ days, fetchError }: WeeklyEventsProps) {
  return (
    <section
      id="events"
      className="relative w-full overflow-hidden bg-white px-6 py-16 text-neutral-900 sm:px-10 sm:py-20 md:py-24 lg:px-16"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute -top-20 right-[10%] h-72 w-72 rounded-full bg-gold/15 blur-3xl motion-safe:animate-events-shimmer motion-reduce:animate-none motion-reduce:opacity-30" />
        <div className="absolute -bottom-24 left-[5%] h-80 w-80 rounded-full bg-background/[0.06] blur-3xl motion-safe:animate-events-shimmer motion-safe:[animation-delay:3s] motion-reduce:animate-none motion-reduce:opacity-25" />
      </div>

      <div className="relative mx-auto max-w-[1400px]">
        <h2 className="font-serif text-4xl font-bold leading-[1.1] tracking-tight text-background motion-safe:animate-events-header-in motion-reduce:animate-none motion-reduce:opacity-100 sm:text-5xl md:text-[2.75rem]">
          This Week&apos;s Events
        </h2>
        <p className="mt-5 text-base leading-relaxed text-neutral-700 motion-safe:animate-events-header-in motion-safe:[animation-delay:120ms] motion-safe:[animation-fill-mode:both] motion-reduce:animate-none motion-reduce:opacity-100 sm:text-lg">
          Join our community for workshops, hands-on sessions, and networking
          events designed to build your skills and connections in tech.
        </p>

        {fetchError ? (
          <div
            className="mt-10 rounded-2xl border border-amber-200 bg-amber-50 px-6 py-5 text-sm text-amber-950"
            role="alert"
          >
            <p className="font-semibold text-background">
              Calendar couldn&apos;t load
            </p>
            <p className="mt-2 text-neutral-700">{fetchError}</p>
          </div>
        ) : null}

        <div className="mt-10 flex flex-col gap-3">
          {days.map((day, index) => (
            <div
              key={day.key}
              style={{ animationDelay: `${120 + index * 50}ms` }}
              className="motion-safe:animate-events-card-in motion-safe:[animation-fill-mode:both] motion-reduce:animate-none motion-reduce:opacity-100"
            >
              <DayRow day={day} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
