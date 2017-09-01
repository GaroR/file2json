"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.promise = {
    internalValue: {},
    valueListener: function (value) { },
    set value(newValue) {
        this.internalValue = newValue;
        this.valueListener(this.internalValue);
    },
    get value() {
        return this.internalValue;
    },
    registerListener: function (newListener) {
        this.valueListener = newListener;
    }
};
