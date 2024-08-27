// const express = require('express');
import express from "express";
// Add item to cart
// router.post('/cart', authenticate,);
import {Cart} from "../Schema/CartSchema.js";
export const addItemToCart = async (req, res) => {
    console.log(`testing message`);
    const { productId, quantity } = req.body;
    const userId = req.user._id;
    console.log(`userId`, userId);

    try {
        let cart = await Cart.findOne({ userId }).populate('items.productId');
        // Log the cart before population to see the original structure


        if (cart) {
            // If the cart exists, update it
            const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
            if (itemIndex > -1) {
                // If the item already exists in the cart, update the quantity
                cart.items[itemIndex].quantity += quantity;
            } else {
                // If the item doesn't exist, add it to the cart
                cart.items.push({ productId, quantity });
            }
        } else {
            // If the cart doesn't exist, create a new one
            cart = new Cart({
                userId,
                items: [{ productId, quantity }] // Corrected from 'item: []' to 'items: []'
            });
        }

        // Save the cart
        await cart.save();

        res.status(200).json(cart);
    } catch (error) {
        console.log(`logged error`, error.message);
        res.status(500).json({ error: 'Something went wrong' });
    }
}

export const getCartItem = async (req, res) => {
    const userId = req.user._id;

    try {
        const cart = await Cart.findOne({ userId }).populate('items.productId');
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
}

// // Get user's cart
// router.get('/cart', authenticate, async (req, res) => {
//     const userId = req.user._id;

//     try {
//         const cart = await Cart.findOne({ userId }).populate('items.productId');
//         res.status(200).json(cart);
//     } catch (error) {
//         res.status(500).json({ error: 'Something went wrong' });
//     }
// });

// module.exports = router;
