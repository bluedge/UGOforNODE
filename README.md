[![UGOforNODE](https://raw.github.com/bluedge/gh-pages/master/images/UGOforNODE.png)](https://github.com/bluedge/UGOforNODE)
#UGOforNODE

Lightweight module for UNIX Symbolic notation "rwxrwxr--" to Octal notation "774" convertion.
[![Build Status](https://travis-ci.org/bluedge/UGOforNODE.png?branch=master)](https://travis-ci.org/bluedge)

## Install

```bash
npm install ugofornode
```

## Features List
	- toOctal from Symbolic notation to Octal notation
	- toSymbolic from Octal notation to Symbolic notation
	- getPermissionByClass return the Symbolic notation for a class (User, Group, Other)
	- isSymbolicValid check Symbolic notation validity
	- isOctalValid check the Octal notation validity
	
### Usage Example

```js	
	var UGOforNODE 			= require('ugofornode')
		, ugo 				= new UGOforNODE();
	
	// Get Octal notation from Array
	permission1 = ugo.toOctal( ["rwx", "rwx", "r--"]; // 774
	
	// Get Octal notation from String
	permission2 = ugo.toOctal( "rwxrwxr--" ); // 774
	
	// Get Symbolic notation (Array) from Octal
	permission3 = ugo.toSymbolic( 774 ); // ["rwx","rwx","r--"]
	
	// Get Symbolic notation (String) from Octal
	permission4 = ugo.toSymbolic( 774, "string" ); // "rwxrwxr--"
	
	// Get Symbolic notation of the specified class from Octal Notation 
	permission5 = ugo.getPermissionByClass( 774, 'OTHER' ); // "r--"
	
	// Get Symbolic notation of the specified class from Symbolic Notation (Array)
	permission6 = ugo.getPermissionByClass( ["rwx","rwx","r--"], 'OTHER' ); // "r--"
		
	// Validate Symbolic notation (Array)
	permission7 = ugo.isSymbolicValid( ["rwx","rwx","r--"] ); // true;
	
	// Validate Symbolic notation (String)
	permission8 = ugo.isSymbolicValid( "rwxrwxr--" ); // true;
	
	// Validate Octal notation
	permission9 = ugo.isOctalValid( 555 ); // true;
```

### Sponsors
UGOforNODE was created as part of a custom node development initiative sponsored by Bureaucloud (http://bureaucloud.com) & Bluedge(http://bluedge.co.uk) for a private application.
This simple and lean module quickly became so convenient for addressing permissions, we decided to share it with others.   