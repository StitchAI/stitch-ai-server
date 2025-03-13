import { Module } from '@nestjs/common';

import { PrismaModule } from '~/prisma/prisma.module';

import { MemoryController } from './controllers/memory.controller';
import { MemoryExternalController } from './controllers/memory-external.controller';
import { MemorySpaceController } from './controllers/memory-space.controller';
import { MemoryService } from './services/memory.service';
import { MemoryExternalService } from './services/memory-external.service';
import { MemorySpaceService } from './services/memory-space.service';

@Module({
  imports: [PrismaModule],
  controllers: [MemorySpaceController, MemoryExternalController, MemoryController],
  providers: [MemoryService, MemorySpaceService, MemoryExternalService],
  exports: [MemoryService, MemorySpaceService, MemoryExternalService],
})
export class MemoryModule {}
