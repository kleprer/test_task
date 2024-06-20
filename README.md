## Задача для стажера Fullstack-разработчика

## ![image](https://github.com/kleprer/test_task/assets/146105343/a3559d11-5f60-4518-8ffb-882912abc8de)

## Синтезированные данные:
## Таблица клиентов
![image](https://github.com/kleprer/test_task/assets/146105343/e803f776-a2b6-45c3-a426-7255108ace5a)
## Таблица пользователей
![image](https://github.com/kleprer/test_task/assets/146105343/ea94a542-0d3e-49f6-a860-0b5890134e8f)

## ![image](https://github.com/kleprer/test_task/assets/146105343/3a522cb0-fa4a-47c2-88f5-75f79680f320)

## Работа интерфейса
![testtask](https://github.com/kleprer/test_task/assets/146105343/5615fa84-1085-466d-94ac-c98aaadd2f61)

## Стек
```
-React
-TailwindCSS
-FastAPI
-Uvicorn
-Sqlalchemy
-Sqlite
-Axios
```

## Клонировать репозиторий
```
cd existing_folder
git clone https://github.com/kleprer/test_task.git
```

## Установите необходимые зависимости:
Внутри папки frontend:
```
cd frontend
npm install
```
Внутри папки backend:
```
cd backend
# создайте и активируйте виртуальное окружение для python
python -m venv env
env/Scripts/activate
# or (Mac)
env/bin/activate
# Установите необходимые модули из requirements.txt
pip install -r requirements.txt
```

## Запустите на localhost 

Внутри папки frontend:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
Oткройте [http://localhost:3000](http://localhost:3000) в браузере, чтобы увидеть результат.

Внутри папки backend:
```
uvicorn main:app --reload
```
Откройте [http://localhost:8000/docs](http://localhost:8000/docs) в браузере, чтобы открыть FastAPI документацию.
