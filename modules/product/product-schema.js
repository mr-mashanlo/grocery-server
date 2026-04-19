import { z } from 'zod';

const CategorySchema = z.object( {
  _id: z.string(),
  name: z.string(),
  slug: z.string()
} );

export const ProductSchema = z.object( {
  name: z.string().min( 3 ),
  slug: z.string(),
  description: z.string().optional(),
  price: z.number().min( 0 ),
  salePrice: z.number().min( 0 ).optional(),
  archived: z.boolean().optional(),
  images: z.array( z.string() ).min( 1 ),
  categories: z.array( CategorySchema ).min( 1 )
} );

export const ProductFilteringSchema = z.object( {
  name: z.string().optional(),
  price: z.number().optional(),
  archived: z.xor( [ z.string(), z.boolean() ] ).transform( v => v === 'true' ? true : false ).optional(),
  category: z.string().optional()
} ).transform( ( { category, ...others } ) => category ? { ...others, 'categories.slug': category } : others );

export const ProductSortingSchema = z.object( {
  order: z.preprocess(
    v => [ 'asc', 'desc' ].includes( v ) ? v : undefined,
    z.enum( [ 'asc', 'desc' ] ).transform( v => v === 'asc' ? 1 : -1  ).default( 1 ).optional()
  ),
  sort: z.preprocess(
    v => [ '_id', 'name', 'price', 'category' ].includes( v ) ? v : undefined,
    z.enum( [ '_id', 'name', 'price', 'category' ] ).default( '_id' ).optional()
  ).transform( v => v === 'category' ? 'categories.slug' : v )
} );

export const ProductPaginationSchema = z.object( {
  limit: z.string().transform( v => Number( v ) < 1 ? 0 : Number( v ) ).default( 10 ).optional(),
  page: z.string().transform( v => Number( v ) < 1 ? 1 : Number( v ) ).default( 1 ).optional()
} );
