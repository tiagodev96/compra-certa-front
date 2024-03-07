'use client';
import { GridBackground, LoginHeader, SignInCTA } from '@/components';
import { Button } from '@/components/ui/button';
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { LockClosedIcon } from '@radix-ui/react-icons';

const ForgotPassword = () => {
  const { toast } = useToast();

  return (
    <div className='sectionContainer flex items-center justify-center w-screen h-screen'>
      <div className='grid max-w-[1200px] container h-full items-center justify-center max-h-[600px] rounded-lg drop-shadow-2xl'>
        <div className=' h-full overflow-hidden rounded-tr-lg rounded-br-lg w-[600px]'>
          <GridBackground>
            <div className='flex flex-1 flex-col z-20 px-8 py-8'>
              <LoginHeader />
              <Separator className='my-6 bg-neutral-800 dark:bg-neutral-200' />
              <div className='flex flex-col justify-center z-20 px-8'>
                <CardHeader className='flex items-center'>
                  <LockClosedIcon className='w-[50px] h-auto' />
                  <CardTitle>Recuperação de Senha</CardTitle>
                  <CardDescription>
                    Digite seu email para redefinir sua senha.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form>
                    <div className='grid w-full items-center gap-4'>
                      <div className='flex flex-col space-y-3 my-5'>
                        <Label htmlFor='email'>Email</Label>
                        <Input
                          id='email'
                          type='email'
                          placeholder='Seu email'
                        />
                      </div>
                    </div>
                    <CardFooter className='flex justify-center my-3 p-0'>
                      <Button
                        onClick={() => {
                          toast({
                            description:
                              'Convite de recuperção de senha enviado!',
                          });
                        }}
                      >
                        Redefinir Senha
                      </Button>
                    </CardFooter>
                  </form>
                </CardContent>
                <div className='text-center'>
                  <SignInCTA />
                </div>
              </div>
            </div>
          </GridBackground>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
