/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("380i10td4is9lmf")

  collection.name = "conversations"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("380i10td4is9lmf")

  collection.name = "conversation"

  return dao.saveCollection(collection)
})
