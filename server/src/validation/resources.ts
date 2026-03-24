import { z } from "zod";

export const resourceTypeSchema = z.enum(["Form", "Template", "Guide"]);
export const resourceSourceSystemSchema = z.enum([
  "Intranet",
  "SharePoint",
  "Microsoft Graph",
  "HR System",
]);

export const resourceRecordSchema = z.object({
  id: z.string().min(1),
  departmentId: z.string().min(1),
  departmentName: z.string().min(1),
  category: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  resourceType: resourceTypeSchema,
  sourceSystem: resourceSourceSystemSchema,
  targetUrl: z.string().url(),
  lastUpdated: z.string().datetime(),
  owner: z.string().min(1),
  isActive: z.boolean(),
});

export const resourceQuerySchema = z.object({
  departmentId: z.string().min(1).optional(),
  resourceType: resourceTypeSchema.optional(),
});
