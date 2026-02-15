import { supabase, isSupabaseConfigured } from "./supabase";

export async function signIn(email: string, password: string) {
  if (!isSupabaseConfigured()) {
    return { error: { message: "Supabase is not configured" } };
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return { data, error };
}

export async function signOut() {
  if (!isSupabaseConfigured()) return;
  await supabase.auth.signOut();
}

export async function getSession() {
  if (!isSupabaseConfigured()) return null;
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return session;
}

export async function getUser() {
  if (!isSupabaseConfigured()) return null;
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

export function onAuthStateChange(
  callback: (event: string, session: unknown) => void
) {
  if (!isSupabaseConfigured()) return { data: { subscription: { unsubscribe: () => {} } } };
  return supabase.auth.onAuthStateChange(callback);
}
