"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Utils = void 0;
const sequelize_1 = require("sequelize");
class Utils {
    static fn(value) {
        return (0, sequelize_1.fn)('upper', (0, sequelize_1.fn)('remove_accents', value));
    }
    static fnLiteral(value) {
        return (0, sequelize_1.fn)('upper', (0, sequelize_1.fn)('remove_accents', (0, sequelize_1.literal)(value)));
    }
    static where(key, value) {
        return (0, sequelize_1.where)(this.fnLiteral(key), this.fn(value));
    }
    static normalizeKey(key) {
        let number = typeof key == "number" ? key : parseInt(key, 10);
        if (isNaN(number)) {
            throw new Error('Supports only number!');
        }
        return number;
    }
    static merge(to, from) {
        Object.keys(to).forEach(key => {
            if (key in from) {
                this.setPropertyOf(to, key, this.getPropertyOf(from, key));
            }
        });
        return to;
    }
    static getPropertyOf(obj, key) {
        return obj[key];
    }
    static setPropertyOf(obj, key, value) {
        obj[key] = value;
    }
}
exports.Utils = Utils;
//# sourceMappingURL=utils.js.map