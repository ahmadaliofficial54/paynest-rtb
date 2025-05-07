import { IsInt, IsNumber, IsString, Min } from 'class-validator';

export class CreateItemDto {
  @IsString() name: string;
  @IsString() description: string;

  @IsNumber()
  @Min(0)
  startPrice: number;

  @IsInt()
  @Min(10) // seconds
  durationSeconds: number;
}
