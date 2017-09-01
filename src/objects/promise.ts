export const promise = {
    internalValue: {},
    valueListener: function (value: any) { },
    set value(newValue: any) {
        this.internalValue = newValue;
        this.valueListener(this.internalValue);
    },
    get value() {
        return this.internalValue;
    },
    registerListener: function (newListener: any) {
        this.valueListener = newListener;
    }
}