self.addEventListener('fetch', function(event) {
  console.log(event.request.url);
  if(event.request.url.endsWith('/stations')) {
    event.respondWith(
      fetch(event.request).then(function(response) {
      	if(response.status == 404) {
      		return new Response(console.log('glawie'));
      	}
      	return response;
      }).catch(function() {
      	return new Response('Uh oh that totally failed!');
      })
    ); 	
  }
});
