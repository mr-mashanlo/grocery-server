import { z } from 'zod';

export const AddressSchema = z.object( {
  user: z.string(),
  city: z.string(),
  address: z.string(),
  phone: z.string()
} );

export const AddressFilteringSchema = z.object( {
  city: z.string().optional(),
  address: z.string().optional(),
  phone: z.string().optional()
} );

export const AddressSortingSchema = z.object( {
  order: z.preprocess(
    v => [ 'asc', 'desc' ].includes( v ) ? v : undefined,
    z.enum( [ 'asc', 'desc' ] ).transform( v => v === 'asc' ? 1 : -1  ).default( -1 ).optional()
  ),
  sort: z.preprocess(
    v => [ '_id', 'city', 'address' ].includes( v ) ? v : undefined,
    z.enum( [ '_id', 'city', 'address' ] ).default( '_id' ).optional()
  )
} );

export const AddressPaginationSchema = z.object( {
  limit: z.string().transform( v => Number( v ) < 1 ? 0 : Number( v ) ).default( 10 ).optional(),
  page: z.string().transform( v => Number( v ) < 1 ? 1 : Number( v ) ).default( 1 ).optional()
} );