import killImage from '@/util/killImage';
import { spawn, fork } from 'child_process';

import type { NextApiHandler } from 'next';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const POST: NextApiHandler = async (req) => {
  killImage();

  const child = spawn(
    `${process.env.LED_MATRIX_LOCATION}/bin/modules/date-time/date_time.out`
  );

  const pid = child.pid;

  if (pid !== undefined) {
    cookies().set('process-pid', pid.toString());
    child.disconnect();
    return NextResponse.json({ success: true });
  }
  return NextResponse.json({ success: false });
};

export { POST };
