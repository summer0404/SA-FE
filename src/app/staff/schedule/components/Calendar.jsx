'use client'

import { useNextCalendarApp, ScheduleXCalendar } from '@schedule-x/react'
import {
  createViewDay,
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
} from '@schedule-x/calendar'
import { createEventsServicePlugin } from '@schedule-x/events-service'

import '@schedule-x/theme-default/dist/index.css'
import { useState } from "react";

function Calendar() {
  const eventsService = useState(() => createEventsServicePlugin())[0]

  const calendar = useNextCalendarApp({
    views: [createViewDay(), createViewWeek(), createViewMonthGrid(), createViewMonthAgenda()],
    events: [
      {
        id: '1',
        title: 'Event 1',
        start: '2025-04-16 16:00',
        end: '2025-04-16 17:00',
      },
    ],
    plugins: [eventsService],
    callbacks: {
      onRender: () => {
        // get all events
        eventsService.getAll()
      }
    }
  })

  return (
    <div>
      <div className="w-19/20 mb-4 mr-2 rounded-lg shadow-lg bg-white h-[calc(90vh-120px)] overflow-y-auto p-4">
        <ScheduleXCalendar calendarApp={calendar} />
      </div>
    </div>
  )
}

export default Calendar