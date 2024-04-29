/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("380i10td4is9lmf")

  collection.listRule = "@request.auth.id != \"\" "
  collection.viewRule = "@request.auth.id != \"\" "
  collection.updateRule = "@request.auth.id != \"\" "

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("380i10td4is9lmf")

  collection.listRule = null
  collection.viewRule = null
  collection.updateRule = null

  return dao.saveCollection(collection)
})
