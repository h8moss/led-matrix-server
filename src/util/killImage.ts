import { cookies } from 'next/headers';

const killImage = async () => {
  const currCookies = cookies();
  if (!currCookies.has('process-pid')) return;

  const pid = currCookies.get('process-pid')!;
  process.kill(Number.parseInt(pid.value));
};

export default killImage;
