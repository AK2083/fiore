(function(window) {
    window["env"] = window["env"] || {};
  
    // Environment variables
    window["env"]["supabaseUrl"] = "${SUPABASE_URL}";
    window["env"]["supabaseKey"] = "${SUPABASE_KEY}";
  })(this);