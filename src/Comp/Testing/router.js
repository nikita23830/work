import React, { Component } from 'react'
import Testing from 'Comp/Testing'
import HistoryTesting from 'Comp/Testing/History'
import DevelopList from 'Comp/Testing/NewDevelop/list'
import AdminTest from 'Comp/Testing/Admin'

class RouterTest extends Component {
  render () {
    const { page } = this.props
    switch (page) {
      case 10: return <Testing {...this.props} />
      case 11: return <HistoryTesting {...this.props} />
      case 12: return <DevelopList {...this.props} />
      case 13: return <AdminTest {...this.props} />
    }
  }
}

export default RouterTest
