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
    }
  },
  render () {
    return <div>
      <Button></Button>
      <h1>title</h1>
      <p>
        <p>name:{this.name}</p>
        <p>
          <span onClick={this.test}>age::{this.age}</span>
        </p>
      </p>
      <div>
        sadfads
      </div>
    </div>
  },
  methods: {
    test() {
      this.age ++
      this.name = 'change'
    }
  }
})