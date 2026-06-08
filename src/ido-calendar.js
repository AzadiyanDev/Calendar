const CALENDAR_TYPES = new Set(['Gregorian', 'Jalali']);

const PERSIAN_MONTHS = [
  'فروردین',
  'اردیبهشت',
  'خرداد',
  'تیر',
  'مرداد',
  'شهریور',
  'مهر',
  'آبان',
  'آذر',
  'دی',
  'بهمن',
  'اسفند'
];

const GREGORIAN_MONTHS_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const GREGORIAN_MONTHS_LONG = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];
const GREGORIAN_MONTHS_FA = ['ژانویه', 'فوریه', 'مارس', 'آوریل', 'مه', 'ژوئن', 'ژوئیه', 'اوت', 'سپتامبر', 'اکتبر', 'نوامبر', 'دسامبر'];

const PERSIAN_WEEKDAYS_SHORT = ['یک', 'دو', 'سه', 'چهار', 'پنج', 'جمعه', 'شنبه'];
const PERSIAN_WEEKDAYS_NARROW = ['ی', 'د', 'س', 'چ', 'پ', 'ج', 'ش'];
const GREGORIAN_WEEKDAYS_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const GREGORIAN_WEEKDAYS_NARROW = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const FIXED_JALALI_HOLIDAYS = new Map([
  ['01-01', ['نوروز']],
  ['01-02', ['نوروز']],
  ['01-03', ['نوروز']],
  ['01-04', ['نوروز']],
  ['01-12', ['روز جمهوری اسلامی']],
  ['01-13', ['روز طبیعت']],
  ['03-14', ['رحلت امام خمینی']],
  ['03-15', ['قیام ۱۵ خرداد']],
  ['11-22', ['پیروزی انقلاب اسلامی']],
  ['12-29', ['روز ملی شدن صنعت نفت']]
]);

const SPECIFIC_JALALI_HOLIDAYS = new Map([
  ['1404-01-02', ['شهادت امام علی']],
  ['1404-01-11', ['عید فطر']],
  ['1404-01-12', ['تعطیل عید فطر']],
  ['1404-02-04', ['شهادت امام جعفر صادق']],
  ['1404-03-16', ['عید قربان']],
  ['1404-03-24', ['عید غدیر خم']],
  ['1404-04-14', ['تاسوعا']],
  ['1404-04-15', ['عاشورا']],
  ['1404-05-23', ['اربعین حسینی']],
  ['1404-05-31', ['رحلت پیامبر و شهادت امام حسن']],
  ['1404-06-10', ['شهادت امام حسن عسکری']],
  ['1404-06-19', ['ولادت پیامبر و امام جعفر صادق']],
  ['1404-09-03', ['شهادت حضرت فاطمه']],
  ['1404-10-13', ['ولادت امام علی']],
  ['1404-10-27', ['مبعث پیامبر']],
  ['1404-11-15', ['ولادت امام مهدی']],
  ['1404-12-20', ['شهادت امام علی']],
  ['1405-01-01', ['عید فطر']],
  ['1405-01-02', ['تعطیل عید فطر']],
  ['1405-01-25', ['شهادت امام جعفر صادق']],
  ['1405-03-06', ['عید قربان']],
  ['1405-03-14', ['عید غدیر خم']],
  ['1405-04-03', ['تاسوعا']],
  ['1405-04-04', ['عاشورا']],
  ['1405-05-13', ['اربعین حسینی']],
  ['1405-05-21', ['رحلت پیامبر و شهادت امام حسن']],
  ['1405-05-30', ['شهادت امام حسن عسکری']],
  ['1405-06-08', ['ولادت پیامبر و امام جعفر صادق']],
  ['1405-08-22', ['شهادت حضرت فاطمه']],
  ['1405-10-01', ['ولادت امام علی']],
  ['1405-10-15', ['مبعث پیامبر']],
  ['1405-11-03', ['ولادت امام مهدی']],
  ['1405-12-09', ['شهادت امام علی']],
  ['1405-12-19', ['عید فطر']],
  ['1405-12-20', ['تعطیل عید فطر']],
  ['1406-01-14', ['شهادت امام جعفر صادق']],
  ['1406-02-27', ['عید قربان']],
  ['1406-03-04', ['عید غدیر خم']],
  ['1406-03-24', ['تاسوعا']],
  ['1406-03-25', ['عاشورا']],
  ['1406-05-03', ['اربعین حسینی']],
  ['1406-05-11', ['رحلت پیامبر و شهادت امام حسن']],
  ['1406-05-20', ['شهادت امام حسن عسکری']],
  ['1406-05-29', ['ولادت پیامبر و امام جعفر صادق']],
  ['1406-08-11', ['شهادت حضرت فاطمه']],
  ['1406-09-21', ['ولادت امام علی']],
  ['1406-10-05', ['مبعث پیامبر']],
  ['1406-10-22', ['ولادت امام مهدی']],
  ['1406-11-28', ['شهادت امام علی']],
  ['1406-12-08', ['عید فطر']],
  ['1406-12-09', ['تعطیل عید فطر']]
]);

const DEFAULT_OPTIONS = {
  calendarType: 'Gregorian',
  locale: 'en',
  weekStartDay: undefined,
  showAdjacentMonths: true,
  fixedWeekCount: true,
  showHolidays: true,
  usePersianDigits: undefined,
  holidays: [],
  holidayProvider: undefined
};

export class IDoCalendar {
  #options;
  #persianPartsFormatter;
  #gregorianLongFormatter;
  #gregorianLongFormatterFa;
  #gregorianShortFormatter;
  #gregorianShortFormatterFa;
  #timeFormatter;
  #timeFormatterFa;
  #persianNumberFormatter;
  #jalaliDateCache = new Map();

  constructor(options = {}) {
    this.#persianPartsFormatter = new Intl.DateTimeFormat('en-US-u-ca-persian', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric'
    });
    this.#gregorianLongFormatter = new Intl.DateTimeFormat('en-US-u-ca-gregory', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    this.#gregorianLongFormatterFa = new Intl.DateTimeFormat('fa-IR-u-ca-gregory', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    this.#gregorianShortFormatter = new Intl.DateTimeFormat('en-US-u-ca-gregory', {
      month: 'short',
      day: 'numeric'
    });
    this.#gregorianShortFormatterFa = new Intl.DateTimeFormat('fa-IR-u-ca-gregory', {
      month: 'short',
      day: 'numeric'
    });
    this.#timeFormatter = new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
    this.#timeFormatterFa = new Intl.DateTimeFormat('fa-IR', {
      hour: '2-digit',
      minute: '2-digit'
    });
    this.#persianNumberFormatter = new Intl.NumberFormat('fa-IR', { useGrouping: false });
    this.#options = this.#normalizeOptions(options);
  }

  get options() {
    return { ...this.#options };
  }

  setOptions(options = {}) {
    this.#options = this.#normalizeOptions({ ...this.#options, ...options });
    return this;
  }

  todayKey() {
    return this.formatDateKey(new Date());
  }

  calendarTypeLabel(type = this.#options.calendarType) {
    if (this.#isPersianLocale()) return type === 'Jalali' ? 'شمسی' : 'میلادی';
    return type === 'Jalali' ? 'Jalali' : 'Gregorian';
  }

  normalizeCalendarType(value) {
    return value === 'Jalali' || value === 'jalali' ? 'Jalali' : 'Gregorian';
  }

  formatDateKey(date) {
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const day = `${date.getDate()}`.padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  dateFromKey(key) {
    if (!key) return null;
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(key);
    if (!match) return null;

    const year = Number(match[1]);
    const month = Number(match[2]);
    const day = Number(match[3]);
    const date = new Date(year, month - 1, day);
    if (
      Number.isNaN(date.getTime()) ||
      date.getFullYear() !== year ||
      date.getMonth() !== month - 1 ||
      date.getDate() !== day
    ) {
      return null;
    }

    return date;
  }

  addDays(date, days) {
    const item = new Date(date);
    item.setDate(item.getDate() + days);
    return item;
  }

  startOfWeek(date) {
    const weekStart = new Date(date);
    const dayOffset = (weekStart.getDay() - this.weekStartJsDay(this.#options.calendarType) + 7) % 7;
    weekStart.setDate(weekStart.getDate() - dayOffset);
    return weekStart;
  }

  startOfCurrentMonth(date) {
    return this.startOfCalendarMonth(date, this.#options.calendarType);
  }

  addCalendarMonths(key, amount) {
    const date = this.dateFromKey(key) ?? new Date();
    const parts = this.partsFor(date, this.#options.calendarType);
    return this.keyFromCalendarParts(parts.year, parts.month + amount, 1);
  }

  addCalendarYears(key, amount) {
    const date = this.dateFromKey(key) ?? new Date();
    const parts = this.partsFor(date, this.#options.calendarType);
    return this.keyFromCalendarParts(parts.year + amount, parts.month, 1);
  }

  setCalendarMonth(key, month) {
    const date = this.dateFromKey(key) ?? new Date();
    const parts = this.partsFor(date, this.#options.calendarType);
    return this.keyFromCalendarParts(parts.year, month, 1);
  }

  setCalendarYear(key, year) {
    const date = this.dateFromKey(key) ?? new Date();
    const parts = this.partsFor(date, this.#options.calendarType);
    return this.keyFromCalendarParts(year, parts.month, 1);
  }

  keyFromCalendarParts(year, month, day = 1) {
    const normalized = this.#normalizeCalendarParts(year, month, day);
    const date = this.dateForCalendarParts(normalized.year, normalized.month, normalized.day, this.#options.calendarType);
    return this.formatDateKey(date ?? new Date());
  }

  buildTimeline(selectedKey, daysBefore = 21, daysAfter = 35, options = {}) {
    const selectedDate = this.dateFromKey(selectedKey) ?? new Date();
    return Array.from({ length: daysBefore + daysAfter + 1 }, (_, index) => {
      const date = this.addDays(selectedDate, index - daysBefore);
      return this.#toDayCell(date, selectedKey, true, options);
    });
  }

  buildMonthView(viewDateKey, selectedKey, options = {}) {
    const viewOptions = { ...this.#options, ...options };
    const type = viewOptions.calendarType;
    const viewDate = this.dateFromKey(viewDateKey) ?? new Date();
    const monthStart = this.startOfCalendarMonth(viewDate, type);
    const weekStart = this.weekStartJsDay(type, viewOptions.weekStartDay);
    const leadingDays = (monthStart.getDay() - weekStart + 7) % 7;
    const gridStart = this.addDays(monthStart, -leadingDays);
    const currentMonthId = this.calendarMonthId(monthStart, type);
    const parts = this.partsFor(monthStart, type);
    const currentMonthLength = this.daysInCalendarMonth(parts.year, parts.month, type);
    const gridLength = viewOptions.fixedWeekCount
      ? 42
      : Math.ceil((leadingDays + currentMonthLength) / 7) * 7;

    return {
      title: `${this.monthName(parts.month, type, 'long')} ${this.formatNumber(parts.year, type)}`,
      year: parts.year,
      month: parts.month,
      calendarType: type,
      weekdays: this.weekdayHeaders(type, viewOptions.weekStartDay),
      monthOptions: this.monthOptions(type),
      yearOptions: this.yearOptions(parts.year, options.yearRange, type),
      days: Array.from({ length: gridLength }, (_, index) => {
        const date = this.addDays(gridStart, index);
        const isCurrentMonth = this.calendarMonthId(date, type) === currentMonthId;
        return this.#toDayCell(date, selectedKey, isCurrentMonth, viewOptions);
      })
    };
  }

  monthOptions(type = this.#options.calendarType) {
    return Array.from({ length: 12 }, (_, index) => {
      const value = index + 1;
      return {
        value,
        label: this.monthName(value, type, 'long')
      };
    });
  }

  yearOptions(centerYear, range = 81, type = this.#options.calendarType) {
    const normalizedRange = Math.max(1, Math.floor(range));
    const before = Math.floor(normalizedRange / 2);
    const start = centerYear - before;
    return Array.from({ length: normalizedRange }, (_, index) => {
      const value = start + index;
      return {
        value,
        label: this.formatNumber(value, type)
      };
    });
  }

  formatShortDateKey(key) {
    const date = this.dateFromKey(key);
    return date ? this.formatShortDate(date) : key;
  }

  formatLongDateKey(key) {
    const date = this.dateFromKey(key);
    return date ? this.formatLongDate(date) : key;
  }

  formatShortDate(date) {
    if (this.#options.calendarType === 'Jalali') {
      const parts = this.partsFor(date, 'Jalali');
      return `${this.formatNumber(parts.day, 'Jalali')} ${this.monthName(parts.month, 'Jalali', 'short')}`;
    }

    return (this.#isPersianLocale() ? this.#gregorianShortFormatterFa : this.#gregorianShortFormatter).format(date);
  }

  formatLongDate(date) {
    if (this.#options.calendarType === 'Jalali') {
      const parts = this.partsFor(date, 'Jalali');
      return `${this.formatNumber(parts.day, 'Jalali')} ${this.monthName(parts.month, 'Jalali', 'long')} ${this.formatNumber(parts.year, 'Jalali')}`;
    }

    return (this.#isPersianLocale() ? this.#gregorianLongFormatterFa : this.#gregorianLongFormatter).format(date);
  }

  formatDateTime(date) {
    return `${this.formatShortDate(date)}, ${(this.#isPersianLocale() ? this.#timeFormatterFa : this.#timeFormatter).format(date)}`;
  }

  weekdayLabel(date, narrow = false) {
    const type = this.#options.calendarType;
    if (type === 'Jalali' || this.#isPersianLocale()) {
      return (narrow ? PERSIAN_WEEKDAYS_NARROW : PERSIAN_WEEKDAYS_SHORT)[date.getDay()];
    }

    return (narrow ? GREGORIAN_WEEKDAYS_NARROW : GREGORIAN_WEEKDAYS_SHORT)[date.getDay()];
  }

  holidayTitleForKey(key) {
    const date = this.dateFromKey(key);
    return date ? this.holidayFor(date)?.title ?? null : null;
  }

  isHolidayKey(key) {
    return this.holidayTitleForKey(key) !== null;
  }

  startOfCalendarMonth(date, type = this.#options.calendarType) {
    const parts = this.partsFor(date, type);
    if (type === 'Gregorian') return new Date(parts.year, parts.month - 1, 1);
    return this.jalaliToDate(parts.year, parts.month, 1) ?? date;
  }

  partsFor(date, type = this.#options.calendarType) {
    if (type === 'Gregorian') {
      return {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate()
      };
    }

    const parts = this.#persianPartsFormatter.formatToParts(date);
    return {
      year: this.#numberPart(parts, 'year'),
      month: this.#numberPart(parts, 'month'),
      day: this.#numberPart(parts, 'day')
    };
  }

  calendarMonthId(date, type = this.#options.calendarType) {
    const parts = this.partsFor(date, type);
    return `${parts.year}-${`${parts.month}`.padStart(2, '0')}`;
  }

  monthName(month, type = this.#options.calendarType, length = 'short') {
    if (type === 'Jalali') return PERSIAN_MONTHS[month - 1] ?? '';
    if (this.#isPersianLocale()) return GREGORIAN_MONTHS_FA[month - 1] ?? '';
    return length === 'long'
      ? GREGORIAN_MONTHS_LONG[month - 1] ?? ''
      : GREGORIAN_MONTHS_SHORT[month - 1] ?? '';
  }

  formatNumber(value, type = this.#options.calendarType) {
    const shouldUsePersianDigits = this.#options.usePersianDigits ?? (type === 'Jalali' || this.#isPersianLocale());
    return shouldUsePersianDigits ? this.#persianNumberFormatter.format(value) : `${value}`;
  }

  weekdayHeaders(type = this.#options.calendarType, weekStartDay = this.#options.weekStartDay) {
    const labels = type === 'Jalali' || this.#isPersianLocale() ? PERSIAN_WEEKDAYS_NARROW : GREGORIAN_WEEKDAYS_SHORT;
    const start = this.weekStartJsDay(type, weekStartDay);
    return Array.from({ length: 7 }, (_, index) => labels[(start + index) % 7]);
  }

  weekStartJsDay(type = this.#options.calendarType, weekStartDay = this.#options.weekStartDay) {
    if (weekStartDay === 'Sunday' || weekStartDay === 0) return 0;
    if (weekStartDay === 'Monday' || weekStartDay === 1) return 1;
    if (weekStartDay === 'Saturday' || weekStartDay === 6) return 6;
    return type === 'Jalali' ? 6 : 1;
  }

  holidayFor(date) {
    if (!this.#options.showHolidays) return null;

    const parts = this.partsFor(date, 'Jalali');
    const monthDayKey = `${`${parts.month}`.padStart(2, '0')}-${`${parts.day}`.padStart(2, '0')}`;
    const yearMonthDayKey = `${parts.year}-${monthDayKey}`;
    const titles = [
      ...(FIXED_JALALI_HOLIDAYS.get(monthDayKey) ?? []),
      ...(SPECIFIC_JALALI_HOLIDAYS.get(yearMonthDayKey) ?? [])
    ];

    for (const holiday of this.#options.holidays) {
      if (holiday.key === yearMonthDayKey || holiday.key === monthDayKey) titles.push(holiday.title);
    }

    const custom = this.#options.holidayProvider?.(this.formatDateKey(date), { date, parts });
    if (Array.isArray(custom)) titles.push(...custom);
    else if (typeof custom === 'string') titles.push(custom);

    if (date.getDay() === 5) titles.push('جمعه');
    if (titles.length === 0) return null;
    return { title: [...new Set(titles)].join('، ') };
  }

  jalaliToDate(year, month, day) {
    const cacheKey = `${year}-${`${month}`.padStart(2, '0')}-${`${day}`.padStart(2, '0')}`;
    const cached = this.#jalaliDateCache.get(cacheKey);
    if (cached) return this.dateFromKey(cached);

    const start = new Date(year + 621, 2, 1);
    for (let index = 0; index < 430; index += 1) {
      const candidate = this.addDays(start, index);
      const parts = this.partsFor(candidate, 'Jalali');
      if (parts.year === year && parts.month === month && parts.day === day) {
        this.#jalaliDateCache.set(cacheKey, this.formatDateKey(candidate));
        return candidate;
      }
    }

    return null;
  }

  dateForCalendarParts(year, month, day, type = this.#options.calendarType) {
    if (type === 'Gregorian') {
      const date = new Date(year, month - 1, day);
      return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day ? date : null;
    }

    return this.jalaliToDate(year, month, day);
  }

  daysInCalendarMonth(year, month, type = this.#options.calendarType) {
    if (type === 'Gregorian') return new Date(year, month, 0).getDate();
    for (let day = 31; day >= 28; day -= 1) {
      if (this.jalaliToDate(year, month, day)) return day;
    }
    return 29;
  }

  #toDayCell(date, selectedKey, isCurrentMonth, options = {}) {
    const type = options.calendarType ?? this.#options.calendarType;
    const key = this.formatDateKey(date);
    const parts = this.partsFor(date, type);
    const holiday = options.showHolidays === false ? null : this.holidayFor(date);
    const shouldShowAdjacent = options.showAdjacentMonths !== false;

    return {
      key,
      weekday: this.weekdayLabel(date),
      dayOfMonth: this.formatNumber(parts.day, type),
      month: this.monthName(parts.month, type, 'short'),
      isToday: key === this.todayKey(),
      isSelected: key === selectedKey,
      isCurrentMonth,
      isVisible: isCurrentMonth || shouldShowAdjacent,
      isHoliday: holiday !== null,
      holidayTitle: holiday?.title ?? null,
      parts
    };
  }

  #normalizeOptions(options) {
    return {
      ...DEFAULT_OPTIONS,
      ...options,
      calendarType: this.normalizeCalendarType(options.calendarType),
      locale: options.locale === 'fa' || options.locale === 'fa-IR' || options.locale === 'Persian' ? 'fa' : 'en',
      holidays: Array.isArray(options.holidays) ? options.holidays : []
    };
  }

  #normalizeCalendarParts(year, month, day) {
    const monthIndex = year * 12 + (month - 1);
    const normalizedYear = Math.floor(monthIndex / 12);
    const normalizedMonth = monthIndex - normalizedYear * 12 + 1;
    const maxDay = this.daysInCalendarMonth(normalizedYear, normalizedMonth, this.#options.calendarType);
    return {
      year: normalizedYear,
      month: normalizedMonth,
      day: Math.min(Math.max(1, day), maxDay)
    };
  }

  #numberPart(parts, type) {
    return Number(parts.find(part => part.type === type)?.value ?? 0);
  }

  #isPersianLocale() {
    return this.#options.locale === 'fa';
  }
}

const PICKER_DEFAULTS = {
  selectedDate: undefined,
  calendarType: 'Gregorian',
  locale: 'en',
  weekStartDay: undefined,
  showAdjacentDays: true,
  fixedWeekCount: true,
  showHolidays: true,
  showCalendarLabel: true,
  showTodayButton: true,
  showMonthSelector: true,
  showYearSelector: true,
  usePersianDigits: undefined,
  holidays: [],
  holidayProvider: undefined,
  yearRange: 121,
  yearPageSize: 12,
  density: 'comfortable',
  accent: undefined,
  dir: undefined,
  labels: {},
  onChange: undefined,
  onViewChange: undefined
};

const PICKER_LABELS = {
  en: {
    month: 'Month',
    year: 'Year',
    today: 'Today',
    previousMonth: 'Previous month',
    nextMonth: 'Next month',
    previousYear: 'Previous year',
    nextYear: 'Next year'
  },
  fa: {
    month: 'ماه',
    year: 'سال',
    today: 'امروز',
    previousMonth: 'ماه قبل',
    nextMonth: 'ماه بعد',
    previousYear: 'سال قبل',
    nextYear: 'سال بعد'
  }
};

export class IDoCalendarPicker {
  #target;
  #calendar;
  #options;
  #selectedDate;
  #viewDate;
  #periodPanelOpen = false;
  #periodPanelMode = 'month';
  #yearPageStart = null;
  #handleClick = event => this.#onClick(event);

  constructor(target, options = {}) {
    this.#target = resolveTarget(target);
    this.#options = normalizePickerOptions(options);
    this.#calendar = new IDoCalendar(this.#calendarOptions());
    this.#selectedDate = this.#validDateKey(this.#options.selectedDate) ?? this.#calendar.todayKey();
    this.#viewDate = this.#selectedDate;
    this.#target.addEventListener('click', this.#handleClick);
    this.render();
  }

  get selectedDate() {
    return this.#selectedDate;
  }

  get viewDate() {
    return this.#viewDate;
  }

  get calendar() {
    return this.#calendar;
  }

  setOptions(options = {}) {
    this.#options = normalizePickerOptions({ ...this.#options, ...options });
    this.#calendar.setOptions(this.#calendarOptions());
    if (options.selectedDate !== undefined) {
      this.#selectedDate = this.#validDateKey(options.selectedDate) ?? this.#selectedDate;
      this.#viewDate = this.#selectedDate;
    }
    this.render();
    return this;
  }

  setDate(dateKey, emitChange = true) {
    const nextDate = this.#validDateKey(dateKey);
    if (!nextDate) return this;

    this.#selectedDate = nextDate;
    this.#viewDate = nextDate;
    this.#periodPanelOpen = false;
    this.render();
    if (emitChange) this.#emitChange();
    return this;
  }

  setViewDate(dateKey) {
    const nextDate = this.#validDateKey(dateKey);
    if (!nextDate) return this;

    this.#viewDate = nextDate;
    this.#yearPageStart = null;
    this.render();
    this.#emitViewChange();
    return this;
  }

  destroy({ clear = true } = {}) {
    this.#target.removeEventListener('click', this.#handleClick);
    if (clear) this.#target.innerHTML = '';
  }

  render() {
    this.#calendar.setOptions(this.#calendarOptions());
    const view = this.#monthView();
    this.#target.innerHTML = this.#renderCalendar(view);
    this.#target.dir = this.#options.dir ?? (this.#options.locale === 'fa' ? 'rtl' : 'ltr');
    return this;
  }

  #renderCalendar(view) {
    const style = this.#options.accent ? ` style="--ido-calendar-accent:${escapeAttribute(this.#options.accent)}"` : '';
    const meta = this.#renderMeta();
    const body = this.#periodPanelOpen ? this.#renderPanel(view) : this.#renderDays(view);

    return `
      <section class="ido-calendar" data-density="${escapeAttribute(this.#options.density)}"${style}>
        <div class="ido-calendar__header">
          <button type="button" class="ido-calendar__nav-button" data-ido-action="previous-month" aria-label="${this.#text('previousMonth')}">${this.#dirIcon('previous')}</button>
          ${this.#renderPeriodHeader(view)}
          <button type="button" class="ido-calendar__nav-button" data-ido-action="next-month" aria-label="${this.#text('nextMonth')}">${this.#dirIcon('next')}</button>
        </div>
        ${meta}
        ${body}
      </section>
    `;
  }

  #renderPeriodHeader(view) {
    if (!this.#canOpenPeriodPanel()) {
      return `<span class="ido-calendar__title">${escapeHtml(view.title)}</span>`;
    }

    return `
      <button type="button" class="ido-calendar__period-button" data-ido-action="toggle-panel" aria-expanded="${this.#periodPanelOpen}" aria-label="${escapeAttribute(view.title)}">
        <span class="ido-calendar__period-title">${escapeHtml(view.title)}</span>
        <span class="ido-calendar__chevron" aria-hidden="true">${this.#periodPanelOpen ? '⌃' : '⌄'}</span>
      </button>
    `;
  }

  #renderMeta() {
    if (!this.#options.showCalendarLabel && !this.#options.showTodayButton) return '';

    const label = this.#options.showCalendarLabel
      ? `<span>${escapeHtml(this.#calendar.calendarTypeLabel())}</span>`
      : '';
    const today = this.#options.showTodayButton
      ? `<button type="button" class="ido-calendar__today-button" data-ido-action="today">${this.#text('today')}</button>`
      : '';

    return `<div class="ido-calendar__meta">${label}${today}</div>`;
  }

  #renderPanel(view) {
    const tabs = this.#options.showMonthSelector && this.#options.showYearSelector
      ? `
        <div class="ido-calendar__tabs">
          <button type="button" class="ido-calendar__tab ${this.#periodPanelMode === 'month' ? 'is-active' : ''}" data-ido-action="panel-mode" data-mode="month">${this.#text('month')}</button>
          <button type="button" class="ido-calendar__tab ${this.#periodPanelMode === 'year' ? 'is-active' : ''}" data-ido-action="panel-mode" data-mode="year">${this.#text('year')}</button>
        </div>
      `
      : '';

    return `
      <div class="ido-calendar__panel">
        ${tabs}
        ${this.#periodPanelMode === 'year' ? this.#renderYearPanel(view) : this.#renderMonthPanel(view)}
      </div>
    `;
  }

  #renderMonthPanel(view) {
    const yearStepper = this.#options.showYearSelector
      ? `
        <div class="ido-calendar__stepper">
          <button type="button" class="ido-calendar__mini-button" data-ido-action="previous-year" aria-label="${this.#text('previousYear')}">${this.#dirIcon('previous')}</button>
          <span>${escapeHtml(this.#currentYearLabel(view))}</span>
          <button type="button" class="ido-calendar__mini-button" data-ido-action="next-year" aria-label="${this.#text('nextYear')}">${this.#dirIcon('next')}</button>
        </div>
      `
      : '';
    const months = view.monthOptions.map(month => `
      <button type="button" class="ido-calendar__picker-button ${month.value === view.month ? 'is-active' : ''}" data-ido-action="choose-month" data-month="${month.value}">
        ${escapeHtml(month.label)}
      </button>
    `).join('');

    return `${yearStepper}<div class="ido-calendar__month-grid">${months}</div>`;
  }

  #renderYearPanel(view) {
    const years = this.#visibleYearOptions(view);
    const title = years.length ? `${years[0].label} - ${years[years.length - 1].label}` : '';
    const yearButtons = years.map(year => `
      <button type="button" class="ido-calendar__picker-button ${year.value === view.year ? 'is-active' : ''}" data-ido-action="choose-year" data-year="${year.value}">
        ${escapeHtml(year.label)}
      </button>
    `).join('');

    return `
      <div class="ido-calendar__stepper">
        <button type="button" class="ido-calendar__mini-button" data-ido-action="previous-year-page" aria-label="${this.#text('previousYear')}">${this.#dirIcon('previous')}</button>
        <span>${escapeHtml(title)}</span>
        <button type="button" class="ido-calendar__mini-button" data-ido-action="next-year-page" aria-label="${this.#text('nextYear')}">${this.#dirIcon('next')}</button>
      </div>
      <div class="ido-calendar__year-grid">${yearButtons}</div>
    `;
  }

  #renderDays(view) {
    const weekdays = view.weekdays.map(weekday => `<span class="ido-calendar__weekday">${escapeHtml(weekday)}</span>`).join('');
    const days = view.days.map(day => `
      <button
        type="button"
        class="ido-calendar__day-button ${day.isSelected ? 'is-selected' : ''} ${!day.isCurrentMonth ? 'is-muted' : ''} ${!day.isVisible ? 'is-hidden' : ''} ${day.isToday ? 'is-today' : ''} ${day.isHoliday ? 'is-holiday' : ''}"
        data-ido-action="select-day"
        data-date="${escapeAttribute(day.key)}"
        title="${escapeAttribute(day.holidayTitle ?? '')}"
        aria-pressed="${day.isSelected}"
        ${day.isVisible ? '' : 'disabled'}>
        <span>${escapeHtml(day.dayOfMonth)}</span>
        ${day.isHoliday && day.isVisible ? '<span class="ido-calendar__holiday-dot"></span>' : ''}
      </button>
    `).join('');

    return `
      <div class="ido-calendar__weekdays">${weekdays}</div>
      <div class="ido-calendar__days">${days}</div>
    `;
  }

  #onClick(event) {
    const button = event.target.closest('[data-ido-action]');
    if (!button || !this.#target.contains(button)) return;

    const action = button.dataset.idoAction;
    if (action === 'previous-month') this.#moveMonth(-1);
    else if (action === 'next-month') this.#moveMonth(1);
    else if (action === 'today') this.setViewDate(this.#calendar.todayKey());
    else if (action === 'toggle-panel') this.#togglePeriodPanel();
    else if (action === 'panel-mode') this.#setPanelMode(button.dataset.mode);
    else if (action === 'previous-year') this.#setViewYear(this.#monthView().year - 1);
    else if (action === 'next-year') this.#setViewYear(this.#monthView().year + 1);
    else if (action === 'previous-year-page') this.#moveYearPage(-1);
    else if (action === 'next-year-page') this.#moveYearPage(1);
    else if (action === 'choose-month') this.#chooseMonth(Number(button.dataset.month));
    else if (action === 'choose-year') this.#chooseYear(Number(button.dataset.year));
    else if (action === 'select-day') this.setDate(button.dataset.date);
  }

  #moveMonth(amount) {
    this.#viewDate = this.#calendar.addCalendarMonths(this.#viewDate, amount);
    this.#periodPanelOpen = false;
    this.render();
    this.#emitViewChange();
  }

  #setViewMonth(month) {
    if (!Number.isFinite(month)) return;
    this.#viewDate = this.#calendar.setCalendarMonth(this.#viewDate, month);
    this.render();
    this.#emitViewChange();
  }

  #setViewYear(year) {
    if (!Number.isFinite(year)) return;
    this.#viewDate = this.#calendar.setCalendarYear(this.#viewDate, year);
    this.#yearPageStart = null;
    this.render();
    this.#emitViewChange();
  }

  #togglePeriodPanel() {
    if (!this.#canOpenPeriodPanel()) return;
    this.#periodPanelOpen = !this.#periodPanelOpen;
    if (this.#periodPanelOpen) {
      this.#periodPanelMode = this.#options.showMonthSelector ? 'month' : 'year';
      this.#yearPageStart = this.#defaultYearPageStart(this.#monthView());
    }
    this.render();
  }

  #setPanelMode(mode) {
    if (mode !== 'month' && mode !== 'year') return;
    this.#periodPanelMode = mode;
    this.render();
  }

  #chooseMonth(month) {
    this.#setViewMonth(month);
    this.#periodPanelOpen = false;
    this.render();
  }

  #chooseYear(year) {
    this.#setViewYear(year);
    if (this.#options.showMonthSelector) {
      this.#periodPanelMode = 'month';
    } else {
      this.#periodPanelOpen = false;
    }
    this.render();
  }

  #moveYearPage(direction) {
    const view = this.#monthView();
    const size = this.#yearPageSize();
    this.#yearPageStart = (this.#yearPageStart ?? this.#defaultYearPageStart(view)) + direction * size;
    this.render();
  }

  #monthView() {
    return this.#calendar.buildMonthView(this.#viewDate, this.#selectedDate, {
      showAdjacentMonths: this.#options.showAdjacentDays,
      showHolidays: this.#options.showHolidays,
      fixedWeekCount: this.#options.fixedWeekCount,
      yearRange: this.#options.yearRange
    });
  }

  #visibleYearOptions(view) {
    const size = this.#yearPageSize();
    const start = this.#yearPageStart ?? this.#defaultYearPageStart(view);
    return this.#calendar.yearOptions(start + Math.floor(size / 2), size);
  }

  #defaultYearPageStart(view) {
    return view.year - Math.floor(this.#yearPageSize() / 2);
  }

  #yearPageSize() {
    return Math.max(6, Number(this.#options.yearPageSize) || PICKER_DEFAULTS.yearPageSize);
  }

  #calendarOptions() {
    return {
      calendarType: this.#options.calendarType,
      locale: this.#options.locale,
      weekStartDay: this.#options.weekStartDay,
      showAdjacentMonths: this.#options.showAdjacentDays,
      fixedWeekCount: this.#options.fixedWeekCount,
      showHolidays: this.#options.showHolidays,
      usePersianDigits: this.#options.usePersianDigits,
      holidays: this.#options.holidays,
      holidayProvider: this.#options.holidayProvider
    };
  }

  #currentYearLabel(view) {
    return view.yearOptions.find(year => year.value === view.year)?.label ?? `${view.year}`;
  }

  #canOpenPeriodPanel() {
    return this.#options.showMonthSelector || this.#options.showYearSelector;
  }

  #validDateKey(dateKey) {
    return this.#calendar.dateFromKey(dateKey) ? dateKey : null;
  }

  #emitChange() {
    const date = this.#calendar.dateFromKey(this.#selectedDate);
    const detail = {
      date: this.#selectedDate,
      dateObject: date,
      parts: date ? this.#calendar.partsFor(date) : null,
      calendarType: this.#calendar.options.calendarType
    };

    this.#options.onChange?.(detail);
    this.#target.dispatchEvent(new CustomEvent('ido-calendar:change', { detail }));
  }

  #emitViewChange() {
    const date = this.#calendar.dateFromKey(this.#viewDate);
    const detail = {
      viewDate: this.#viewDate,
      dateObject: date,
      parts: date ? this.#calendar.partsFor(date) : null,
      calendarType: this.#calendar.options.calendarType
    };

    this.#options.onViewChange?.(detail);
    this.#target.dispatchEvent(new CustomEvent('ido-calendar:view-change', { detail }));
  }

  #text(key) {
    const custom = this.#options.labels?.[key];
    if (custom) return escapeAttribute(custom);
    return escapeAttribute(PICKER_LABELS[this.#options.locale]?.[key] ?? PICKER_LABELS.en[key] ?? key);
  }

  #dirIcon(direction) {
    const rtl = (this.#options.dir ?? (this.#options.locale === 'fa' ? 'rtl' : 'ltr')) === 'rtl';
    if (direction === 'previous') return rtl ? '›' : '‹';
    return rtl ? '‹' : '›';
  }
}

export function mountIDoCalendar(target, options = {}) {
  return new IDoCalendarPicker(target, options);
}

function normalizePickerOptions(options) {
  const locale = options.locale === 'fa' || options.locale === 'fa-IR' || options.locale === 'Persian' ? 'fa' : 'en';
  return {
    ...PICKER_DEFAULTS,
    ...options,
    calendarType: options.calendarType === 'Jalali' || options.calendarType === 'jalali' ? 'Jalali' : 'Gregorian',
    locale,
    holidays: Array.isArray(options.holidays) ? options.holidays : [],
    labels: options.labels && typeof options.labels === 'object' ? options.labels : {}
  };
}

function resolveTarget(target) {
  if (typeof document === 'undefined') {
    throw new Error('IDoCalendarPicker needs a browser document.');
  }

  if (target instanceof HTMLElement) return target;
  if (typeof target !== 'string') throw new Error('Calendar target must be an element, an id, or a selector.');

  const direct = document.getElementById(target);
  const selected = direct ?? document.querySelector(target);
  if (!selected) throw new Error(`Calendar target "${target}" was not found.`);
  return selected;
}

function escapeHtml(value) {
  return `${value}`.replace(/[&<>"']/g, character => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[character]);
}

function escapeAttribute(value) {
  return escapeHtml(value);
}

if (typeof window !== 'undefined') {
  window.IDoCalendar = {
    Calendar: IDoCalendar,
    Picker: IDoCalendarPicker,
    mount: mountIDoCalendar
  };
}
