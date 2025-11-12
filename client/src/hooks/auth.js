import {
  createUserAccount,
  sendCodeToemail,
  verifyEmailCode,
} from '@/services/auth';
import { useMutation } from '@tanstack/react-query';

export const sendEmailCodeMutation = () => {
  return useMutation({
    mutationKey: ['send-verification-code'],
    mutationFn: (email) => sendCodeToemail(email),
  });
};

export const verifyEmailMutation = () => {
  return useMutation({
    mutationKey: ['verify-email-code'],
    mutationFn: ({ email, code }) => verifyEmailCode({ email, code }),
  });
};

export const createUserAccountMutation = () => {
  return useMutation({
    mutationKey: ['create-user-account'],
    mutationFn: ({ password }) => createUserAccount({ password }),
  });
};
