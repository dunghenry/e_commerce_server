const mongoose = require('mongoose');
const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        brand: {
            type: String,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    },
);
//created index
// productSchema.index({ name: 'text' });
const Product =
    mongoose.models.Product || mongoose.model('Product', productSchema);
module.exports = Product;
