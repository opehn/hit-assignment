import * as bcrypt from 'bcryptjs';

export async function generateOwnerSeed() {
  const saltRounds = parseInt(process.env.HASH_ROUNDS) || 8;
  const plainPassword = 'password';
  const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);

  return [
    {
      email: 'sujeong@gmail.com',
      password: hashedPassword,
      name: '이수정',
      mobile: '010-0000-0000',
    },
    {
      email: 'sajang@gmail.com',
      password: hashedPassword,
      name: '김사장',
      mobile: '010-0000-0000',
    },
    {
      email: 'xxfdfd@gmail.com',
      password: hashedPassword,
      name: '이사장',
      mobile: '010-0000-0000',
    },
  ];
}
