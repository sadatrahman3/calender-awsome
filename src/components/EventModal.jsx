import React, { useState, useEffect } from 'react'
import { addEvent, updateEvent, deleteEvent } from '../utils/storage'

function formatDisplayDate(dateStr) {
  const [y, m, d] = dateStr.split('-')
  const date = new Date(y, m - 1, d)
  return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
}

export default function EventModal({ date, event, colors, onClose, onSaved }) {
  const [title, setTitle] = useState('')
  const [time, setTime] = useState('09:00')
  const [color, setColor] = useState(colors[0].value)

  useEffect(() => {
    if (event) {
      setTitle(event.title)
      setTime(event.time || '09:00')
      setColor(event.color || colors[0].value)
    } else {
      setTitle('')
      setTime('09:00')
      setColor(colors[0].value)
    }
  }, [event, colors])

  const handleSave = (e) => {
    e.preventDefault()
    if (!title.trim()) return

    if (event) {
      updateEvent(event.id, { title: title.trim(), time, color })
    } else {
      addEvent({ date, title: title.trim(), time, color })
    }
    onSaved()
    onClose()
  }

  const handleDelete = () => {
    if (event && confirm('Delete this event?')) {
      deleteEvent(event.id)
      onSaved()
      onClose()
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{event ? 'Edit Event' : 'New Event'}</h3>
          <button className="modal-close" onClick={onClose}>&times;</button>
        </div>
        <p className="modal-date">{formatDisplayDate(date)}</p>
        <form onSubmit={handleSave}>
          <div className="form-group">
            <label>Event Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Add title..."
              autoFocus
            />
          </div>
          <div className="form-group">
            <label>Time</label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Color</label>
            <div className="color-picker">
              {colors.map(c => (
                <button
                  key={c.value}
                  type="button"
                  className={`color-dot ${color === c.value ? 'selected' : ''}`}
                  style={{ backgroundColor: c.value }}
                  onClick={() => setColor(c.value)}
                  title={c.name}
                />
              ))}
            </div>
          </div>
          <div className="modal-actions">
            {event && (
              <button type="button" className="btn-delete" onClick={handleDelete}>
                Delete
              </button>
            )}
            <button type="submit" className="btn-save">Save</button>
          </div>
        </form>
      </div>
    </div>
  )
}
