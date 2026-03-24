import { z } from "zod";

export const previewLimitSchema = z.object({
  limit: z.coerce.number().int().min(1).max(20).optional(),
});

export const emptyQuerySchema = z.object({}).strict();
