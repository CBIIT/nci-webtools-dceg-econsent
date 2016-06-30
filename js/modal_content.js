
$(document).ready(function() {
	var request = $.ajax({
		type: 'GET',
		url: '../json/overlay.json',
		contentType: 'application/json',
	}).fail(function(response) {
	}).always(function(response) {


		var modalContent=response
		var header=$('#header2').html();
		Object.keys(response[header]).forEach(function(id) {
			$('#' + id).click(function() {
				createModal(id,header,response)
				console.log(id)
			})
})

	});

})

function createModal(id,title,modalContent) {
	console.log(id)
	console.log(header)
	var header = modalContent[title][id].header;
	var content = modalContent[title][id].content;

	$('#modalTitle').html(header);
	$('#modalContent').html(content);

	$('#modal').modal('show')

}



