"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NaturartResponse = void 0;
class NaturartResponse {
    /**
     * Response constructor
     */
    constructor(props) {
        var _a, _b;
        /**
         * True in only case of error.
         */
        Object.defineProperty(this, "isError", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * Message of response.
         */
        Object.defineProperty(this, "msg", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * Data of response.
         */
        Object.defineProperty(this, "data", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "code", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.isError = (_a = props === null || props === void 0 ? void 0 : props.isError) !== null && _a !== void 0 ? _a : false;
        this.code = ((_b = props === null || props === void 0 ? void 0 : props.code) !== null && _b !== void 0 ? _b : this.isError) ? 400 : 200;
        this.data = props === null || props === void 0 ? void 0 : props.data;
        this.msg = props === null || props === void 0 ? void 0 : props.msg;
    }
}
exports.NaturartResponse = NaturartResponse;
exports.default = NaturartResponse;
//# sourceMappingURL=naturart-response.js.map