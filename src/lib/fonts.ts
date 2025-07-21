import localFont from 'next/font/local'

export const trajan = localFont({
  src: [
    {
      path: '../../public/fonts/fonnts.com-quadrat_serial-light.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/fonts/fonnts.com-quadrat_serial-regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/fonnts.com-quadrat_serial-medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/fonnts.com-quadrat_serial-bold.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/fonnts.com-quadrat_serial-xbold.otf',
      weight: '800',
      style: 'normal',
    },
  ],
  variable: '--font-trajan',
  display: 'swap',
}) 