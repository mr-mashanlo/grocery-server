import { z } from 'zod';

export const CategorySchema = z.object( {
  image: z.string().min( 3 ),
  name: z.string().min( 3 ),
  archived: z.boolean()
} );

export const CategoryFilteringSchema = z.object( {
  name: z.string().optional(),
  archived: z.xor( [ z.string(), z.boolean() ] ).transform( v => v === 'true' ? true : false ).optional()
} );

export const CategorySortingSchema = z.object( {
  order: z.preprocess(
    v => [ 'asc', 'desc' ].includes( v ) ? v : undefined,
    z.enum( [ 'asc', 'desc' ] ).transform( v => v === 'asc' ? 1 : -1  ).default( 1 ).optional()
  ),
  sort: z.preprocess(
    v => [ '_id', 'name', 'archived' ].includes( v ) ? v : undefined,
    z.enum( [ '_id', 'name', 'archived' ] ).default( '_id' ).optional()
  )
} );

export const CategoryPaginationSchema = z.object( {
  limit: z.string().transform( v => Number( v ) < 1 ? 0 : Number( v ) ).default( 10 ).optional(),
  page: z.string().transform( v => Number( v ) < 1 ? 1 : Number( v ) ).default( 1 ).optional()
} );
