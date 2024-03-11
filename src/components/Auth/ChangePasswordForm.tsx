'use client'
import React, { useState } from 'react';
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Label } from '@radix-ui/react-label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

const ChangePasswordForm = ({ setIsSuccess }: any) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password === confirmPassword) {
      setIsSuccess(true);
    } else {
      console.log('As senhas não coincidem.');
    }
  };

  return (
    <>
      <CardHeader className='flex items-center'>
        <CardTitle>Redefinir Senha</CardTitle>
        <CardDescription>Digite uma nova senha para seu email.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className='grid w-full items-center gap-4'>
            <div className='flex flex-col space-y-3 my-5'>
              <Label htmlFor='password'>Senha</Label>
              <Input id='password' type='password' value={password} onChange={handlePasswordChange} />
              <Label htmlFor='confirmPassword'>Confirmar senha</Label>
              <Input id='confirmPassword' type='password' value={confirmPassword} onChange={handleConfirmPasswordChange} />
            </div>
          </div>
          <CardFooter className='flex justify-center my-3 p-0'>
            <Button type="submit">Redefinir Senha</Button>
          </CardFooter>
        </form>
      </CardContent>
      </>
  );
};

export default ChangePasswordForm;