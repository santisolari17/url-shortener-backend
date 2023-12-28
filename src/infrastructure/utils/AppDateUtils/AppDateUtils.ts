import { zonedTimeToUtc, format } from 'date-fns-tz';
import { formatDistance, isEqual } from 'date-fns';

export abstract class AppDateUtils {
  public static now(): Date {
    return zonedTimeToUtc(new Date(), 'America/Santiago');
  }

  public static newDateFromString(dateString: string): Date {
    return zonedTimeToUtc(dateString, 'America/Santiago');
  }

  public static appDateStringFormat(date: Date): string {
    return format(date, 'yyyy-MM-dd');
  }

  public static appDatetimeStringFormat(date: Date): string {
    return format(date, 'yyyy-MM-dd kk:mm:ss');
  }

  public static distanceBetweenDatesString(date1: Date, date2: Date): string {
    return formatDistance(date1, date2);
  }

  public static isSameDate(date1: Date, date2: Date): boolean {
    return isEqual(date1, date2);
  }

  public static isSameDay(date1: Date, date2: Date): boolean {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }
}