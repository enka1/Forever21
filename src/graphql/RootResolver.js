import { Query as ProductQuery, Mutation as ProductMutation, Enum as ProductEnum } from './products/resolve'
import { Query as CategoryQuery, Mutation as CategoryMutation } from './categories/resolve'
import Scalar from './scalars/resolver'

export default {
    ...Scalar,
    Query: {
        ...ProductQuery,
        ...CategoryQuery
    },
    Mutation: {
        ...ProductMutation,
        ...CategoryMutation
    },
    ...ProductEnum,
}
