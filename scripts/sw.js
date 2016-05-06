self.addEventListener('fetch', function(event) {
	console.log(event.request);
  event.respondWith(
    fetch('http://api-ratp.pierre-grimaud.fr/v2/metros/1/stations')
  )
});
