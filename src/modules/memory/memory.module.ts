import { Module } from '@nestjs/common';

import { PrismaModule } from '~/prisma/prisma.module';

import { MemoryController } from './controllers/memory.controller';
import { MemorySpaceController } from './controllers/memory-space.controller';
import { MemoryService } from './services/memory.service';
import { MemorySpaceService } from './services/memory-space.service';

@Module({
  imports: [PrismaModule],
  controllers: [MemorySpaceController, MemoryController],
  providers: [MemoryService, MemorySpaceService],
  exports: [MemoryService, MemorySpaceService],
})
export class MemoryModule {}
