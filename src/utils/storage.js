const EVENTS_KEY = 'calendar_events'

export function getEvents() {
  try {
    const data = localStorage.getItem(EVENTS_KEY)
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

export function saveEvents(events) {
  localStorage.setItem(EVENTS_KEY, JSON.stringify(events))
}

export function addEvent(event) {
  const events = getEvents()
  const newEvent = { ...event, id: Date.now() }
  events.push(newEvent)
  saveEvents(events)
  return newEvent
}

export function updateEvent(id, updates) {
  const events = getEvents()
  const idx = events.findIndex(e => e.id === id)
  if (idx !== -1) {
    events[idx] = { ...events[idx], ...updates }
    saveEvents(events)
    return events[idx]
  }
  return null
}

export function deleteEvent(id) {
  const events = getEvents().filter(e => e.id !== id)
  saveEvents(events)
}
