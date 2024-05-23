// /profile +page.server.ts
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

async function fetchProfile(supabase:any, userId:any) {
  const { data: profiles } = await supabase
    .from('profiles')
    .select(`username, avatar_url`)
    .eq('id', userId)
    .single();
  return profiles;
}

export const load: PageServerLoad = async ({ locals: { supabase, safeGetSession } }) => {
  const { session } = await safeGetSession();

  if (!session) {
    throw redirect(303, '/'); // Redirect to login if not authenticated
  }

  const profile = await fetchProfile(supabase, session.user.id);

  return { session, user: session.user, profile };
};

export const actions: Actions = {
  update: async ({ request, locals: { supabase, safeGetSession } }) => {
    const formData = await request.formData();
    const username = formData.get('username') as string;
    const avatarUrl = formData.get('avatarUrl') as string;

    const { session } = await safeGetSession();

    if (!session) {
      return fail(403, { message: 'Unauthorized' }); // Fail if not authenticated
    }

    const { error } = await supabase.from('profiles').upsert({
      id: session.user.id,
      username,
      avatar_url: avatarUrl,
      updated_at: new Date(),
    });

    if (error) {
      // More specific error message based on Supabase error
      return fail(500, { 
        message: 'Error updating profile. Please try again later.',
        error: error.message
      }); 
    }

    return {  username, avatarUrl };
  },

  signout: async ({ locals: { supabase, safeGetSession } }) => {
    const { session } = await safeGetSession();
    if (session) {
      await supabase.auth.signOut();
      throw redirect(303, '/');
    }
  },
};
