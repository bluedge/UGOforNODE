var 	assert 			= require('assert')
	, 	UGOforNODE 		= require('../lib/main.js')
	, 	ugo				= new UGOforNODE();



describe( 'UGOforNODE', function() {

	// .toOctal
	describe( '.toOctal should convert Symbolic notation passed by String ["rwx", "rwx", "r--"] to Numeric notation', function() {
		it( "should return 774", function () {
			assert.strictEqual( 774, ugo.toOctal( ["rwx", "rwx", "r--"] ) );
		})
	});
	
	// .toOctal
	describe( '.toOctal should convert Symbolic notation passed by String "rwxrwxr--" to Numeric notation', function() {
		it( "should return 774", function () {
			assert.strictEqual( 774, ugo.toOctal( "rwxrwxr--" ) );
		})
	});
	
	// .toSymbolic
	describe( '.toSymbolic should convert Numeric notation 774 to Symbolic notation as array ["rwx", "rwx", "r--"]', function() {
		it( 'should return ["rwx","rwx","r--"]', function () {
			assert.deepEqual( ["rwx","rwx","r--"], ugo.toSymbolic( 774 ) );
		})
	});
	
	// .toSymbolic
	describe( '.toSymbolic should convert Numeric notation 774 to Symbolic notation as String "rwxrwxr--", option param "string"', function() {
		it( 'should return "rwxrwxr--"', function () {
			assert.strictEqual( "rwxrwxr--", ugo.toSymbolic( 774, "string" ) );
		})
	});
	
	// .getPermissionByClass
	describe( '.getPermissionByClass should return the Symbolic notation for the specified group, permission noted as Number', function() {
		it( 'should return "r--"', function () {
			assert.strictEqual( "r--", ugo.getPermissionByClass( 774, 'OTHER' ) );
		})
	});
	
	
	// .getPermissionByClass
	describe( '.getPermissionByClass should return the Symbolic notation for the specified group, permission noted as Array', function() {
		it( 'should return "r--"', function () {
			assert.strictEqual( "r--", ugo.getPermissionByClass( ["rwx","rwx","r--"], 'OTHER' ) );
		})
	});
	
	// .isSymbolicValid
	describe( '.isSymbolicValid validate Symbolic permission noted as Array', function() {
		it( 'should return true', function () {
			assert.strictEqual( true, ugo.isSymbolicValid( ["rwx","rwx","r--"] ) );
		})
	});
	
	// .isSymbolicValid
	describe( '.isSymbolicValid validate Symbolic permission noted as String', function() {
		it( 'should return true', function () {
			assert.strictEqual( true, ugo.isSymbolicValid( "rwxrwxr--" ) );
		})
	});
	
	// .isOctalValid
	describe( '.isOctalValid validate Octal', function() {
		it( 'should return true', function () {
			assert.strictEqual( true, ugo.isOctalValid( 555 ) );
		})
	});


});




//var ret = perm.toOctal( [ 'rwx', 'rwx', 'r--' ] );
//var ret = perm.toOctal( 'rwxrw-r--' );
//var ret2 = perm.toSymbolic( 764, 'string' );
//var ret3 = perm.getPermissionByClass( 777, 'OTHER' );
//console.log( ret );
//console.log( ret2 );
//console.log( 'ret3: ', ret3 );

//console.log( perm.isOctalValid( 777 ) );