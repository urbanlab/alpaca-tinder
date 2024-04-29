/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("j0hvukxc1h2c5ze")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "6ekwjvzp",
    "name": "conversations",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "380i10td4is9lmf",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("j0hvukxc1h2c5ze")

  // remove
  collection.schema.removeField("6ekwjvzp")

  return dao.saveCollection(collection)
})
