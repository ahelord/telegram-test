import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class ChatMessage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
  })
  externalId: string;

  @Column()
  message: string;

  @Column()
  fromExternalId: string;

  @Column({
    nullable: true,
  })
  attachmentUrl: string;

  @Column()
  groupExternalId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
