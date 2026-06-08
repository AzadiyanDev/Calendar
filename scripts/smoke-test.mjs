import { IDoCalendar, IDoCalendarPicker, mountIDoCalendar } from '../src/ido-calendar.js';

const jalali = new IDoCalendar({ calendarType: 'Jalali', locale: 'fa' });
const view = jalali.buildMonthView('2026-06-08', '2026-06-08');

if (view.calendarType !== 'Jalali') throw new Error('Expected Jalali month view.');
if (view.days.length !== 42) throw new Error('Expected fixed 42-day month grid.');
if (view.monthOptions.length !== 12) throw new Error('Expected 12 month options.');
if (!view.yearOptions.length) throw new Error('Expected year options.');

const nextMonth = jalali.addCalendarMonths('2026-06-08', 1);
const movedYear = jalali.setCalendarYear('2026-06-08', 1405);

if (!jalali.dateFromKey(nextMonth)) throw new Error('Next month key is invalid.');
if (!jalali.dateFromKey(movedYear)) throw new Error('Moved year key is invalid.');

const gregorian = new IDoCalendar({ calendarType: 'Gregorian', locale: 'en' });
if (gregorian.dateFromKey('2026-02-30') !== null) throw new Error('Invalid Gregorian key was accepted.');

if (typeof IDoCalendarPicker !== 'function') throw new Error('IDoCalendarPicker export is missing.');
if (typeof mountIDoCalendar !== 'function') throw new Error('mountIDoCalendar export is missing.');

console.log(JSON.stringify({
  ok: true,
  title: view.title,
  nextMonth,
  movedYear
}));
