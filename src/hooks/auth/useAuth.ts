import { authApi } from '@/src/services/authApi';
import { useAuthStore } from '@/src/store/authStore';
import { SignUpRequest } from '@/src/types/auth.types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

export const useLogin = () => {
  const queryClient = useQueryClient();
  const { setUser } = useAuthStore();

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      if (data.user && !data.error) {
        setUser(data.user);
        queryClient.invalidateQueries({ queryKey: ['user'] });
      }
    },
    onError: (error) => {
      console.log('로그인 실패:', error);
    },
  });
};

export const useSignUp = () => {
  const signUpMutation = useMutation({ mutationFn: authApi.signUp });
  const loginMutation = useLogin(); // 로그인 훅 재사용

  const signUpAndLogin = async (formData: SignUpRequest) => {
    const signUpResult = await signUpMutation.mutateAsync(formData);
    if (signUpResult?.success) {
      const loginResult = await loginMutation.mutateAsync({
        email: formData.email,
        password: formData.password,
      });

      return loginResult;
    }

    return signUpResult;
  };

  return {
    ...signUpMutation,
    signUpAndLogin,
  };
};

export const useUser = () => {
  const { setUser, setLoading } = useAuthStore();

  const query = useQuery({
    queryKey: ['user'],
    queryFn: authApi.getMe,
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5분
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (query.isSuccess) {
      if (query.data && !query.error) {
        setUser(query.data);
      } else {
        setUser(null);
      }
      setLoading(false);
    }

    if (query.isError) {
      console.error('사용자 정보 조회 실패:', query.error);
      setUser(null);
      setLoading(false);
    }
  }, [query.isSuccess, query.isError, query.data, query.error, setUser, setLoading]);

  return query;
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const { logout } = useAuthStore();

  return useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      logout();
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
};
