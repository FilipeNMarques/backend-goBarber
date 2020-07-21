import { container } from 'tsyringe';

import DiskStorageprovider from './implementations/DiskStorageProvider';
import IStorageProvider from './models/IStorageProvider';

const providers = {
  disk: DiskStorageprovider,
};

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  providers.disk,
);
