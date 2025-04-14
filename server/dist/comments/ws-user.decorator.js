"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WsUser = void 0;
const common_1 = require("@nestjs/common");
exports.WsUser = (0, common_1.createParamDecorator)((data, context) => {
    const client = context.switchToWs().getClient();
    if (!client.user) {
        throw new Error('WsJwtAuthGuard must be used before WsUser decorator');
    }
    return client.user;
});
//# sourceMappingURL=ws-user.decorator.js.map