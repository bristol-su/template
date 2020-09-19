let registerComponent = (name, component) => {
    if(!window.hasOwnProperty('injector')) {
        window.injector = new VueComponentInjector;
    }

    window.injector.register(name, component);
}

let getComponents = () => {
    if(!window.hasOwnProperty('injector')) {
        window.injector = new VueComponentInjector;
    }

    return window.injector.get();
}

class VueComponentInjector {

    constructor() {
        this._components = {};
    }

    register(name, component) {
        this._components[name] = component;
    }

    get() {
        return this._components;
    }

}

export {registerComponent, getComponents}
