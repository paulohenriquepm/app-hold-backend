set -e

npx prisma migrate dev

npm run test $TEST_FILE