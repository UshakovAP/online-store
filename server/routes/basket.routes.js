const express = require('express');
const auth = require('../middleware/auth.middleware');
const Basket = require('../models/Basket');
const mongoose = require('mongoose');
const router = express.Router({ mergeParams: true });

router
    .route('/')
    .get(auth, async (req, res) => {
        try {
            const { orderBy, equalTo } = req.query;
            const list = await Basket.find({
                [orderBy]: equalTo,
            });

            res.send(list);
        } catch (error) {
            res.status(500).json({
                message: 'На сервере произошла ошибка. Попробуйте позже!',
            });
        }
    })
    .post(auth, async (req, res) => {
        try {
            const newBasketItem = await Basket.create({
                ...req.body,
                _id: new mongoose.Types.ObjectId(),
            });
            res.status(201).send(newBasketItem);
        } catch (error) {
            res.status(500).json({
                message: 'На сервере произошла ошибка. Попробуйте позже!',
            });
        }
    });

router
    .route('/:basketItemId')
    .patch(auth, async (req, res) => {
        try {
            const { basketItemId } = req.params;
            const updatedbasketItem = await Basket.findByIdAndUpdate(
                basketItemId,
                req.body,
                {
                    new: true,
                }
            );

            res.send(updatedbasketItem);
        } catch (error) {
            res.status(500).json({
                message: 'На сервере произошла ошибка. Попробуйте позже!',
            });
        }
    })
    .delete(auth, async (req, res) => {
        try {
            const { basketItemId } = req.params;
            const removedBasketItem = await Basket.findById(basketItemId);

            if (removedBasketItem.userId.toString() === req.user._id) {
                await removedBasketItem.deleteOne();
                return res.send(null);
            } else {
                res.status(401).json({
                    message: 'Пользователь не авторизован!',
                });
            }
        } catch (error) {
            res.status(500).json({
                message: 'На сервере произошла ошибка. Попробуйте позже!',
            });
        }
    });

module.exports = router;
