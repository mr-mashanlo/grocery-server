import { z } from 'zod';

export const AuthSchema = z.object( {
  nickname: z.string().min( 4, 'Nickname must be at least 4 characters long' ),
  password: z.string().min( 8, 'Password must be at least 8 characters long' )
} );