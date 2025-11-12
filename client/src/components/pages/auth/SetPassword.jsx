import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import LoadingDots from '@/components/ui/LoadingDots';
import { EyeOff, EyeIcon } from 'lucide-react';

const SetupPassword = ({ isAsModal }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div
      className={`md:bg-primary/5 relative flex items-center justify-center ${isAsModal ? 'h-full w-full' : 'h-[100dvh] md:p-4'}`}
    >
      <Card className="w-full max-w-md border-0 shadow-none outline-none md:px-2">
        <CardHeader>
          <CardTitle className="font-heading text-center text-2xl font-semibold">
            Set your password
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6 md:px-6">
          <div>
            <Label htmlFor="password" className="mb-1 text-sm font-medium">
              password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="focus:ring-primary h-12 rounded-sm text-base"
              />
              <Button
                size={'icon'}
                onClick={() => setShowPassword(!showPassword)}
                variant={'ghost'}
                className="absolute top-2 right-2 my-auto"
              >
                {showPassword ? <EyeOff /> : <EyeIcon />}
              </Button>
            </div>
          </div>
          <div>
            <Label
              htmlFor="confirmPassword"
              className="mb-1 text-sm font-medium"
            >
              Confirm Password
            </Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="focus:ring-primary h-12 rounded-sm text-base"
              />
              <Button
                size={'icon'}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                variant={'ghost'}
                className="absolute top-2 right-2 my-auto"
              >
                {showConfirmPassword ? <EyeOff /> : <EyeIcon />}
              </Button>
            </div>
          </div>
          <Button
            disabled={password.length < 6 || password !== confirmPassword}
            className="bg-primary h-12 w-full rounded-full text-base"
          >
            {0 ? <LoadingDots /> : 'Create Account'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
export default SetupPassword;
