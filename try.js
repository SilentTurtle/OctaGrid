// List all files in a directory in Node.js recursively in a synchronous fashion
var walkSync = function(dir, filelist) {

  if( dir[dir.length-1] != '/') 
	dir=dir.concat('/')

  var fs = fs || require('fs'),
      files = fs.readdirSync(dir);
  filelist = filelist || [];
  files.forEach(function(file) {
    if (fs.statSync(dir + file).isDirectory()) {
      filelist = walkSync(dir + file + '/', filelist);
    }
    else {
	// build regex search
    var re = new RegExp(/\entry.(json)/g);
		if( re.test(file) ) {
			  console.log(file);
			  filelist.push(dir+file);
		}
    }
  });
  return filelist;


};
var getAppEntries=function(dir){
	
var files=walkSync(dir);
//var parsedJSON = require(x);
var mergeJSON = require("merge-json") ;
var result={};
files.forEach(function(file) {
var json= require(file);
//console.log(json)
result = mergeJSON.merge(result, json) ;
//console.log(result) ;
});
return result;
}

var x=getAppEntries(__dirname);
console.log(x.x)
console.log(12)
