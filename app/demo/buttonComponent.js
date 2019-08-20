import React, { Component } from 'react'
export default class Button {
  constructor () {
    console.log('button component create')
  }
  data () {
    return {
      name: 'bai'
    }
  }
  render () {
    return <div>
      <h1>我是组件title</h1>
      <p onClick={()=>{this.name+='1'}}>大大大{this.name}</p>
    </div>
  }
}
