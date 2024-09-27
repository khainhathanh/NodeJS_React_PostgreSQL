import { useSession } from 'next-auth/react';
import { useRouter ,usePathname} from 'next/navigation';
import { nextTick } from 'process';

const NEED_LOGIN_PAGE = [
  '/',
  '/dashboard'
];
const NEED_LOGOUT_PAGE = ['/', '/login'];
export const useAccessControl = () => {
  const { status, data: session } = useSession();
  const router = useRouter();
  const routeName = usePathname();
  const isNeedLoginPage = NEED_LOGIN_PAGE.some((pagePath) => pagePath === routeName);
  const isNeedLogoutPage = NEED_LOGOUT_PAGE.some((pagePath) => pagePath === routeName);

  if (status === 'unauthenticated' && isNeedLoginPage) {

  //Sử dụng nextTick để đảm bảo rằng router.push chỉ được gọi sau khi DOM đã được cập nhật:
  nextTick(() => {
    void router.push('/login')
  });
    return { status, session, isRedirect: true };
  }
  if (status === 'authenticated' && isNeedLogoutPage ) {
  nextTick(() => {
    void router.push('/dashboard');
  });
    
    return { status, session, isRedirect: true };
  }
  return { status, session, isRedirect: false };
};
