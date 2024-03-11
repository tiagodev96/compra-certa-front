'use client';
import {
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/button';
import Link from 'next/link';

const SuccessPasswordChange = () => {
  return (
    <>
      <CardHeader className='flex gap-5 text-center items-center'>
        <CheckCircle2 className='w-[50px] h-auto' />
        <CardTitle>Email de Confirmação Enviado com Sucesso</CardTitle>
        <CardDescription>
          Caro usuário, gostaríamos de informar que um email foi enviado com
          sucesso para o seu endereço. Por favor, acesse sua caixa de entrada e
          siga as instruções fornecidas para redefinir sua senha.
        </CardDescription>
        <CardFooter>
          <Link href='/'>
            <Button>Retornar para paǵina principal</Button>
          </Link>
        </CardFooter>
      </CardHeader>
    </>
  );
};

export default SuccessPasswordChange;
