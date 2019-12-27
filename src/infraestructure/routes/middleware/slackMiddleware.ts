import * as crypto from "crypto";
import * as qs from "qs";
import { config } from "../../../config";

function verificate(ctx: any, next: any) {
    const time = Math.floor(new Date().getTime() / 1000);
    if ((time - ctx.request.header["x-slack-request-timestamp"]) > 60 * 5) {
        ctx.status = 400;
        ctx.body = "Timeout sorry";
        return;
    }

    const hmac = crypto.createHmac("sha256", config.slack.signingSecret);
    hmac.update(`v0:${ctx.request.header["x-slack-request-timestamp"]}:${qs.stringify(ctx.request.body, { format: "RFC1738" })}`);
    const signature = `v0=${hmac.digest("hex")}`;

    if (signature === ctx.request.header["x-slack-signature"]) {
        next();
    } else {
        ctx.status = 400;
        ctx.body = "You don't look like a slack request, do you?";
    }
}

export const slackMiddleware = {
    verificate,
};
