const { Cart } = require("../model/Cart");

exports.fetchCartByUser = async (req, res) => {
  const { id } = req.user;
  try {
    const cartItems1 = await Cart.find({ user: id }).populate("product");
    console.log("object");
    console.log(cartItems1);

    // Check each item's quantity against the available stock
    for (const item of cartItems1) {
      console.log(item.quantity + "," + item.product.stock + "," + item._id);

      if (item.quantity <= item.product.stock + 5) {
        // Quantity exceeds available stock, delete the item from the cart
        await Cart.findByIdAndDelete(item._id);
      }
    }

    // Fetch updated cart items after deletion
    const cartItems2 = await Cart.find({ user: id }).populate("product");
    console.log("object");
    console.log(cartItems2);

    res.status(200).json(cartItems2);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.addToCart = async (req, res) => {
  const { id } = req.user;
  const cart = new Cart({ ...req.body, user: id });
  try {
    const doc = await cart.save();
    const result = await doc.populate("product");
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.deleteFromCart = async (req, res) => {
  const { id } = req.params;
  try {
    const doc = await Cart.findByIdAndDelete(id);
    res.status(200).json(doc);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.updateCart = async (req, res) => {
  const { id } = req.params;
  try {
    const cart = await Cart.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    const result = await cart.populate("product");

    res.status(200).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
};
