'use client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { GridBackground, LoginHeader } from '@/components';
import { Separator } from '@/components/ui/separator';
import ChangePasswordForm from '@/components/Auth/ChangePasswordForm';
import SuccessPasswordChange from '@/components/Auth/SuccessPasswordChange';

const ChangePassword = () => {
  //const router = useRouter();
  const [isSuccess, setIsSuccess] = useState(false);

  const renderChangePasswordForm = () => {
    return (<ChangePasswordForm />)
  }

  useEffect(() => {
    /*  if (!userAuthenticated) { */
    /*    router.push('/login'); */
    /*  } */
  }, []);

  return (
    <div className='sectionContainer flex items-center justify-center w-screen h-screen'>
      <div className='grid max-w-[1200px] container h-full items-center justify-center max-h-[600px] rounded-lg drop-shadow-2xl'>
        <div className=' h-full overflow-hidden rounded-tr-lg rounded-br-lg w-[600px]'>
          <GridBackground>
            <div className='flex flex-1 flex-col z-20 px-8 py-8'>
              <LoginHeader />
              <Separator className='my-6 bg-neutral-800 dark:bg-neutral-200' />

              <div className='flex flex-col justify-center z-20 px-8'>

              {isSuccess ? (<SuccessPasswordChange />) : (<ChangePasswordForm onSubmit={setIsSuccess} />)}
              
              </div>

            </div>
          </GridBackground>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
