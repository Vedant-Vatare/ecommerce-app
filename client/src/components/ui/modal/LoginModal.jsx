import { create } from 'zustand';
import { X, Mail, Lock, Chrome } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useLoginModal } from '@/store/userStore';
import { motion } from 'motion/react';

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const modalVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, y: 20, transition: { duration: 0.3 } },
};

export const LoginModal = () => {
  const { isOpen, closeModal } = useLoginModal();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  if (!isOpen) return null;

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  };

  const handleGoogleLogin = () => {
    console.log('Login with Google');
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50"
      onClick={handleBackdropClick}
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={backdropVariants}
    >
      <motion.div
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={modalVariants}
      >
        <Card className="border-border bg-background relative w-sm max-w-[90vw] gap-4 p-5 px-7 shadow-lg">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 opacity-75 hover:opacity-100"
            onClick={() => removeCartItem(item.id)}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>

          <div className="mb-6">
            <h2 className="text-foreground text-2xl font-bold">Welcome Back</h2>
            <p className="text-foreground mt-1 text-sm">
              Sign in to your account to continue
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute top-3 left-3 h-4 w-4" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 text-sm"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground">
                Password
              </Label>
              <div className="relative">
                <Lock className="text-foreground absolute top-3 left-3 h-4 w-4" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 text-sm"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-end">
              <button
                type="button"
                className="text-primary text-sm hover:underline"
              >
                Forgot password?
              </button>
            </div>

            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <div className="my-2 flex items-center gap-2">
            <Separator className="flex-1" />
            <span className="text-foreground text-xs">Or continue with</span>
            <Separator className="flex-1" />
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full"
            size="lg"
            onClick={handleGoogleLogin}
          >
            <Chrome className="mr-2 h-5 w-5" />
            Continue with Google
          </Button>

          <p className="text-foreground mt-2 text-center text-sm">
            Don't have an account?{' '}
            <button className="text-primary font-medium hover:underline">
              Sign up
            </button>
          </p>
        </Card>
      </motion.div>
    </motion.div>
  );
};
