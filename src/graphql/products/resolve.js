import mongoose from 'mongoose'

import { Product, Pattern } from '../../models'

function modifyProductCritera(criteria, minPrice, maxPrice) {
   let modifyCriteria = {}
   let { categories, name } = criteria
   if (categories)
      modifyCriteria = {
         ...modifyCriteria,
         categories: {
            $in: categories.map(category => new mongoose.Types.ObjectId(category))
         }
      }
   if (name)
      modifyCriteria = {
         ...modifyCriteria,
         name: new RegExp(criteria.name, 'i')
      }
   if (minPrice && maxPrice)
      modifyCriteria = {
         ...modifyCriteria,
         exportPrice: {
            $gte: minPrice,
            $lte: maxPrice
         }
      }
   return modifyCriteria
}

export const Query = {
   async product(_, { id }) {
      return await Product
         .findById(id)
         .lean()
   },
   async products(_, { criteria, sort, skip, limit, minPrice, maxPrice }) {
      return await Product.find({ ...modifyProductCritera(criteria, minPrice, maxPrice) })
         .populate('patterns')
         .sort(sort)
         .skip(skip)
         .limit(limit)
         .lean()
   }
}

export const Mutation = {
   async addNewProduct(_, { product }) {
      let productMongoID = mongoose.Types.ObjectId()
      let { patterns, categories, importDate, importPrice, exportPrice, quantity } = product
      if (patterns)
         patterns = patterns.map(pattern => {
            return {
               ...pattern,
               product: productMongoID
            }
         })
      patterns = await Pattern.insertMany(patterns)
      return await Product.create({
         ...product,
         _id: productMongoID,
         categories: categories ? categories.map(category => mongoose.Types.ObjectId(category)) : [],
         patterns,
         importDate: importDate || new Date(),
         importPrice: importPrice || 0,
         exportPrice: exportPrice || 0,
         quantity: quantity || 0
      })
   },

   async updateProduct(_, { product }) {
      let { categories } = product
      if (categories)
         categories = categories.map(category => new mongoose.Types.ObjectId(category))
      return await Product.findByIdAndUpdate(product._id, {
         $set: {
            ...product,
            categories
         }
      }, { new: true }).lean()
   }
}

export const Enum = {
   ProductSortCases: {
      name_ASC: ['name'],
      name_DESC: [
         'name', -1
      ],
      importDate_ASC: ['importDate'],
      importDate_DESC: [
         'importDate', -1
      ],
      importPrice_ASC: ['importPrice'],
      importPrice_DESC: [
         'importPrice', -1
      ],
      exportPrice_ASC: ['exportPrice'],
      exportPrice_DESC: ['exportPrice', -1]
   }
}