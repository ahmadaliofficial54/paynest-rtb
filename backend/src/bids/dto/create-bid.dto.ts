import { IsInt, IsNumber, Min } from 'class-validator';

export class CreateBidDto {
  @IsInt()
  itemId: number;

  @IsInt()
  userId: number;

  @IsNumber()
  @Min(0)
  amount: number;
}
