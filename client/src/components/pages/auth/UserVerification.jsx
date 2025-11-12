import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const UserVerification = ({ isAsModal }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    console.log('OTP entered:', otp);
    navigate('/auth/setup-password');
  };
  const [otp, setOtp] = useState('1232');
  const [otpSent, setOtpSent] = useState(false);
  return (
    <div
      className={`md:bg-primary/5 relative flex items-center justify-center ${isAsModal ? 'h-full w-full' : 'h-[100dvh] md:p-4'}`}
    >
      <Card className="w-full max-w-md border-0 shadow-none outline-none md:px-2">
        <CardHeader>
          <CardTitle className="font-heading text-center text-2xl font-semibold">
            Verify your account
          </CardTitle>
        </CardHeader>
        <CardDescription className="text-muted-foreground px-6 text-center text-sm text-balance">
          we have sent a verification code to your email address.
        </CardDescription>
        <CardContent className="space-y-6 md:px-6">
          <div className="flex flex-col items-center">
            <Label htmlFor="otp" className="mb-2 text-sm font-medium">
              Verification Code
            </Label>

            <InputOTP id={'otp'} maxLength={6} value={otp} onChange={setOtp}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator className={'hidden sm:flex'} />
              <InputOTPGroup className={'ml-2 sm:ml-0'}>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>
          <Button
            onClick={handleClick}
            disabled={otp.length < 6}
            className="bg-primary h-12 w-full rounded-full text-base"
          >
            {0 ? <LoadingDots /> : 'Continue'}
          </Button>
        </CardContent>
        <div className="mx-auto w-[75vw] max-w-[75%]">
          <Separator />
        </div>
        <CardFooter className="text-primary flex flex-col space-y-2 text-sm font-medium">
          <span>
            <Link to="/auth/signup">resend verification code</Link>
          </span>
          <span>
            <Link to="/auth/signup">use different email?</Link>
          </span>
        </CardFooter>
      </Card>
    </div>
  );
};

export default UserVerification;
