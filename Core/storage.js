var localforage = null
if (window.localforage) {
  localforage = window.localforage
} else {
  localforage = require("./Lib/localforage.min.js")
}

export class TurtleStorage {
  constructor(store_name) {
    this.name = store_name
    this.instance = localforage.createInstance({
      name: store_name
    })
  }

  async set(name, value) {
    return await this.instance.setItem(name, value)
  }

  async get(name) {
    return await this.instance.getItem(name)
  }

  async destroy(name) {
    return await this.instance.removeItem(name)
  }

  async destroyAll(){
    return await this.instance.clear()
  }
  
  async size(){
    return await this.instance.length()
  }
  
  each(callback) {
    this.instance.iterate(callback)
  }

  async list() {
    return await this.instance.keys()
  }
}
