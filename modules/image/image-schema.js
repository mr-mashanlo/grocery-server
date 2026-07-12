import { z } from 'zod';

export const ImageSchema = z.object( {
  path: z.string().min( 3 ),
  url: z.string().min( 3 ),
  alt: z.string().min( 3 )
} );

export const ImageFilteringSchema = z.object( {
  alt: z.string().optional()
} );

export const ImageSortingSchema = z.object( {
  order: z.preprocess(
    v => [ 'asc', 'desc' ].includes( v ) ? v : undefined,
    z.enum( [ 'asc', 'desc' ] ).transform( v => v === 'asc' ? 1 : -1  ).default( -1 ).optional()
  ),
  sort: z.preprocess(
    v => [ '_id', 'alt' ].includes( v ) ? v : undefined,
    z.enum( [ '_id', 'alt' ] ).default( '_id' ).optional()
  )
} );

export const ImagePaginationSchema = z.object( {
  limit: z.string().transform( v => Number( v ) < 1 ? 0 : Number( v ) ).default( 10 ).optional(),
  page: z.string().transform( v => Number( v ) < 1 ? 1 : Number( v ) ).default( 1 ).optional()
} );