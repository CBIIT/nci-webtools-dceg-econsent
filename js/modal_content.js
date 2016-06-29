var modalContent={
	'Surveys' : {
		header: 'Surveys',
		content: 'Periodically during the study, you will receive an email with a link to the surveys which will all be completed online at a time that is convenient to you. The surveys will vary in length and will take as little as 5 minutes or up to one hour to complete (?). You will have the option to stop before completing the survey as your responses will be saved and you can resume  at a later time. Questions may include things like x,y,z. You can skip any questions that make you uncomfortable.'
	},
	'BiologicalSamples':{
		header:'Biological Samples',
		content:'If you decide to participate, we will ask you to provide a blood and urine sample now and approximately every 2 years from your first donation. You can donate these samples during a routine visit to your healthcare provider or at a time that is convenient to you.'
	},
	'MedicalRecords':{
		header:'Medical Records',
		content:'We will work with your health care provider to access your medical records to collect specific information about your health. For example, medications you use, health conditions, and medical procedures.'

	},
	'FirstSurvey':{
		header:'First Survey and Blood & Urine Collections',
		content:'After completing the consent you will receive an email with a link to the first online survey. You can complete this at any time that is convenient to you in the next few weeks. At your next visit to your blood draw clinic, the staff will ask you to provide a urine sample and will collect up to 3 tablespoons (45mls) of blood. We will ask that you wait for at least 1 week after completing your consent to allow the oredrs to be placed. We also ask that you attend the blood draw clinic between Monday and Thursday to allow time to process your samples.'
	},
	'LengthStudy':{
		header:'Length of the Study',
		content:'This study will continue for at least 20 years.  You may choose not to participate in any part of this study.  We will continue to follow you for all parts of the study for which you do wish to participate, including future studies.'
	}
};


function createModal(id) {
	var header = modalContent[id].header;
	var content = modalContent[id].content;

	$('#modalTitle').html(header);
	$('#modalContent').html(content);

	$('#modal').modal('show')

}





Object.keys(modalContent).forEach(function(id) {
	$('#' + id).click(function() {
		createModal(id)
	})
})