import React from 'react'
import { example } from './../../components/example/example'

console.log('example components dir', example(1))

class Test extends React.Component {
  render () {
    return (
      <div>Test</div>
    )
  }
}

console.log('test react works:', Test)
