// =======================
// 🔐 Mostrar / ocultar contraseña con el ojito
// =======================
document.querySelectorAll('.toggle-password').forEach(icon => {
  icon.addEventListener('click', () => {
    const targetId = icon.getAttribute('data-target');
    const input = document.getElementById(targetId);

    if (input.type === 'password') {
      input.type = 'text';
      icon.textContent = '🙈'; 
    } else {
      input.type = 'password';
      icon.textContent = '👁️'; 
    }
  });
});

// =======================
// 🔧 Inicializar Supabase
// =======================
const { createClient } = supabase;
const SUPABASE_URL = "https://trwfkxsvzhhgibkwxjpl.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRyd2ZreHN2emhoZ2lia3d4anBsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI4NzU4NDgsImV4cCI6MjA3ODQ1MTg0OH0.44UN4EEhSmYM96j8YqNnmCmfKx3TIl08B3UdbiGhsi8";
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);

// =======================
// 🔄 Redirigir si ya hay usuario logueado
// =======================
supabaseClient.auth.getUser().then(({ data: { user } }) => {
  if (user) window.location.href = '/profile.html';
});

// =======================
// ✉️ Registro con email y contraseña
// =======================
document.querySelector('#signup-form')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.querySelector('#signup-email').value;
  const password = document.querySelector('#signup-password').value;

  const { error } = await supabaseClient.auth.signUp({ email, password });

  if (error) alert('❌ Error al registrarse: ' + error.message);
  else alert('✅ Registro exitoso! Revisa tu email para confirmar.');
});

// =======================
// 🔑 Login con email y contraseña
// =======================
document.querySelector('#login-form')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.querySelector('#login-email').value;
  const password = document.querySelector('#login-password').value;

  const { error } = await supabaseClient.auth.signInWithPassword({ email, password });

  if (error) alert('❌ Error al iniciar sesión: ' + error.message);
  else window.location.href = '/profile.html';
});

// =======================
// 🌐 Login con Google
// =======================
document.querySelector('.btn-google')?.addEventListener('click', async (e) => {
  e.preventDefault();
  const { error } = await supabaseClient.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: '/profile.html' }
  });
  if (error) alert('❌ Error al iniciar con Google: ' + error.message);
});

// =======================
// 📘 Login con Facebook
// =======================
document.querySelector('.btn-facebook')?.addEventListener('click', async (e) => {
  e.preventDefault();
  const { error } = await supabaseClient.auth.signInWithOAuth({
    provider: 'facebook',
    options: { redirectTo: '/profile.html' }
  });
  if (error) alert('❌ Error al iniciar con Facebook: ' + error.message);
});

// =======================
// 💼 Login con LinkedIn
// =======================
document.querySelector('.btn-linkedin')?.addEventListener('click', async (e) => {
  e.preventDefault();
  const { error } = await supabaseClient.auth.signInWithOAuth({
    provider: 'linkedin_oidc',
    options: { redirectTo: '/profile.html' }
  });
  if (error) alert('❌ Error al iniciar con LinkedIn: ' + error.message);
});
