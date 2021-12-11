import React from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction"



export default function Calendar(props) {
    return (
      <FullCalendar
        plugins={[ dayGridPlugin,interactionPlugin  ]}
        initialView="dayGridMonth"
        selectable={true}
        dateClick={props.handleDateClick}
        validRange={(nowDate) => ({
          start: nowDate
        })}
      />
    )
}