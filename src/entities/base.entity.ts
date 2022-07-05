import { DateTime } from 'luxon';
import {
  BeforeInsert,
  BeforeUpdate,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class Base {
  @CreateDateColumn({ type: 'timestamptz', nullable: false })
  public createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', nullable: false })
  public updatedAt: Date;

  @BeforeInsert()
  private beforeInsert() {
    const now = DateTime.utc();
    this.createdAt = now.toJSDate();
    this.updatedAt = now.toJSDate();
  }

  @BeforeUpdate()
  private beforeUpdate() {
    const now = DateTime.utc();

    this.updatedAt = now.toJSDate();
  }
}
