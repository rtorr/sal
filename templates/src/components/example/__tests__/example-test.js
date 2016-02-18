import expect from 'expect'
import { example } from './../example'

describe('example test', () => {
  it('Will add + 1 to a number', () => {
    expect(example(1)).toBe(2)
  })
})
