import { Category } from '../../models'

export const Query = {
    async category(_, args) {
        return await Category.findOne(args).lean()
    },
    async categories(_, args) {
        return await Category.find(args).lean()
    }
}

export const Mutation = {
    async addNewCategory(_, { category }) {
        return await Category.create(category)
    },
    updateCategory(_, args) {

    },
    deleteCategory(_, args) {

    }
}