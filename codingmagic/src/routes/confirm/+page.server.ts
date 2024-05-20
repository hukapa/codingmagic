// src/routes/confirm/+page.server.ts
import { error, redirect, type Actions, type RequestEvent } from '@sveltejs/kit';
import { supabase } from '$lib/supabase';

export const actions: Actions = {
  default: async ({ request, url, locals }) => {
    const formData = await request.formData();
    const type = formData.get('type') as string;
    const access_token = formData.get('access_token') as string;

    if (type === 'signup' && access_token) {
      // Recupere o email armazenado em locals (ou outra forma de armazenamento)
      const email = "kahat62223@mcatag.com"; // Certifique-se de definir `locals.email` no seu hook `handle`

      if (!email) {
        return error(400, 'Email não encontrado');
      }

      const { error: verificationError } = await supabase.auth.verifyOtp({
        type,
        token: access_token,
        email, // Adicionar o email
      });

      if (verificationError) {
        return error(400, verificationError.message);
      }

      const redirectTo = url.searchParams.get('redirect_to') || '/';

      const { data: user, error: userError } = await supabase.auth.getUser();
      if (userError) {
        return error(500, 'Erro ao buscar dados do usuário');
      }

      throw redirect(303, redirectTo);
    } else {
      return error(400, 'Tipo de confirmação inválido');
    }
  },
};
