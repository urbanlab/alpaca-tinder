/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "380i10td4is9lmf",
    "created": "2024-04-29 20:28:30.028Z",
    "updated": "2024-04-29 20:28:30.028Z",
    "name": "conversation",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "x1dd9wc1",
        "name": "data",
        "type": "json",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "maxSize": 2000000
        }
      },
      {
        "system": false,
        "id": "8cospmvz",
        "name": "dataset",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "j0hvukxc1h2c5ze",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("380i10td4is9lmf");

  return dao.deleteCollection(collection);
})
