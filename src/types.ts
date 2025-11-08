import { z } from "zod";

// 基础组件接口
export interface Component {
  type: string;
  props?: Record<string, any>;
  children?: Component[];
}

// Component Schema (递归定义，支持嵌套)
export const ComponentSchema: z.ZodType<Component> = z.lazy(() =>
  z.object({
    type: z.string(),
    props: z.record(z.string(), z.any()).optional(),
    children: z.array(ComponentSchema).optional(),
  })
);

// Email 请求 Schema
export const EmailRequestSchema = z.object({
  subject: z.string().optional(),
  component: ComponentSchema,
});

export type EmailRequest = z.infer<typeof EmailRequestSchema>;
