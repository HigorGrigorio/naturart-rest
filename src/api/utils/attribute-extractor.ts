/**
 * Identifier type of attribute
 */

import {Model} from "sequelize";
import {CreationAttributes} from "sequelize/types/model";

export type Identifier = string;

/**
 * Options used for {@link AttributeExtractor.extract}
 */
export type ExtractAttributeOptions = {
    /**
     * only required attributes.
     */
    isRequired?: boolean;

    /**
     * only not empty attributes.
     */
    notEmpty?: boolean;
}

export type ExtractOptions = {
    /**
     * Infer that all attributes are requires and not empty,
     * except for the rules defined in {@link ExtractOptions.attributes}.
     */
    all?: boolean

    /**
     * Contains the rules of attributes.
     */
    attributes?: { [key: string]: ExtractAttributeOptions | undefined }
}

export abstract class AttributeExtractor {

    protected static match(obj: any, key: string | number, options: ExtractAttributeOptions | undefined) {
        if (options && 'isRequired' in options) {
            if (!(key in obj)) {
                throw new Error(`The attribute ${key} is required.`)
            }

            if ('notEmpty' in options && obj[key] === '') {
                throw new Error(`The attribute ${key} cannot has been empty.`)
            }

            return true;
        }
        return false;
    }

    public static extract(obj: any, options?: ExtractOptions): {
        [key: string]: string
    } {
        if (!options || (!options['all'] && !options['attributes'])) {
            throw new Error('Undefined options to extract');
        }

        const extraction: any = {};

        Object.keys(obj).forEach(key => {
            if (options['attributes'] && key in options['attributes']) {
                const attr = options['attributes'][key];
                if (attr && attr['isRequired']) {
                    if (!(key in obj)) {
                        throw new Error(`The attribute ${key} is required.`)
                    }

                    if (attr['notEmpty'] && obj[key] === '') {
                        throw new Error(`The attribute ${key} cannot has been empty.`)
                    }

                    Object.defineProperty(extraction, key, {
                        value: obj[key],
                        enumerable: true,
                    });
                }
            } else if ('all' in options && options['all']) {
                Object.defineProperty(extraction, key, {
                    value: obj[key],
                    enumerable: true,
                });
            }
        });
        return extraction;
    }
}