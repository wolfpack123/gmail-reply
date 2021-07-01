
db.shardCollection("mongodbdays.inbox",
{owner: 1, sequence: 1})
db.shardCollection("mongodbdays.users", {user_name: 1})

msg={
from: "Manish",
to: ["Jane", "Doe"],
sent: new Date (),
message: "Hello World!", 
}

for(recipient in msg.to) {
count = db.users.findAndModify({
  query: {user_name: msg.to[recipient]}, 
update:{"$inc":{"msg_count":1}},
upsert: true,
new: true}).msg_count;

sequence = Math.floor(count/50);

db.inbox.update({
  owner: msg.to[recipient], sequence: sequence},
  {$push:{"messages":msg}},
  {upsert: true});
}


db.inbox.find ({author: "Manish"})
.sort({sequence:-1}).limit(2)