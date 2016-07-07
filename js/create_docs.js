var restService = {protocol:'http',hostname:document.location.hostname,fqn:"nci.nih.gov",port:8765,route : "ncictRest"}
var restServerUrl = restService.protocol + "://" + restService.hostname + "/"+ restService.route;


//var link = document.querySelector('link[rel="import"]');
//var importedDoc = link.import;
//var form = importedDoc.getElementById("test");
//var a4  =[ 595.28,  841.89];  // for a4 size paper width and height
function Create_PDF(){
	var cont=""
	
	//recipient
	
	var full_name=document.getElementById("name").value;
	var email=document.getElementById("email").value;
	
	//recipient investigator

	$.ajax({
		url:'../content/consent_form.html',
		type: 'GET',
		async:false
	}).success(function(data) {
		data=data.replace('$[Name]',full_name);	
		data=data.replace('$[Email]',email)
		cont = data;
	});
  				
		var Inputs = {
		name : full_name,
		email: email,
		page:cont
	};
	$.ajax({
		type : 'POST',
		url : "/eConsentRest/",
		data : JSON.stringify(Inputs),
		contentType : 'application/json' // JSON
		}).success(function(token){
			console.log(token)
			//window.open("content/NCI_STA_"+token+".pdf",'_blank');

		});
}

