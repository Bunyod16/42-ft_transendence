import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Match {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date;

  @CreateDateColumn({ name: 'updatedAt' })
  updatedAt: Date;

  @Column({ default: false })
  isPrivate: boolean;

  @Column({ name: 'playerOneScore', default: 0 })
  playerOneScore: number;

  @Column({ name: 'playerTwoScore', default: 0 })
  playerTwoScore: number;

  @ManyToOne(() => User, (user) => user.matchesAsPlayerOne, { nullable: false })
  playerOne: User;

  @ManyToOne(() => User, (user) => user.matchesAsPlayerTwo, { nullable: false })
  playerTwo: User;
}
