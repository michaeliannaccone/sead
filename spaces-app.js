/*
seadSpaces.metadata = function(data){
	console.log(data);
	var Abstract = data.contents['@context'].Abstract;
}

var $tag = "tag:medici@uiuc.edu,2009:data_dljmsIxG08eweIMsWeeCWQ";
var $url = "http://www.whateverorigin.org/get?url=https://sead-test.ncsa.illinois.edu/acr/resteasy/collections/"+$tag+"/metadata";
var $url = "http://www.whateverorigin.org/get?url=https://sead-test.ncsa.illinois.edu/acr/resteasy/collections/";

Date: "2015-02-13T16:15:42.988Z"
Identifier: "tag:medici@uiuc.edu,2009:data_dljmsIxG08eweIMsWeeCWQ"
Label: "seadmenu.zip"
Mimetype: "application/x-zip-compressed"
Size: "53601"
Title: "seadmenu.zip"
Uploaded By: "http://cet.ncsa.uiuc.edu/2007/person/myersjd@umich.edu"

@context: Object
	Abstract: "http://purl.org/dc/terms/abstract"
	Alternative title: "http://purl.org/dc/terms/alternative"
	Audience: "http://purl.org/dc/terms/audience"
	Bibliographic citation: "http://purl.org/dc/terms/bibliographicCitation"
	Comment: Object
	Contact: "http://sead-data.net/terms/contact"
	Coverage: "http://purl.org/dc/terms/coverage"
	Creation Date: "http://purl.org/dc/terms/created"
	Creator: "http://purl.org/dc/terms/creator"
	Date: "http://purl.org/dc/elements/1.1/date"
	Description: "http://purl.org/dc/elements/1.1/description"
	Experiment Site: "http://sead-data.net/terms/odm/location"
	Experimental Method: "http://sead-data.net/terms/odm/method"
	External Identifier: "http://purl.org/dc/terms/identifier"
	GeoPoint: ObjectHas Description: "http://purl.org/dc/terms/description"
	Identifier: "http://purl.org/dc/elements/1.1/identifier"
	Label: "http://www.w3.org/2000/01/rdf-schema#label"
	License: "http://purl.org/dc/terms/license"
	Mimetype: "http://purl.org/dc/elements/1.1/format"
	Primary Source: "http://www.w3.org/ns/prov#hadPrimarySource"
	"Proposed for Publication ": "http://sead-data.net/terms/ProposedForPublication"
	Publication Date: "http://purl.org/dc/terms/issued"
	Published In: "http://purl.org/dc/terms/isPartOf"
	Publisher: "http://purl.org/dc/terms/publisher"
	Quality Control Level: "http://sead-data.net/terms/odm/QualityControlLevel"
	Rights: "http://purl.org/dc/terms/rights"
	Rights Holder: "http://purl.org/dc/terms/rightsHolder"
	Size: "tag:tupeloproject.org,2006:/2.0/files/length"
	Start/End Date: "http://purl.org/dc/terms/temporal"
	Title: "http://purl.org/dc/elements/1.1/title"
	Topic: "http://purl.org/dc/terms/subject"
	Uploaded By: "http://purl.org/dc/elements/1.1/creator"
	describes: "http://cet.ncsa.uiuc.edu/2007/mmdb/describes"
	duplicates: "http://cet.ncsa.uiuc.edu/2007/mmdb/duplicates"
	has derivative: "http://www.w3.org/ns/prov/#hadDerivation"
	has newer version: "http://www.w3.org/ns/prov/#hadRevision"
	has prior version: "http://www.w3.org/ns/prov#wasRevisionOf"
	http://purl.org/vocab/frbr/core#embodimentOf: "http://purl.org/vocab/frbr/core#embodimentOf"
	is derived from: "http://www.w3.org/ns/prov#wasDerivedFrom"
	is referenced by: "http://purl.org/dc/terms/isReferencedBy"
	keyword: "http://www.holygoat.co.uk/owl/redwood/0.1/tags/taggedWithTag"
	references: "http://purl.org/dc/terms/references"
	relates to: "http://cet.ncsa.uiuc.edu/2007/mmdb/relatesTo"
*/

var seadSpaces = {};

seadSpaces.projects = ["https://ifri.ncsa.illinois.edu/acr","https://hydroshare.ncsa.illinois.edu/acr","https://colombiaflood.ncsa.illinois.edu/acr","https://sead-test.ncsa.illinois.edu/acr","https://erentp.ncsa.illinois.edu/acr","https://sbdc.ncsa.illinois.edu/acr","https://sead.ncsa.illinois.edu/acr","https://sen.ncsa.illinois.edu/acr","http://imlczo-sead.ncsa.illinois.edu/acr","https://irbo.ncsa.illinois.edu/acr","https://bgcumbs.ncsa.illinois.edu/acr","https://wsc-reach.ncsa.illinois.edu/acr","https://sead-open.ncsa.illinois.edu/acr","https://glwis.ncsa.illinois.edu/acr","https://nced.ncsa.illinois.edu/acr","https://wcparc.ncsa.illinois.edu/acr","https://neon.ncsa.illinois.edu/acr","https://lse.ncsa.illinois.edu/acr","https://lowermississippi.ncsa.illinois.edu/acr","https://sead-demo.ncsa.illinois.edu/acr","https://umbio.ncsa.illinois.edu/acr","https://ccc.ncsa.illinois.edu/acr"];

seadSpaces.doAjax = function(url){
	return $.ajax({
	url: url,
    dataType: "jsonp",
    data: {
        format: "json"
    },
    type: 'GET',
	success: function(data) {
		//console.log('successful');
	 }
  });	
}


seadSpaces.abbreviateNumber = function(value){
    var newValue = value;
    if (value >= 1000) {
        var suffixes = ["", "k", "m", "b","t"];
        var suffixNum = Math.floor( (""+value).length/3 );
        var shortValue = '';
        for (var precision = 2; precision >= 1; precision--) {
            shortValue = parseFloat( (suffixNum != 0 ? (value / Math.pow(1000,suffixNum) ) : value).toPrecision(precision));
            var dotLessShortValue = (shortValue + '').replace(/[^a-zA-Z 0-9]+/g,'');
            if (dotLessShortValue.length <= 2) { break; }
        }
        if (shortValue % 1 != 0)  shortNum = shortValue.toFixed(1);
        newValue = shortValue+suffixes[suffixNum];
    }
    return newValue;
}


seadSpaces.initSort = function(){
	var options = {
  		valueNames: ['name','fade-in-content']
	};
	var spaceList = new List('project-spaces-dashboard', options);  
	$('#loading-spinner').remove();
}


seadSpaces.buildGrid = function(size,i,projectName,projectDescription,projectLogo,projectColor,projectBg,datasets,users,views,collections,published,value){

	var page = '';
	page += '<div class="span4">';
	page += '<div class="space-wrapper">';
	page += '<a href="'+value+'"><div class="fade-wrapper">';
	page += '<div class="fade-out" style="background-image:url('+projectLogo+'),url('+projectBg+');">';
	page += '</div>';		
	page += '<div class="fade-in">';
	page += '<div class="fade-in-content">';
	page += projectDescription.replace(/<(?:.|\n)*?>/gm, '');
	page += '</div>';
	page += '</div>';
	page += '</div></a>';
	page += '<div class="space-stats">';
	page += '<h4><a href="'+value+'" class="name">'+projectName+'</a></h4>';
	page += '<ul>';
	if(views){page += '<li class="views" title="'+views+' views">'+views+'</li>';}
	if(users){page += '<li class="teammates" title="'+users+' contributors">'+users+'</li>';}
	if(collections){page += '<li class="collections" title="'+collections+' collections">'+collections+'</li>';}
	if(datasets){page += '<li class="datasets" title="'+datasets+' datasets">'+datasets+'</li>';}
	if(published){page += '<li class="published" title="'+published+' published dataset">'+published+'</li>';}
	page += '<ul>';
	page += '</div>';
	page += '</div>';
	page += '</div>';
	$('.project-spaces-dashboard .row-fluid').append(page);
	if(i==size){seadSpaces.initSort();}
}


seadSpaces.init = function(){
	var i = 1;
	var size = seadSpaces.projects.length;
	$.each( seadSpaces.projects, function( key, value ) {
  	// need to bypass single origin policy - remove for production
  	var configurl = "http://www.whateverorigin.org/get?url="+value+"/resteasy/sys/config";
  	var infourl = "http://www.whateverorigin.org/get?url="+value+"/resteasy/sys/info";
  	$.when(seadSpaces.doAjax(configurl), seadSpaces.doAjax(infourl)).done(function(config, info){
         //console.log(config);
         var projectName = config[0].contents["project.name"];
		 var projectDescription = config[0].contents["project.description"];
		 var projectLogo = config[0].contents["project.header.logo"];
		 var projectColor = config[0].contents["project.header.title.color"];
		 var projectBg = config[0].contents["project.header.background"];
		 if(typeof projectBg !== 'undefined' && projectBg.substring(0, 8) == "resteasy"){
		 	projectBg = value+'/'+projectBg;
		 }
		 if(typeof projectLogo !== 'undefined' && projectLogo.substring(0, 6) == "images"){
		    projectLogo  = value+'/'+projectLogo;
		 }
         var datasets = seadSpaces.abbreviateNumber(info[0].contents["Datasets"]);
		 var users = seadSpaces.abbreviateNumber(info[0].contents["Number of Users"]);
         var views = seadSpaces.abbreviateNumber(info[0].contents["Total Views"]);
         var collections = seadSpaces.abbreviateNumber(info[0].contents["Collections "]);
         var published = seadSpaces.abbreviateNumber(info[0].contents["Published Collections"]);
         seadSpaces.buildGrid(size,i,projectName,projectDescription,projectLogo,projectColor,projectBg,datasets,users,views,collections,published,value);
         i++;
    });
    });
}

seadSpaces.init();