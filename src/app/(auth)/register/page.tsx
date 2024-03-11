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

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [registering, setRegistering] = useState(false);
  const [registrationError, setRegistrationError] = useState<string | null>(
    null
  );

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRegister = () => {
    setRegistering(true);
    setTimeout(() => {
      if (formData.password !== formData.confirmPassword) {
        setRegistrationError('As senhas não coincidem.');
        setRegistering(false);
      }
    }, 2000);
  };

  return (
    <div className='sectionContainer flex items-center justify-center w-screen h-screen'>
      <div className='grid grid-cols-1 md:grid-cols-2 max-w-[1200px] container h-[100%] items-center justify-center max-h-[800px] rounded-lg drop-shadow-2xl'>
        <div className='bg-neutral-800 dark:bg-neutral-200  w-full h-full rounded-tl-lg rounded-bl-lg'></div>
        <div className=' h-full overflow-hidden w-full rounded-tr-lg rounded-br-lg'>
          <GridBackground>
            <div className='flex flex-1 flex-col z-20 px-8 py-8'>
              <LoginHeader />
              <Separator className='my-6 bg-neutral-800 dark:bg-neutral-200' />
              <div className='flex flex-col justify-center w-auto'>
                <CardHeader className='text-center'>
                  <CardTitle>Faça registro no Compra Certa</CardTitle>
                  <CardDescription>
                    Suas compras sob seu controle!
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={(e) => e.preventDefault()}>
                    <div className='grid w-full items-center gap-4'>
                      <div className='flex flex-col space-y-3'>
                        <Label htmlFor='name'>Primeiro nome</Label>
                        <Input
                          id='firstName'
                          type='text'
                          name='firstName'
                          value={formData.firstName}
                          onChange={handleInputChange}
                          placeholder='Digite seu nome'
                        />
                        <Label htmlFor='name'>Sobrenome</Label>
                        <Input
                          id='lastName'
                          type='text'
                          name='lastName'
                          value={formData.lastName}
                          onChange={handleInputChange}
                          placeholder='Digite seu nome'
                        />
                        <Label htmlFor='email'>Email</Label>
                        <Input
                          id='email'
                          type='email'
                          name='email'
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder='Digite seu email'
                        />
                        <Label htmlFor='password'>Senha</Label>
                        <Input
                          id='password'
                          type='password'
                          name='password'
                          value={formData.password}
                          onChange={handleInputChange}
                          placeholder='Digite sua senha'
                        />
                        <Label htmlFor='confirmPassword'>Repetir senha</Label>
                        <Input
                          id='confirmPassword'
                          type='password'
                          name='confirmPassword'
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          placeholder='Repita sua senha'
                        />
                      </div>
                    </div>
                    {registrationError && (
                      <div className='text-red-500'>{registrationError}</div>
                    )}
                    <CardFooter className='flex justify-center my-3 p-0'>
                      <Button onClick={handleRegister} disabled={registering}>
                        {registering ? (
                          <>
                            <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />
                            Cadastrando...
                          </>
                        ) : (
                          'Cadastrar-se'
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

export default Register;
