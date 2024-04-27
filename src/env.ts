import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  // Only accessible on server side, but will have it's typings available on client side
  server: {
    SUPABASE_KEY: z.string().url(),
  },
  //   client: {
  //     NEXT_PUBLIC_PUBLISHABLE_KEY: z.string().min(1),
  //   },
  // For Next.js >= 13.4.4, you only need to destructure client variables:
  experimental__runtimeEnv: {
    // NEXT_PUBLIC_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_PUBLISHABLE_KEY,
  },
});
