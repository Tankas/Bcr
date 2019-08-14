export function initData (vm, opts) {
  vm.options = opts
  vm.el = opts.el
  let data = opts.data()
  // 深度遍历所有的data
  for (let prop in data) {
    // vm[prop] = data[prop] // proxy
    Object.defineProperty(vm, prop , {
      get () {
        return data[prop]
      },
      set (newValue) {
        console.log('change', newValue)
        data[prop] = newValue
        // 批处理
        // vdom diff
        vm._update()
      }
    })
  }
}
export function initProps (vm, opts) {
  vm.props = {}
}
export function initFunc (vm, opts) {
  vm.render = opts.render.bind(vm)
  if (opts.methods) {
    let methods = Object.keys(opts.methods)
    for (let i = 0; i < methods.length; i++) {
      vm[methods[i]] = opts.methods[methods[i]].bind(vm)
    }
  }
}