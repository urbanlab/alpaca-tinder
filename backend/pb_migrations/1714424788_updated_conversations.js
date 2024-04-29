/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("380i10td4is9lmf")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "hpr5uzwn",
    "name": "eval",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("380i10td4is9lmf")

  // remove
  collection.schema.removeField("hpr5uzwn")

  return dao.saveCollection(collection)
})
