import express from "express";
import bodyParser from "body-parser";
import { createClient } from "@supabase/supabase-js";

const app = express();
app.use(bodyParser.json());

const SUPABASE_URL = "https://trwfkxsvzhhgibkwxjpl.supabase.co";
const SUPABASE_SERVICE_ROLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRyd2ZreHN2emhoZ2lia3d4anBsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2Mjg3NTg0OCwiZXhwIjoyMDc4NDUxODQ4fQ.aFB4YYE7Xp5yKwR07_suw8bT_hXzgDUf6xIjVfZHm1Y"; 
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

// Endpoint para eliminar usuario
app.post("/delete-user", async (req, res) => {
  const { user_id } = req.body;
  if (!user_id) return res.status(400).json({ error: "Falta user_id" });

  try {
    // Elimina datos de la tabla 'profiles'
    await supabase.from("profiles").delete().eq("id", user_id);

    // Elimina usuario de Auth
    const { error } = await supabase.auth.admin.deleteUser(user_id);
    if (error) throw error;

    res.json({ message: "Usuario eliminado correctamente" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al eliminar usuario" });
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor escuchando en puerto ${PORT}`));
