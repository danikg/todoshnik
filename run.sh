#!/bin/bash
echo "Starting..."
# export SECRET_KEY='Your SECRET_KEY'

echo "Mode: $1"
echo "URL: $2"

source $(pipenv --venv)/bin/activate

if [[ $1 == "dev" ]]
then
	cd ./todoshnik/
	python ./manage.py runserver $2 --settings=todoshnik.settings
elif [[ $1 == "prod" ]]
then
	cd ./todoshnik/todoshnik_frontend/
	npm run build
	cd ../
	python ./manage.py makemigrations
	python ./manage.py migrate
	python ./manage.py runserver $2 --settings=todoshnik.settings
else
	echo "Something went wrong"
fi
