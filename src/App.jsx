import React, { useState } from 'react'
import Calendar from './components/Calendar'
import EventModal from './components/EventModal'
import { getEvents } from './utils/storage'

const EVENT_COLORS = [
  { name: 'Blue', value: '#4285f4' },
  { name: 'Green', value: '#34a853' },
  { name: 'Red', value: '#ea4335' },
  { name: 'Yellow', value: '#fbbc05' },
  { name: 'Purple', value: '#a142f4' },
]

export default function App() {
  const [selectedDate, setSelectedDate] = useState(null)
  const [editingEvent, setEditingEvent] = useState(null)
  const [events, setEvents] = useState(getEvents())

  const refreshEvents = () => setEvents(getEvents())

  const handleDayClick = (date) => {
    setSelectedDate(date)
    setEditingEvent(null)
  }

  const handleEventClick = (event) => {
    setSelectedDate(event.date)
    setEditingEvent(event)
  }

  const handleClose = () => {
    setSelectedDate(null)
    setEditingEvent(null)
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Calendar Super</h1>
      </header>
      <Calendar
        events={events}
        onDayClick={handleDayClick}
        onEventClick={handleEventClick}
      />
      {selectedDate && (
        <EventModal
          date={selectedDate}
          event={editingEvent}
          colors={EVENT_COLORS}
          onClose={handleClose}
          onSaved={refreshEvents}
        />
      )}
    </div>
  )
}
