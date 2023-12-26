const express = require('express');
const auth = require('../middleware/auth.middleware');
const { check, validationResult } = require('express-validator');
const Product = require('../models/Product');
const router = express.Router({ mergeParams: true });

router
    .route('/')
    .get(async (req, res) => {
        try {
            const list = await Product.find();
            res.status(200).send(list);
        } catch (error) {
            res.status(500).json({
                message: 'На сервере произошла ошибка. Попробуйте позже!',
            });
        }
    })
    .post(auth, [
        check('name', 'Наименование обязательно для заполнения!').exists({
            checkFalsy: true,
        }),
        check('category', 'Категория обязательна для заполнения!').exists({
            checkFalsy: true,
        }),
        check('price')
            .exists({
                checkFalsy: true,
            })
            .withMessage('Стоимость обязательна для заполнения!')
            .isNumeric()
            .withMessage('Стоимость введена некорректно!'),
        check('count')
            .exists({
                checkFalsy: true,
            })
            .withMessage('Количество обязательно для заполнения!')
            .isNumeric()
            .withMessage('Количество введено некорректно!'),
        check('photo', 'Фото обязательно для заполнения!').exists(),

        async (req, res) => {
            try {
                const errors = validationResult(req);

                if (!errors.isEmpty()) {
                    return res.status(400).json({
                        error: {
                            message: 'INVALID_DATA',
                            code: 400,
                        },
                    });
                }

                if (req.user._id.toString() === '657f0101458fdd62dedc4372') {
                    const newProduct = await Product.create({
                        ...req.body,
                    });
                    res.status(201).send(newProduct);
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
        },
    ]);

router
    .route('/:productId')
    .patch(auth, [
        check('name', 'Наименование обязательно для заполнения!').exists({
            checkFalsy: true,
        }),
        check('category', 'Категория обязательна для заполнения!').exists({
            checkFalsy: true,
        }),
        check('price')
            .exists({
                checkFalsy: true,
            })
            .withMessage('Стоимость обязательна для заполнения!')
            .isNumeric()
            .withMessage('Стоимость введена некорректно!'),
        check('count')
            .exists({
                checkFalsy: true,
            })
            .withMessage('Количество обязательно для заполнения!')
            .isNumeric()
            .withMessage('Количество введено некорректно!'),
        check('photo', 'Фото обязательно для заполнения!').exists(),

        async (req, res) => {
            try {
                const errors = validationResult(req);

                if (!errors.isEmpty()) {
                    return res.status(400).json({
                        error: {
                            message: 'INVALID_DATA',
                            code: 400,
                        },
                    });
                }

                const { productId } = req.params;

                if (req.user._id.toString() === '657f0101458fdd62dedc4372') {
                    const updatedProduct = await Product.findByIdAndUpdate(
                        productId,
                        req.body,
                        {
                            new: true,
                        }
                    );
                    res.send(updatedProduct);
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
        },
    ])
    .delete(auth, async (req, res) => {
        try {
            const { productId } = req.params;

            if (req.user._id.toString() === '657f0101458fdd62dedc4372') {
                const removedProduct = await Product.findById(productId);
                await removedProduct.deleteOne();
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
