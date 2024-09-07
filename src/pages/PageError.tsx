import React from 'react'

class PageError extends React.Component {
  state = { hasError: false }

  static getDerivedStateFromError(error: any) {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      // 显示自定义的错误页面
      return <div>111</div>
    }

    // eslint-disable-next-line react/prop-types
    return this.props.children
  }
}

export default PageError
