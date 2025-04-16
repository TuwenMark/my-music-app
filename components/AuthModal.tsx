'use client';

import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import useAuthModal from '@/hooks/useAuthModel';
import { loginNetease } from '@/lib/neteasecloud/loginActions';
import Modal from './Modal';

const AuthModal = () => {
  const supabaseClient = useSupabaseClient();
  const session = useSession();
  const router = useRouter();
  const { onClose, isOpen } = useAuthModal();

  useEffect(() => {
    // login netease cloud music
    loginNetease();

    if (session) {
      router.refresh();
      onClose();
    }
  }, [session, router, onClose]);
  // open: the status to be switched to
  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Modal
      title="Welcome back"
      description="Login to your account"
      isOpen={isOpen}
      onChange={onChange}
    >
      <Auth
        theme="dark"
        providers={['github', 'google']}
        magicLink
        supabaseClient={supabaseClient}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: '#404040',
                brandAccent: '#22c55e',
              },
            },
          },
        }}
      />
    </Modal>
  );
};

export default AuthModal;
