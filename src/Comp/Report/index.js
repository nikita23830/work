import React from 'react'
import ReportTask from 'Comp/Report/ReportTask'
import EveryDayReport from 'Comp/Report/EveryDayReport'

export const Report = (props) => {
  switch (props.page) {
    case 5:
      return <ReportTask {...props} />
    case 6:
      return <>No.</>
    case 7:
      return <>No.</>
    case 8:
      return <EveryDayReport {...props} />
  }
}
