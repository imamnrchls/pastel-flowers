/**
 * LAYER 3 REGISTRY — Pendaftaran Tema Undangan
 * Setiap tema mendaftarkan definisinya melalui window.LKThemes.register(id, theme).
 */
(function () {
  "use strict";

  var themes = Object.create(null);

  window.LKThemes = {
    register: function (id, theme) {
      if (!id || !theme) return;
      themes[id] = Object.assign({ id: id }, theme);
    },
    get: function (id) {
      if (id && Object.prototype.hasOwnProperty.call(themes, id)) {
        return themes[id];
      }
      if (Object.prototype.hasOwnProperty.call(themes, "pastel-flowers")) {
        return themes["pastel-flowers"];
      }
      var keys = Object.keys(themes);
      return keys.length ? themes[keys[0]] : null;
    },
    has: function (id) {
      return Boolean(id) && Object.prototype.hasOwnProperty.call(themes, id);
    },
    list: function () {
      return Object.keys(themes);
    }
  };
})();
