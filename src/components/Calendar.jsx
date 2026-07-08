import React, { useState } from 'react'
import DayCell from './DayCell'

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay()
}

function formatDate(year, month, day) {
  const m = String(month + 1).padStart(2, '0')
  const d = String(day).padStart(2, '0')
  return `${year}-${m}-${d}`
}

function isToday(year, month, day) {
  const now = new Date()
  return now.getFullYear() === year && now.getMonth() === month && now.getDate() === day
}

export default function Calendar({ events, onDayClick, onEventClick }) {
  const today = new Date()
  const [currentYear, setCurrentYear] = useState(today.getFullYear())
  const [currentMonth, setCurrentMonth] = useState(today.getMonth())

  const daysInMonth = getDaysInMonth(currentYear, currentMonth)
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth)
  const prevMonthDays = getDaysInMonth(currentYear, currentMonth - 1)

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear(y => y - 1)
    } else {
      setCurrentMonth(m => m - 1)
    }
  }

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear(y => y + 1)
    } else {
      setCurrentMonth(m => m + 1)
    }
  }

  const goToToday = () => {
    setCurrentYear(today.getFullYear())
    setCurrentMonth(today.getMonth())
  }

  const cells = []

  for (let i = 0; i < firstDay; i++) {
    const day = prevMonthDays - firstDay + i + 1
    const m = currentMonth === 0 ? 11 : currentMonth - 1
    const y = currentMonth === 0 ? currentYear - 1 : currentYear
    cells.push({
      day,
      date: formatDate(y, m, day),
      isCurrentMonth: false,
      isToday: false,
    })
  }

  for (let day = 1; day <= daysInMonth; day++) {
    cells.push({
      day,
      date: formatDate(currentYear, currentMonth, day),
      isCurrentMonth: true,
      isToday: isToday(currentYear, currentMonth, day),
    })
  }

  const remaining = 42 - cells.length
  for (let i = 1; i <= remaining; i++) {
    const m = currentMonth === 11 ? 0 : currentMonth + 1
    const y = currentMonth === 11 ? currentYear + 1 : currentYear
    cells.push({
      day: i,
      date: formatDate(y, m, i),
      isCurrentMonth: false,
      isToday: false,
    })
  }

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button className="nav-btn" onClick={prevMonth}>&#8249;</button>
        <h2>{MONTHS[currentMonth]} {currentYear}</h2>
        <button className="nav-btn" onClick={nextMonth}>&#8250;</button>
      </div>
      <button className="today-btn" onClick={goToToday}>Today</button>
      <div className="calendar-grid">
        {DAYS.map(d => (
          <div key={d} className="day-header">{d}</div>
        ))}
        {cells.map((cell, i) => {
          const dayEvents = events.filter(e => e.date === cell.date)
          return (
            <DayCell
              key={i}
              {...cell}
              events={dayEvents}
              onClick={() => onDayClick(cell.date)}
              onEventClick={onEventClick}
            />
          )
        })}
      </div>
    </div>
  )
}
