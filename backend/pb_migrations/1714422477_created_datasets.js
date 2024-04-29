/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "j0hvukxc1h2c5ze",
    "created": "2024-04-29 20:27:57.924Z",
    "updated": "2024-04-29 20:27:57.924Z",
    "name": "datasets",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "aaz3jot5",
        "name": "name",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
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
  const collection = dao.findCollectionByNameOrId("j0hvukxc1h2c5ze");

  return dao.deleteCollection(collection);
})
