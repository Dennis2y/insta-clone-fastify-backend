import "fastify"
import type { TransactionHelpers } from "../core/database/database.transactions"


declare module "fastify" {
  interface FastifyInstance {
    transactions: TransactionHelpers
  }
  }
}
