'use strict';

import { Column, Entity } from 'typeorm';
import { BaseModel } from '../framework/models/base.model';

@Entity('profiles')
export class ProfileModel extends BaseModel {

  @Column()
  firstName: string;

  @Column()
  lastName: string;   

}