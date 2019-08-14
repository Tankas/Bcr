import React, { Component } from 'react'
import Bcr from './bcr'
export function renderToDom (vnode) {
  return deep(vnode)
}
function deep (vnode, parent) {
  let dom = null
  let children = vnode.props.children
  if (!parent) {
    parent = document.createElement(vnode.type)
  }
  // 如果是组件 
  // if (typeof vnode.type === 'function') {
  //   return ComponentTurnToDom(vnode)
  // }
  if (vnode.props.onClick) {
    parent.addEventListener('click', vnode.props.onClick, false)
  }
  if (!Array.isArray(children) && typeof children == 'object') {
    children = [children]
  }
  if (!Array.isArray(children)) {
    dom = document.createElement(vnode.type)
    dom.innerText = children
    return dom
  } else {
    for (let i = 0; i < children.length; i++) {
      if (typeof children[i].type === 'function') {
        let cdom = ComponentTurnToDom(children[i])
        parent.appendChild(cdom)
        continue
      }
      // 下面还有子节点
      if (match(children[i])) {
        let parentDom = document.createElement(children[i].type)
        let d = deep(children[i], parentDom)
        parent.appendChild(d)
      } else {
        dom = document.createTextNode(children[i])
        parent.appendChild(dom)
        continue
      }
    }
  }
  return parent
}
function match (vnode) {
  if (typeof vnode == 'object') {
    return true
  } else {
    return false
  }
}
// 转化组件为dom 
function ComponentTurnToDom (vnodeComponent) {
  let instance = new vnodeComponent.type()
  let options = {
    data: instance.data,
    render: instance.render
  }
  let vm = new Bcr(options)
  return vm.$el
}