import { BASE_URL, KAKAO_API } from '@/src/constants/api';
import { authApi } from '@/src/services/authApi';
import { SignUpRequest } from '@/src/types/auth.types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

// 공통 성공 처리 로직
const handleAuthSuccess = (
  data: { user?: any; error?: string },
  queryClient: ReturnType<typeof useQueryClient>
) => {
  if (data.user && !data.error) {
    queryClient.invalidateQueries({ queryKey: ['user'] });
  }
};

// 로그인 훅
export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => handleAuthSuccess(data, queryClient),
    onError: (error) => {
      console.error('로그인 실패:', error);
    },
  });
};

// 카카오 로그인 훅
export const useKakaoLogin = () => {
  const navigate = useRouter();
  const queryClient = useQueryClient();
  const redirectUri = `${BASE_URL}/oauth/kakao`;

  const kakaoLoginMutation = useMutation({
    mutationFn: authApi.kakaoLogin,
    onSuccess: (data) => {
      handleAuthSuccess(data, queryClient);
      navigate.replace('/');
    },
    onError: (error) => {
      console.error('카카오 로그인 실패:', error);
      navigate.replace('/account?error=kakao_login_failed');
    },
  });

  const kakaoLoginRequest = () => {
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_API}&redirect_uri=${redirectUri}&response_type=code`;
    window.location.href = kakaoAuthUrl;
  };

  const kakaoCallbackLogin = async (token: string) => {
    try {
      return await kakaoLoginMutation.mutateAsync({ redirectUri, token });
    } catch (error) {
      console.error('카카오 콜백 로그인 실패:', error);
      throw error;
    }
  };

  return { kakaoLoginRequest, kakaoCallbackLogin };
};

// 카카오 회원가입 훅
export const useKakaoSignUp = () => {
  const navigate = useRouter();
  const queryClient = useQueryClient();
  const redirectUri = `${BASE_URL}/oauth/kakao`;

  const kakaoSignUpMutation = useMutation({
    mutationFn: authApi.kakaoSignUp,
    onSuccess: (data) => {
      handleAuthSuccess(data, queryClient);
      navigate.replace('/');
    },
    onError: (error) => {
      console.error('카카오 회원가입 실패:', error);
      navigate.replace('/account?error=kakao_signup_failed');
    },
  });

  const kakaoSignUpRequest = () => {
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_API}&redirect_uri=${redirectUri}&response_type=code&state=signup`;
    window.location.href = kakaoAuthUrl;
  };

  const kakaoCallbackSignUp = async (nickname: string, token: string) => {
    try {
      return await kakaoSignUpMutation.mutateAsync({ nickname, redirectUri, token });
    } catch (error) {
      console.error('카카오 콜백 회원가입 실패:', error);
      throw error;
    }
  };

  return { kakaoCallbackSignUp, kakaoSignUpRequest };
};

// 회원가입 + 자동 로그인 훅
export const useSignUp = () => {
  const signUpMutation = useMutation({ mutationFn: authApi.signUp });
  const loginMutation = useLogin();

  const signUpAndLogin = async (formData: SignUpRequest) => {
    const signUpResult = await signUpMutation.mutateAsync(formData);

    if (signUpResult?.success) {
      try {
        const loginResult = await loginMutation.mutateAsync({
          email: formData.email,
          password: formData.password,
        });
        return loginResult;
      } catch (loginError) {
        console.error('회원가입 후 로그인 실패:', loginError);
        throw loginError;
      }
    }

    return signUpResult;
  };

  return {
    ...signUpMutation,
    signUpAndLogin,
  };
};

// 현재 사용자 정보 조회 훅
export const useUser = () => {
  const query = useQuery({
    queryKey: ['user'],
    queryFn: authApi.getMe,
    retry: 0,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  return query;
};

// 로그아웃 훅
export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: (error) => {
      console.error('로그아웃 실패:', error);
    },
  });
};
