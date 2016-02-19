var React = require('react')
import { example } from './../../components/example/example'
import typescript_example from './typescript_example'

console.log(typescript_example.a)

console.log('example components dir', example(1))

class Test extends React.Component {
  render () {
    return (
      <div>Test</div>
    )
  }
}

console.log('test react works:', Test)
