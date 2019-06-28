const {LuluMenu} = require("../models/index")

async function findAllLuluMenu(ctx) {
  const luluMenus = await LuluMenu.findAll()
  ctx.body = luluMenus
}

module.exports = {
  findAllLuluMenu
}
