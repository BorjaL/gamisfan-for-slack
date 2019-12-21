import server from "./infraestructure/server";
import { logger } from "./logger";

server.listen(8080);

logger.info("Server running on port 8080");
