API="http://localhost:4741"
URL_PATH="/event"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
--header "Authorization: Bearer ${TOKEN}" \
--data '{
    "event": {
      "title": "'"${TITLE}"'"
      "time": "'"${TIME}"'"
      "date": "'"${DATE}"'"
      "description": "'"${DESCRIPTION}"'"
  }'

echo
