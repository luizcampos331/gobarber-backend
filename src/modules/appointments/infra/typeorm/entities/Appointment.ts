import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';

/* Define que, toda vez que a classe Appointments for chamada ela deve realizar
algo na tabela de appointmens do banco de dados */
@Entity('appointments')
// Deve ter a mesma estrutura da tabela
class Appointment {
  // Usado para chave primaria
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Por padrão o tipo é varchar
  @Column()
  provider_id: string;

  // Muitos para um
  @ManyToOne(() => User)
  @JoinColumn({ name: 'provider_id' })
  provider: User;

  // Por padrão o tipo é varchar
  @Column()
  user_id: string;

  // Muitos para um
  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  // Tipo time with time zone
  @Column('time with time zone')
  date: Date;

  // Tipo timestamp
  @CreateDateColumn()
  created_at: Date;

  // Tipo timestamp
  @UpdateDateColumn()
  updated_at: Date;
}

export default Appointment;
