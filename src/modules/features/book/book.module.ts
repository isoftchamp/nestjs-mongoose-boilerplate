import { Module } from '@nestjs/common';

import { CoreModule } from '@/modules/core/core.module';

import { BookController } from './book.controller';
import { BookService } from './book.service';

@Module({
  imports: [CoreModule],
  providers: [BookService],
  controllers: [BookController],
})
export class BookModule {}
