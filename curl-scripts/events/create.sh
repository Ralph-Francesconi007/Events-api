API="http://localhost:4741"
URL_PATH="/event"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "event": {
      "title": "'"${TITLE}"'",
      "time": "'"${TIME}"'",
      "date": "'"${DATE}"'"
      "description": "'"${DESCRIPTION}"'"
    }
  }'

echo
