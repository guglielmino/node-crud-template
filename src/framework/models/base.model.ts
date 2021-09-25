import { PrimaryGeneratedColumn, VersionColumn } from 'typeorm';

export class BaseModel {

  @PrimaryGeneratedColumn()
  public _id: string;

  @VersionColumn()
  public __v?: number;

}