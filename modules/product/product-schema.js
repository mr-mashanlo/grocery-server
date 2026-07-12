import { z } from 'zod';

export const ProductSchema = z.object( {
  name: z.string().min( 3 ),
  slug: z.string(),
  sku: z.string(),
  description: z.string().optional(),
  price: z.number().min( 0 ),
  archived: z.boolean().optional(),
  images: z.array( z.string() ),
  categories: z.array( z.string() )
} );

export const ProductFilteringSchema = z.object( {
  name: z.string().optional(),
  price: z.number().optional(),
  archived: z.xor( [ z.string(), z.boolean() ] ).transform( v => v === 'true' ? true : false ).optional(),
  category: z.string().optional()
} );

export const ProductSortingSchema = z.object( {
  order: z.preprocess(
    v => [ 'asc', 'desc' ].includes( v ) ? v : undefined,
    z.enum( [ 'asc', 'desc' ] ).transform( v => v === 'asc' ? 1 : -1  ).default( -1 ).optional()
  ),
  sort: z.preprocess(
    v => [ '_id', 'name', 'price', 'category' ].includes( v ) ? v : undefined,
    z.enum( [ '_id', 'name', 'price', 'category' ] ).default( '_id' ).optional()
  )
} );

export const ProductPaginationSchema = z.object( {
  limit: z.string().transform( v => Number( v ) < 1 ? 0 : Number( v ) ).default( 10 ).optional(),
  page: z.string().transform( v => Number( v ) < 1 ? 1 : Number( v ) ).default( 1 ).optional()
} );
