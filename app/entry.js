import React, { Component } from 'react'
import Button from './demo/buttonComponent'

import Bcr from './bcr'
let ct = new Bcr({
  el: 'app',
  created () {
    console.log('created', this)
  },
  mounted () {
    console.log('mount', this)
  },
  props () {
    return {
      pp: 'pppp'
    }
  },
  data () {
    return {
      name: 'tanka',
      age: 18,
      ff: {
        name: 'ffff'
      },
      arr: [1,2,3]
    }
  },
  render () {
    return <div>
      <h1>title</h1>
      <p>
        <p>{this.arr[0]}</p>
        <p>name:{this.name}</p>
        <p>
          <span onClick={this.test}>age::{this.age}</span>
        </p>
      </p>
      <div>
        {this.arr[9]}
      </div>
    </div>
  },
  methods: {
    test() {
      this.arr[0] ++
    }
  }
})

function createTypeFunc (type) {
  return function (obj) {
    return Object.prototype.toString.call(obj) === '[object ' + type + ']'
  }
}

let isObject = createTypeFunc('Object')
let isArray = createTypeFunc('Array')

