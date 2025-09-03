import { z } from 'zod';

const textPartSchema = z.object({
  type: z.enum(['text']),
  text: z.string().min(1).max(2000),
});

const filePartSchema = z.object({
  type: z.enum(['file']),
  mediaType: z.enum(['image/jpeg', 'image/png']),
  name: z.string().min(1).max(100),
  url: z.string().url(),
});

const partSchema = z.union([textPartSchema, filePartSchema]);

export const postRequestBodySchema = z.object({
  id: z.string().uuid(),
  message: z.object({
    id: z.string().uuid(),
    role: z.enum(['user']),
    parts: z.array(partSchema),
  }),
  selectedChatModel: z.enum([
    'gemini-2.0-flash-exp',
    'gemini-2.5-pro',
    'gemini-1.5-flash',
    'gemini-2.0-flash-reasoning',
    // Backward compatibility
    'chat-model',
    'chat-model-reasoning',
  ]),
  selectedVisibilityType: z.enum(['public', 'private']),
  apiKey: z.string().optional(), // Add API key field
});

export type PostRequestBody = z.infer<typeof postRequestBodySchema>;
