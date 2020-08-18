# Introduction

_This package is meant to provide an easy way to create and use own discord.js permissions, **all data is stored with mongodb**_

**Installation**

```ruby
npm install discord-perms
```

**Require Package**

```javascript
var permissions = require('discord-perms')
```

## What is Discord Perms?

> Discord Perms is an easy-to-use permissions manager built with mongodb/mongoose. It's simple and perfect for smaller projects, with Discord Perms you can create your own permissions for discord.js! the permissions are processed via MongoDB.

## Example

```javascript
const permissions = require('discord-perms')

// Set the mongodb url and connect to database(For example do it in the ready event of discord.js):
permissions.setmongoURL('mongourl');

// To create a user:
permissions.createUser(userID, guildID);
//Example:
permisions.createUser("390810485244821505", "653154689218641930")


// To delete a user:
permissions.deleteUser(userID, guildID);
//Example: 
permisions.deleteUser("390810485244821505", "653154689218641930")


// Add a permission to a user:
permissions.addPermission(userID, guildID, permission)
//Example: 
permisions.addPermission("390810485244821505", "653154689218641930", "bot.moderator")

// Remove a permission from a user:
permissions.removePermission(userID, guildID, permission)
//Example: 
permisions.removePermission("390810485244821505", "653154689218641930", "bot.moderator")

// Check if user has a permission
permissions.hasPermission("390810485244821505", "653154689218641930", "bot.moderator")
//Example: 
if (await permissions.hasPermission(message.author.id, message.guild.id, "bot.admin")) {
		console.log("HE HAS THE PERMISSION!")
	} else {
		console.log("HE HASN'T THE PERMISSION!")
}
//PLEASE USE THIS WITH await

```

## You have ideas and questions?
Create an issue on the Github respository
