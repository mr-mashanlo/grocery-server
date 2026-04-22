import { z } from 'zod';

export const OrderSchema = z.object( {
  user: z.string(),
  address: z.string(),
  status: z.enum( [ 'Processing', 'Delivering', 'Done', 'Canceled' ] ),
  total: z.number(),
  quantity: z.number(),
  products: z.array( z.object( {
    _id: z.string(),
    name: z.string(),
    quantity: z.number(),
    price: z.number(),
    image: z.object( {
      alt: z.string(),
      url: z.string()
    } )
  } ) )
} );

export const OrderFilteringSchema = z.object( {
  user: z.xor( [ z.string(), z.number() ] ).optional(),
  address: z.xor( [ z.string(), z.number() ] ).optional(),
  status: z.string().optional()
} );

export const OrderSortingSchema = z.object( {
  order: z.preprocess(
    v => [ 'asc', 'desc' ].includes( v ) ? v : undefined,
    z.enum( [ 'asc', 'desc' ] ).transform( v => v === 'asc' ? 1 : -1  ).default( 1 ).optional()
  ),
  sort: z.preprocess(
    v => [ '_id', 'totalPrice', 'totalQuantity' ].includes( v ) ? v : undefined,
    z.enum( [ '_id', 'totalPrice', 'totalQuantity' ] ).default( '_id' ).optional()
  )
} );

export const OrderPaginationSchema = z.object( {
  limit: z.string().transform( v => Number( v ) < 1 ? 0 : Number( v ) ).default( 10 ).optional(),
  page: z.string().transform( v => Number( v ) < 1 ? 1 : Number( v ) ).default( 1 ).optional()
} );