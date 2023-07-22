"use strict";
/**
 * Identifier type of attribute
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttributeExtractor = void 0;
class AttributeExtractor {
    static match(obj, key, options) {
        if (options && 'isRequired' in options) {
            if (!(key in obj)) {
                throw new Error(`The attribute ${key} is required.`);
            }
            if ('notEmpty' in options && obj[key] === '') {
                throw new Error(`The attribute ${key} cannot has been empty.`);
            }
            return true;
        }
        return false;
    }
    static extract(obj, options) {
        if (!options || (!options['all'] && !options['attributes'] && typeof options['attributes'] != 'object')) {
            throw new Error('Undefined options to extract');
        }
        const extraction = {};
        if ('all' in options) {
            for (let key in obj) {
                if (options['attributes'] && (key in options['attributes'])) {
                    const attr = options['attributes'][key];
                    if (!attr) {
                        continue;
                    }
                    if (attr.isRequired && !(key in obj)) {
                        throw new Error(`The attribute ${key} is required.`);
                    }
                    if (attr.notEmpty && obj[key] === '') {
                        throw new Error(`The attribute ${key} cannot has been empty.`);
                    }
                }
                Object.defineProperty(extraction, key, {
                    value: obj[key],
                    enumerable: true,
                });
            }
        }
        else if ('attributes' in options) {
            for (let key in options['attributes']) {
                const attr = options['attributes'][key];
                if (!attr) {
                    continue;
                }
                if (attr.isRequired && !(key in obj)) {
                    throw new Error(`The attribute ${key} is required.`);
                }
                if (attr.notEmpty && obj[key] === '') {
                    throw new Error(`The attribute ${key} cannot has been empty.`);
                }
                Object.defineProperty(extraction, key, {
                    value: obj[key],
                    enumerable: true,
                });
            }
        }
        return extraction;
    }
}
exports.AttributeExtractor = AttributeExtractor;
//# sourceMappingURL=attribute-extractor.js.map