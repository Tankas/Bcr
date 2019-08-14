import {initData, initFunc, initProps} from './init'
import {callHock} from './hook'
import {renderToDom} from './render'
export default function Bcr (options) {
  this._init(options)
}
Bcr.prototype._init = function (options) {
  initData(this, options) // options.data proxy vm上面
  initProps(this, options) // 
  initFunc(this, options)
  callHock(this, 'created')
  this._update()
  callHock(this, 'mounted')
}

Bcr.prototype._update = function () {
  let vnode = this.render() // 生成一个新的vnode tree
  let domtree = renderToDom(vnode) // vnode tree --> dom tree 
  this.$el = domtree
  if (this.el) {
    document.getElementById(this.el).innerHTML = ""
    document.getElementById(this.el).appendChild(domtree)
  }
}