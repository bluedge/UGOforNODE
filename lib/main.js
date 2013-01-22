/**
 * UGOforNODE
 * Convert Symbolic notation of UNIX permission (rwx) to octal-like
 * notation (thru binary conversion) and vice-versa.
 * Note: UGO stands for to Unix denomination; User, Group, Other
 * Pattern: [Prototype]
 * Creation date: 2012/12/11
 * Async: False
 	* @class UGOforNODE
**/



// Constructor
var UGOforNODE = function () {};


// Export
module.exports = UGOforNODE;


/*** CONSTANTS ***/
const USER = 0;
const GROUP = 1;
const OTHER = 2;



/**
 * Encode Permission: "rwx" to octal "7"
 * This method expect an array of 3 members i.e. ['rwx', 'rw-', 'r--']
 * will return 764
 * UGO in plain string format is also acceptable
 	@method  toOctal
 	@param {Array|String} UGO
 	@return {Number}
*/
UGOforNODE.prototype.toOctal = function ( UGO ) {
	var toBinaryStageOne, toBinary, digits='';
	
	// if UGO is a String format convert to array
	if ( !Array.isArray( UGO ) ) {
		// slice every 3 characters
		UGO = UGOstringToArray( UGO ); 
	}
	
	// Check if UGO is valid
	if ( !this.isSymbolicValid( UGO ) ) {
		throw new Error( "Permission symbolic representation [U,G,O] is not valid" );
	}
		
		 
	// Convert each UGO section
	UGO.forEach( function ( block ) {
		toBinaryStageOne = block.replace( /[rwx]/ig , 1 );
		toBinary = toBinaryStageOne.replace( /[^1]/g , 0 );
		digits += parseInt( toBinary, 2 )+'';
	});
	return parseInt(digits);
}


/**
 * Encode Octal Permission: "777" to Symbolic notation "rwxrwxrwx"
 * Use octal style without leading "0"
 	@method  toSymbolic
 	@param {Number} octal
 	@param {String} output
 	@return {Array|String}
*/
UGOforNODE.prototype.toSymbolic = function ( octal, output ) {
	var digits, binary, block=[]
		, output = output || 'array';
		
	if ( !this.isOctalValid( octal ) ) {
		throw new Error( "Permission octal representation is not valid" );
	}
		
	
	digits = ( octal ).toString().split('');
	
	digits.forEach( function ( d, index ) {
		var symbole = '';
		binary = (parseInt(d)).toString(2);
		symbole += ( binary >= 100 ) ? 'r' : '-';
		symbole += ( (binary-100) >= 10 ) ? 'w' : '-';
		symbole += ( (binary-110) == 1 ) ? 'x' : '-';
		block[index] = symbole;
	});
	return ( 'string' == output.toLowerCase() ) ? block.join('') : block ;
}



/**
 * Get Permission by Class (User, Group, Other)
	 @method getPermissionByClass
	 @param {Number|String|Array} perm
	 @param {String} user|group|other
	 @return {String}
*/
UGOforNODE.prototype.getPermissionByClass = function ( perm, klass ) {
	var permission = false, result = false;
	
	// is Klass in not defined or not a {String} type
	if ( !klass || !typeof klass == 'string' ) {
		throw new Error( 'Class representation is not valid. Please use: "user", "group", or "other"' );
	}
	
	// Check Octal format
	if ( parseInt( perm ) ) {
		if (!this.isOctalValid(perm))
			throw new Error( "Octal permission representation is not valid" );
		// valid, process
		permission = this.toSymbolic( perm );
	} else {
		// Symbolic format
		if (!this.isSymbolicValid(perm))
			throw new Error( "Octal permission representation is not valid" );
		// Valid, process
		permission = ( Array.isArray( perm ) ) ? perm : UGOstringToArray( perm );
	}
	
	// if Previous steps failed
	if ( !permission )
		throw new Error( "Permission representation is not valid" );
		
	// Select requested class
	switch ( klass.toLowerCase() ) {
		case "user":
			result = permission[USER];
		break;
		case "group":
			result = permission[GROUP];
		break;
		case "other":
			result = permission[OTHER];
		break;
		default:
			throw new Error( 'Class representation is not valid. Please use: "user", "group", or "other"' );
	}
	return result;
}


/**
 * Check Permission validity: "[rwx,rwx,rwx]" to octal "777"
	 @method  isSymbolicValid
	 @param {Array} UGO
	 @return {Boolean}
*/
UGOforNODE.prototype.isSymbolicValid = function ( UGO ) {
	if ( !UGO ) return false;
	if ( !Array.isArray( UGO ) ) UGO = UGOstringToArray(UGO);
	var strJoin = UGO.join('')
		, len = UGO.length
		, strLen = strJoin.length
		, goodChar = !/[^rwx-]/ig.test( strJoin )
	return ( len==3 && strLen==9 && goodChar );
}


/**
 * Check Permission validity: "rwx" to octal "7"
	 @method isOctalValid
	 @param {Number}
	 @return {Boolean}
*/
UGOforNODE.prototype.isOctalValid = function ( octal ) {
	if ( !octal ) return false;
	return !!( parseInt(octal) && octal > 100 && octal < 778 );	
}




/* **************************************************** */
/* 					PRIVATE FUNCTIONS					*/
/* **************************************************** */

/**
 * UGO string to UGO Array
	 @method  UGOstringToArray
	 @param {String} str
	 @return {Boolean}
	 @private
*/
function UGOstringToArray ( str ) {
	if ( str && str.length == 9 ) {
		// slice every 3 characters
		return str.match(/.../g); 
	} else {
		return false;
	}
}