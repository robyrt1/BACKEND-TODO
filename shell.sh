echo '\n\n  requesting all todo'
curl --silent localhost:3000/todo

echo '\n\n create'
curl -i -X POST -H "Content-Type: application/json" \
    -d $'{
        "name":"Rubia",
        "date":"2022-10-13 11:33:00"
    }' localhost:3000/todo

echo '\n\n update'
curl -X PUT -H 'Content-Type: application/json' \
    -d '{"name":"Robert Mendes"}' localhost:3000/todo/2



