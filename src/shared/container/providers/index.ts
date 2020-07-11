import { container } from 'tsyringe';

import IStoreageProvider from './StorageProvider/models/IStorageProvider';
import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvider';

container.registerSingleton<IStoreageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);
