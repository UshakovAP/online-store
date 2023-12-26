const { Schema, model } = require('mongoose');

const schema = new Schema(
    {
        category: {
            type: Schema.Types.String,
            ref: 'Category',
            required: true,
        },
        count: {
            type: Number,
            required: true,
        },
        countToBuy: {
            type: Number,
            required: true,
        },
        name: {
            type: Schema.Types.String,
            ref: 'Product',
            required: true,
        },
        photo: {
            type: Schema.Types.String,
            ref: 'Product',
            required: true,
        },
        price: {
            type: Schema.Types.Number,
            ref: 'Product',
            required: true,
        },
        priceToBuy: {
            type: Number,
            required: true,
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        productId: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
        },
    },
    {
        timestamps: { createdAt: 'created_at' },
    }
);

module.exports = model('Basket', schema);
