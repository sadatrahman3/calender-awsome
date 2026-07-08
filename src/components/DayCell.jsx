import React from 'react'

export default function DayCell({ day, date, isCurrentMonth, isToday, events, onClick, onEventClick }) {
  return (
    <div
      className={`day-cell ${isCurrentMonth ? '' : 'other-month'} ${isToday ? 'today' : ''}`}
      onClick={onClick}
    >
      <span className="day-number">{day}</span>
      <div className="day-events">
        {events.slice(0, 3).map(ev => (
          <div
            key={ev.id}
            className="event-chip"
            style={{ backgroundColor: ev.color }}
            onClick={(e) => {
              e.stopPropagation()
              onEventClick(ev)
            }}
          >
            {ev.title}
          </div>
        ))}
        {events.length > 3 && (
          <div className="event-more">+{events.length - 3} more</div>
        )}
      </div>
    </div>
  )
}
