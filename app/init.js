const watch = (object, onChange) => {
  const handler = {
    get (target, property, receiver) {
      try {
        return new Proxy(target[property], handler)
      } catch (err) {
        return Reflect.get(target, property, receiver)
      }
    },
    defineProperty (target, property, descriptor) {
      onChange(target[property], descriptor) // 赋值时触发回调函数
      return Reflect.defineProperty(target, property, descriptor)
    },
    deleteProperty (target, property) {
      onChange() // 删除属性时触发回调函数
      return Reflect.deleteProperty(target, property)
    }
  }
  return new Proxy(object, handler)
}

function dataChange () {
  setTimeout(() => {
    this._update()
  }, 0)
}

export function initData (vm, opts) {
  vm.options = opts
  vm.el = opts.el
  let data = opts.data()
  let proxyData = watch(data, dataChange.bind(vm))
  for (let prop in proxyData) {
    // vm[prop] = data[prop] // proxy
    Object.defineProperty(vm, prop , {
      get () {
        return proxyData[prop]
      },
      set (newValue) {
        proxyData[prop] = newValue
        // 批处理
        // vdom diff
        //vm._update()
      }
    })
  }
  console.log(vm)

  // 深度遍历所有的data
  // for (let prop in data) {
  //   // vm[prop] = data[prop] // proxy
  //   Object.defineProperty(vm, prop , {
  //     get () {
  //       return data[prop]
  //     },
  //     set (newValue) {
  //       console.log('change', newValue)
  //       data[prop] = newValue
  //       // 批处理
  //       // vdom diff
  //       vm._update()
  //     }
  //   })
  // }
}

// obj 中的所有属性都代理到vm上面 





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