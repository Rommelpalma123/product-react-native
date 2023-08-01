import cabello from  '../assets/cabello5.jpg'
import uñas from '../assets/unas.jpg'
import depilacion from '../assets/belleza.jpg';
import tratamiento from '../assets/tcapilares.jpg'
import maquillaje from '../assets/maquillaje2.jpg'
import tinte from '../assets/tinte.jpg'

export const createProductAny = {
  name: '',
  description: '',
  precio: '',
  photoUrl: '',
  categories: '',
};

export const updateProductAny = {
  name: '',
  description: '',
  precio: '',
  photoUrl: '',
  categories: '',
};


export const categoriAdmin = [
  {
    value: 'cabello',
    label: 'Cabello',
    cabello: 'cabello',
    icons: cabello,
  },
  {
    value: 'unas',
    label: 'Uñas',
    unas: 'unas',
    icons: uñas,
  },
  {
    value: 'maquillaje',
    label: 'Maquillaje',
    maquillaje: 'maquillaje',
    icons: maquillaje,
  },
  {
    value: 'depilacion',
    label: 'Depilacion',
    tintes: 'tintes',
    icons: depilacion,
  },
  {
    value: 'tintes',
    label: 'Tintes',
    tratamientosCapilares: 'tratamientos',
    icons: tinte,
  },
  {
    value: 'tratamientos',
    label: 'Tratamientos capilares',
    depilaciones: 'depilacion',
    icons: tratamiento,
  },
];
