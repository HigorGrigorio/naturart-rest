"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenGenerator = void 0;
class TokenGenerator {
    constructor(length) {
        // The characters that can be used in the tokens
        Object.defineProperty(this, "characters", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
        });
        // The length of the tokens to be generated
        Object.defineProperty(this, "tokenLength", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.tokenLength = length;
    }
    // Generate a new token
    generate() {
        return new Promise((resolve) => {
            let token = "";
            for (let i = 0; i < this.tokenLength; i++) {
                // Pick a random character from the set of possible characters
                token += this.characters.charAt(Math.floor(Math.random() * this.characters.length));
            }
            resolve(token);
        });
    }
}
exports.TokenGenerator = TokenGenerator;
exports.default = TokenGenerator;
//# sourceMappingURL=token-generator.js.map