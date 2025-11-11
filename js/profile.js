// Inicializa Supabase
const supabaseUrl = "https://trwfkxsvzhhgibkwxjpl.supabase.co";
const supabaseKey = "TU_PUBLIC_ANON_KEY_AQUI";
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

const userName = document.getElementById("user-name");
const userEmail = document.getElementById("user-email");
const deleteBtn = document.getElementById("delete-btn");
const signoutBtn = document.getElementById("signout-btn");

// Cargar datos del usuario
async function loadUser() {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    alert("No has iniciado sesión");
    window.location.href = "signup.html";
    return;
  }

  userName.textContent = user.user_metadata?.full_name || "No disponible";
  userEmail.textContent = user.email;
}

loadUser();

// Eliminar cuenta
deleteBtn.addEventListener("click", async () => {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    alert("Inicia sesión primero");
    return;
  }

  if (!confirm("¿Estás seguro de eliminar tu cuenta? Esta acción no se puede deshacer.")) return;

  await fetch("/delete-user", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_id: user.id }),
  });

  alert("Usuario y datos eliminados");
  await supabase.auth.signOut();
  window.location.href = "signup.html";
});

// Cerrar sesión
signoutBtn.addEventListener("click", async () => {
  await supabase.auth.signOut();
  window.location.href = "signup.html";
});
