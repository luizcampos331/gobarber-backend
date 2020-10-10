import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Exclude, Expose } from 'class-transformer';

/* Define que, toda vez que a classe User for chamada ela deve realizar
algo na tabela de appointmens do banco de dados */
@Entity('users')
// Deve ter a mesma estrutura da tabela
class User {
  // Usado para chave primaria
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Por padrão o tipo é varchar
  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  avatar: string;

  // Tipo timestamp
  @CreateDateColumn()
  created_at: Date;

  // Tipo timestamp
  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: 'avatar_url' })
  getAvatarUrl(): string | null {
    return this.avatar
      ? `${process.env.APP_API_URL}/files/${this.avatar}`
      : null;
  }
}

export default User;
