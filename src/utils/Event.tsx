import { EventInput } from '@fullcalendar/core'

let eventGuid = 0
const stored = localStorage.getItem('weather_app');
const note :Array<object>= stored && JSON.parse(stored)?.note ? JSON.parse(stored)?.note : [];

export const INITIAL_EVENTS: EventInput[] = note


export function createEventId() {
  return String(eventGuid++)
}