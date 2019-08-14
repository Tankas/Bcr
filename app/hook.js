export function callHock (vm, name) {
  if (vm.options[name]) {
    vm.options[name].bind(vm)()
  }
}