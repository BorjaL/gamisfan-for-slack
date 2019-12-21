import * as Router from "koa-router";

const router = new Router({ prefix: "/health" });

router.get("/", async (ctx) => {
    ctx.body = {
        message: "gamisfan for slack is healthy",
        version: "0.1.0",
    };
});

export default router;
