import React from 'react';
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

const ChangePasswordForm = ({setIsSuccess}: any) => {
  return (
    <>
      <CardHeader className='flex items-center'>
        <CardTitle>Redefinir Senha</CardTitle>
        <CardDescription>Digite uma nova senha para seu email.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className='grid w-full items-center gap-4'>
            <div className='flex flex-col space-y-3 my-5'>
              <Label htmlFor='password'>Senha</Label>
              <Input id='password' type='password' />
              <Label htmlFor='password'>Confirmar senha</Label>
              <Input id='password' type='password' />
            </div>
          </div>
          <CardFooter className='flex justify-center my-3 p-0'>
            <Button onClick={() => setIsSuccess(true)}>Redefinir Senha</Button>
          </CardFooter>
        </form>
      </CardContent>
      </>
  );
};

export default ChangePasswordForm;
