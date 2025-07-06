import * as bcrypt from 'bcryptjs';

export async function generateUserSeed() {
  const saltRounds = parseInt(process.env.HASH_ROUNDS) || 8;
  const plainPassword = 'password';
  const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);

  return [
    {
      email: 'acho@gmail.com',
      password: hashedPassword,
      name: '조안나',
    },
    {
      email: 'gildong@gmail.com',
      password: hashedPassword,
      name: '홍길동',
    },
  ];
}
