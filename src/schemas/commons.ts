import { UUID } from "node:crypto"
import { z } from "zod"

import { Validators } from "@/libs/validators.ts"

export const uuidSchema = z.custom<UUID>().refine(Validators.isUUID)
