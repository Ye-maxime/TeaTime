const {Order} = require('../models/index')

class ProductOrderDTO {
  constructor(id, name, price, quantity) {
    this.id = id;  //productId
    this.name = name; //productName
    this.price = price; //productPrice
    this.quantity = quantity; //productQuantity
  }
}

async function findOrder(ctx) {
  const order = await Order.findByPk(ctx.params.orderId)
  const drinks = await order.getDrinks()
  const result = drinks.map((drink) =>
    new ProductOrderDTO(drink.id, drink.name, drink.price, drink.drinkOrder.quantity)
  )
  ctx.body = result
}

module.exports = {
  findOrder
}
