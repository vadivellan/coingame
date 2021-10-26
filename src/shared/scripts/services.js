var getTemplate = function(path, tplName, data) {
	var d = $.Deferred();
	$.get('src/templates/'+tplName+'.html', function(response) {
			var template =_.template(response);
			d.resolve(template({data:data}));
	});
	return d.promise();
};

var doAPIRequest = function(type, url, payload, thisObj){
	fetch(baseURL_CMS+url, {
		method: type,
		body: payload,
		contentType: 'application/json'})
		.then(
		function(response) {
			if (response.status !== 200) {
				console.log('API status failed' + response.status);
				return;
			}
			response.json().then(function(data) {
				thisObj.parser(data);
			});
		}
	)
	.catch(function(err) {
		console.log('Fetch Error', err);
	});

};	