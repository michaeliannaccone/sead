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
  		valueNames: ['name','fade-in-content','published','views','collections','teammates','datasets_raw']
	};
	
	var spaceList = new List('project-spaces-dashboard', options);  
	spaceList.sort('name', { order: "asc" }); 
    
	$('#sort-views').click(function(){
		$('.sort').removeClass('active');
		$(this).addClass('active');
		spaceList.sort('views', { order: "desc" }); 

	});

	$('#sort-users').click(function(){
		$('.sort').removeClass('active');
		$(this).addClass('active');
		spaceList.sort('teammates', { order: "desc" }); 

	});

	$('#sort-name').click(function(){
		$('.sort').removeClass('active');
		$(this).addClass('active');
		spaceList.sort('name', { order: "asc" }); 

	});

	$('#sort-collections').click(function(){
		$('.sort').removeClass('active');
		$(this).addClass('active');
		spaceList.sort('collections', { order: "desc" }); 

	});

	$('#sort-datasets').click(function(){
		$('.sort').removeClass('active');
		$(this).addClass('active');
		spaceList.sort('datasets_raw', { order: "desc" }); 

	});

	$('#filter-published').click(function() {
  		spaceList.filter(function(item) {
    	if (item.values().published > 0) {
      		return true;
    	}
    	else {
      		return false;
    	}

  	 });
  	$('.filter').removeClass('active');
	$(this).addClass('active');	
  	return false;
	});

	$('#reset-button').click(function() {
        $('#search-field').val('');
    	spaceList.search();
    	spaceList.sort('name', { order: "asc" }); 
    	spaceList.filter();
    	$('.filter').removeClass('active');
    	$('.sort').removeClass('active');
    });


	$('#loading-spinner').remove();
}



seadSpaces.formatBytes = function(bytes,decimals){
    if(bytes == 0) return '0 Byte';
    var k = 1000;
    var dm = decimals + 1 || 3;
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    var i = Math.floor(Math.log(bytes) / Math.log(k));
    return (bytes / Math.pow(k, i)).toPrecision(dm) + ' ' + sizes[i];
}


seadSpaces.buildGrid = function(size,i,projectName,projectDescription,projectLogo,projectColor,projectBg,datasets_display,datasets_raw,users,views,collections,published,bytes,value){

	var page = '';
	page += '<div class="span4">';
	page += '<div class="space-wrapper">';
	page += '<a href="'+value+'"><div class="fade-wrapper">';
	page += '<div class="fade-out" style="background-image:url('+projectLogo+'),url('+projectBg+');">';
	page += '</div>';		
	if(projectDescription){page += '<div class="fade-in"><div class="fade-in-content">'+projectDescription.replace(/<(?:.|\n)*?>/gm, '')+'</div></div>';}
	page += '</div></a>';
	page += '<div class="space-stats">';
	page += '<h4><a href="'+value+'" class="name">'+projectName+'</a></h4>';
	page += '<ul>';
	if(views){page += '<li class="views" title="'+views+' views"><i class="fa fa-lg fa-eye"></i> '+views+'</li>';}
	if(users){page += '<li class="teammates" title="'+users+' contributors"><i class="fa fa-lg fa-user"></i> '+users+'</li>';}
	if(collections){page += '<li class="collections" title="'+collections+' collections"><i class="fa fa-lg fa-folder"></i> '+collections+'</li>';}
	if(datasets_display){page += '<li class="datasets" title="'+datasets_display+' datasets"><i class="fa fa-lg fa-database"></i> '+datasets_display+'</li>';}
	if(datasets_raw){page += '<li class="datasets_raw">'+datasets_raw+'</li>';}
	//if(bytes){page += '<li class="bytes" title="'+bytes+' bytes"><i class="fa fa-lg fa-hdd-o"></i> '+bytes+'</li>';}
	if(published){page += '<li class="published" title="'+published+' published dataset"><i class="fa fa-lg fa-folder-open"></i> '+published+'</li>';}
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
         console.log(info);
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
		 var bytes = info[0].contents["Total number of bytes"];
         var datasets_display = seadSpaces.abbreviateNumber(info[0].contents["Datasets"]);
         var datasets_raw = info[0].contents["Datasets"];
		 var users = seadSpaces.abbreviateNumber(info[0].contents["Number of Users"]);
         var views = seadSpaces.abbreviateNumber(info[0].contents["Total Views"]);
         var collections = seadSpaces.abbreviateNumber(info[0].contents["Collections "]);
         var published = seadSpaces.abbreviateNumber(info[0].contents["Published Collections"]);
         seadSpaces.buildGrid(size,i,projectName,projectDescription,projectLogo,projectColor,projectBg,datasets_display,datasets_raw,users,views,collections,published,bytes,value);
         i++;
    });
    });
}

seadSpaces.init();