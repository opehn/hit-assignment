import { Global, Module } from '@nestjs/common';
import { TransactionService } from './provider/trasaction.service';

@Global()
@Module({
  providers: [TransactionService],
  exports: [TransactionService],
})
export class CommonModule {}
