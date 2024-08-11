docker-compose down

cd backend\user-auth\
call npm run build

cd ..\..\frontend\user-auth-frontend\
call npm run build

cd ..\..
docker-compose up --build