var restService = {protocol:'http',hostname:document.location.hostname,fqn:"nci.nih.gov",port:8765,route : "ncictRest"}
var restServerUrl = restService.protocol + "://" + restService.hostname + "/"+ restService.route;
var fields = ['name','email'];


//var link = document.querySelector('link[rel="import"]');
//var importedDoc = link.import;
//var form = importedDoc.getElementById("test");
//var a4  =[ 595.28,  841.89];  // for a4 size paper width and height
function Create_PDF(){
	var cont=""
	
	//recipient
	var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!	var full_name=document.getElementById("name").value;
	var email=document.getElementById("email").value;
	var yyyy = today.getFullYear();

	var full_name=document.getElementById("name").value;
	var email=document.getElementById("email").value;
    if(dd<10){
        dd='0'+dd
    } 
    if(mm<10){
        mm='0'+mm
    }
	var today = mm+'/'+dd+'/'+yyyy;
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
		timestamp:today,
		page:cont
	};
	$.ajax({
		type : 'POST',
		url : "/econsent/eConsentRest/",
		data : JSON.stringify(Inputs),
		contentType : 'application/json' // JSON
		}).success(function(token){
			window.location = "./thankyou.html";
			console.log(token)
			//window.open("content/NCI_STA_"+token+".pdf",'_blank');

		});
}
function validateEmail() {


      var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  	  return regex.test($('#email').val());

}

function addEventListeners() {
	
	$('#email').on('keydown', function(e) {
		validateEmail();
	});

	$('#submit').click(function() {
		clearTransferAgreementPage();
   		 if(validateTransferAgreement()&&validateEmail()==true){
		    $('#errorMessage').html("<font color='red'>Please fill in required field(s)</font>");
	        $('#errorMessage').show();
	        return;
	}



	 else if(validateTransferAgreement()&&validateEmail()==false){
		    $('#errorMessage').html("<font color='red'>Please fill in required field(s)</font><br><font color='red'>Please Please enter a valid email address</font>");
	        $('#errorMessage').show();
	        return;
	}

	 else if(!validateTransferAgreement()&&validateEmail()==false){
		    $('#errorMessage').html("<font color='red'>Please enter a valid email address</font>");
	        $('#errorMessage').show();
	        return;
	}
	else{
		Create_PDF();
	}

	})
}


function clearTransferAgreementPage(){
	var index = 0;
	for(index = 0; index < fields.length; index++){
		$('#'+fields[index]).css("background-color","");
	}
	$('#errorMessage').hide();
}

function validateTransferAgreement(){
	var hasError = false;
	var index = 0;

	for (index = 0; index < fields.length; index++){
		if($.trim($('#' + fields[index]).val()).length == 0){
				$('#'+fields[index]).css("background-color", "yellow");
				hasError = true;
	    }
	}
    return hasError;
}

$(document).ready(function() {
	addEventListeners();

})
