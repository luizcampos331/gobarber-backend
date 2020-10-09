import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Generated,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

/* Define que, toda vez que a classe User for chamada ela deve realizar
algo na tabela de appointmens do banco de dados */
@Entity('user_tokens')
// Deve ter a mesma estrutura da tabela
class User {
  // Usado para chave primaria
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Generated('uuid')
  token: string;

  @Column()
  user_id: string;

  // Tipo timestamp
  @CreateDateColumn()
  created_at: Date;

  // Tipo timestamp
  @UpdateDateColumn()
  updated_at: Date;
}

export default User;
