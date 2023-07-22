import {fn as fns, Includeable, literal as literals, Model, ModelStatic, Sequelize, where as wheres} from "sequelize";
import {Fn, Where} from "sequelize/types/utils";
import bcrypt from "bcrypt";

export class Utils {
    static fn(value: string): Fn {
        return fns('upper',
            fns('remove_accents',
                value
            )
        );
    }

    static fnLiteral(value: string): Fn {
        return fns('upper',
            fns('remove_accents',
                literals(value)
            )
        );
    }

    static where(key: string, value: string): Where {
        return wheres(
            this.fnLiteral(key),
            this.fn(value)
        )
    }

    static normalizeKey(key: string | number): number {
        let number = typeof key == "number" ? key : parseInt(key, 10);
        if (isNaN(number)) {
            throw new Error('Supports only number!');
        }
        return number;
    }

    static merge<T extends object = any, U extends object = any>(to: T, from: U): any {
        Object.keys(to).forEach(key => {
            if (key in from) {
                this.setPropertyOf(to, key,
                    this.getPropertyOf(from, key)
                );
            }
        });
        return to;
    }

    static getPropertyOf(obj: any, key: string): any {
        return obj[key];
    }

    static setPropertyOf(obj: any, key: string, value: any): void {
        obj[key] = value;
    }
}
