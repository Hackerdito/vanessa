import { ReactNode } from 'react';

const eventDetails = {
  title: 'XV Años Vanessa Celeste',
  description: 'Ceremonia religiosa: Iglesia San Pedro Xalostoc (16:00 hrs). Recepción: Salón de Fiestas Amaranto (18:15 hrs).',
  location: 'Iglesia San Pedro Xalostoc',
  // Local floating time - no Z means it will use the user's current timezone as local start
  startDate: '20260801T160000',
  endDate: '20260802T020000', 
};

export default function AddToCalendar({ className }: { className?: string }) {
  
  const generateAppleCalendarUrl = () => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//XV Años Vanessa//ES
BEGIN:VEVENT
SUMMARY:${eventDetails.title}
DTSTART:${eventDetails.startDate}
DTEND:${eventDetails.endDate}
LOCATION:${eventDetails.location}
DESCRIPTION:${eventDetails.description}
END:VEVENT
END:VCALENDAR`;

    return 'data:text/calendar;charset=utf8,' + encodeURIComponent(icsContent);
  };

  const generateGoogleCalendarUrl = () => {
    // 20260801T160000 in Mexico is +6 hours to UTC (approx depending on daylight savings, normally not observed now). Let's use local floating time without Z in gcal? Google prefers explicit timezones, or UTC with Z.
    // We'll use floating by omitting timezone, Google handles it based on user browser.
    const url = new URL('https://calendar.google.com/calendar/render');
    url.searchParams.append('action', 'TEMPLATE');
    url.searchParams.append('text', eventDetails.title);
    url.searchParams.append('dates', eventDetails.startDate + '/' + eventDetails.endDate);
    url.searchParams.append('details', eventDetails.description);
    url.searchParams.append('location', eventDetails.location);
    return url.toString();
  };

  return (
    <div className="flex flex-col sm:flex-row justify-center gap-4 w-full">
      <a
        href={generateAppleCalendarUrl()}
        download="xv-vanessa-celeste.ics"
        className={className}
      >
        Apple
      </a>
      <a
        href={generateGoogleCalendarUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        Google
      </a>
    </div>
  );
}
