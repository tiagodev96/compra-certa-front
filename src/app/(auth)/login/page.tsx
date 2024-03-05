'use client';
import React, { useState } from 'react';
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
import { ReloadIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

const Login = () => {
  const [loggingIn, setLoggingIn] = useState(false);

  const handleLogin = () => {
    setLoggingIn(true);
    setTimeout(() => {
      setLoggingIn(false);
    }, 2000);
  };

  return (
    <div className='sectionContainer flex items-center justify-center w-screen h-screen'>
      <div className='grid grid-cols-1 md:grid-cols-2 max-w-[1200px] container h-full items-center justify-center max-h-[600px] rounded-lg drop-shadow-2xl'>
        <div className='bg-neutral-800 dark:bg-neutral-200  w-full h-full rounded-tl-lg rounded-bl-lg'></div>
        <div className=' h-full overflow-hidden w-full rounded-tr-lg rounded-br-lg'>
          <GridBackground>
            <div className='flex flex-1 flex-col z-20 px-8 py-8'>
              <LoginHeader />
              <Separator className='my-6 bg-neutral-800 dark:bg-neutral-200' />
              <div className='flex flex-col justify-center w-auto'>
                <CardHeader className='text-center'>
                  <CardTitle>Faça login no Compra Certa</CardTitle>
                  <CardDescription>
                    Suas compras sob seu controle!
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form>
                    <div className='grid w-full items-center gap-4'>
                      <div className='flex flex-col space-y-3'>
                        <Label htmlFor='email'>Email</Label>
                        <Input
                          id='email'
                          type='email'
                          placeholder='Seu email'
                        />
                        <Label htmlFor='password'>Senha</Label>
                        <Input
                          id='password'
                          type='password'
                          placeholder='Sua senha'
                        />
                      </div>
                    </div>
                    <div className='flex justify-end mt-2'>
                      <Link
                        href='/forgot-password'
                        className='text-xs text-blue-500'
                      >
                        Esqueceu sua senha?
                      </Link>
                    </div>
                    <CardFooter className='flex justify-center my-3'>
                      <Button onClick={handleLogin} disabled={loggingIn}>
                        {loggingIn ? (
                          <>
                            <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />
                            Entrando...
                          </>
                        ) : (
                          'Entrar'
                        )}
                      </Button>
                    </CardFooter>
                  </form>
                </CardContent>
              </div>
              <SignInCTA />
            </div>
          </GridBackground>
        </div>
      </div>
    </div>
  );
};

export default Login;
