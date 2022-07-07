import { Column, Entity, PrimaryColumn } from 'typeorm';
import { Base } from './base.entity';

@Entity()
export class User extends Base {
  @PrimaryColumn()
  id: string;

  @Column({ type: 'varchar', length: 255 })
  username: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'varchar', length: 255 })
  profile_image: string;

  @Column({ type: 'timestamptz', nullable: false })
  joined_date: Date;
}
