"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailValidator = void 0;
class EmailValidator {
    static isValid(email) {
        return email
            .toLowerCase()
            .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    }
}
exports.EmailValidator = EmailValidator;
//# sourceMappingURL=email-validator.js.map