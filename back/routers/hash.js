import bcrypt from 'bcrypt';

const salt = await bcrypt.genSalt(10); // 기본이 10번이고 숫자가 올라갈수록 연산 시간과 보안이 높아진다.

const hashed = await bcrypt.hash('password', salt); // hashed를 데이터베이스에 저장한다.

console.log(hashed);