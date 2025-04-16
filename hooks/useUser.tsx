'use client';

import { User } from '@supabase/auth-helpers-nextjs';
import {
  useSessionContext,
  useUser as useSupabaseUser,
} from '@supabase/auth-helpers-react';
import { createContext, useContext, useEffect, useState } from 'react';

import { Subscription, UserDetails } from '@/types/types';
import toast from 'react-hot-toast';

type UserContextType = {
  accessToken: string | null;
  user: User | null;
  isLoading: boolean;
  userDetails: UserDetails | null;
  subscription: Subscription | null;
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined,
);

export interface Props {
  [propName: string]: any;
}

export const MyUserContextProvider = (props: Props) => {
  const {
    session,
    isLoading: isLoadingUser,
    supabaseClient,
  } = useSessionContext();
  const user = useSupabaseUser();
  const accessToken = session?.access_token ?? null;
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);

  const getUserDetails = () =>
    supabaseClient.from('users').select('*').single();
  const getSubscription = () =>
    supabaseClient
      .from('subscriptions')
      .select('*,prices(*,products(*))')
      .in('status', ['trialing', 'active'])
      .single();

  useEffect(() => {
    if (user && !isLoadingData && !userDetails && !subscription) {
      // start loading data for authenticated user
      setIsLoadingData(true);

      Promise.allSettled([getUserDetails(), getSubscription()])
        .then((results) => {
          const userDetailsPromise = results[0];
          const subscriptionPromise = results[1];

          if (userDetailsPromise.status === 'fulfilled') {
            setUserDetails(userDetailsPromise.value.data);
          }
          if (subscriptionPromise.status === 'fulfilled') {
            setSubscription(subscriptionPromise.value.data);
          }

          setIsLoadingData(false);
        })
        .catch((error) => {
          toast.error('System error. Please try again later!');
        });
    } else if (!user && !isLoadingUser && !isLoadingData) {
      setUserDetails(null);
      setSubscription(null);
    }
  }, [user, isLoadingUser]);

  const value = {
    accessToken,
    user,
    isLoading: isLoadingUser || isLoadingData,
    userDetails,
    subscription,
  };

  return <UserContext.Provider value={value} {...props} />;
};

export const useUser = () => {
  const userContext = useContext(UserContext);
  if (userContext === undefined) {
    throw new Error('useUser must be used within a MyUserContextProvider');
  }
  return userContext;
};
