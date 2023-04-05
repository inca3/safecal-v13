import Image from 'next/image';

import LoadingImage from '@/assets/loading.gif';

const loading = () => {
  return (
    <div className='z-10 flex h-screen w-screen items-center justify-center overflow-hidden bg-lightSkinLighter'>
      <Image src={LoadingImage} alt='loading' width={32} height={32} />
    </div>
  );
};
export default loading;
