import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';

@Module({
  imports: [TerminusModule, HttpModule],
  exports: [TerminusModule, HttpModule],
})
export class HealthModule {}
