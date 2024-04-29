// pb_migrations/1687801090_initial_admin.js
migrate((db) => {
  const dao = new Dao(db);

  const admin = new Admin();
  admin.email = "admin@admin.org"
  admin.setPassword("changeme")

  dao.saveAdmin(admin)
}, (db) => { // optional revert
  const dao = new Dao(db);

  try {
      const admin = dao.findAdminByEmail("admin@admin.org")

      dao.deleteAdmin(admin)
  } catch (_) { /* most likely already deleted */ }
})