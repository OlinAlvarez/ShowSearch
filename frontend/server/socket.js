module.exports = (server) => {

    const
        mod = require('api_module'),
        io = require('socket.io')(server)

    //pranil
    io.on('connection', socket => {

        socket.on('query', param => {
            mod.search(param)
                .then(results => {
                    let available = []
                    results.forEach(element => {
                        available.push({ name: element.show.name, id: element.show.id })
                    })
                    available.length > 10 ? io.emit('successful-query', available.splice(0, 10)) : io.emit('successful-query', available);
                })
                .catch(err => console.log(err))
        })

        //olin
        socket.on('specific-show', id => {
            mod.fetch_by_id(id)
                .then(result => {
                    let show = {
                        name: result.name ? result.name : 'Not Available in the search-by-id feature of the API.',
                        genres: result.genres.length > 0 ? result.genres : 'Not Available',
                        rating: result.rating.average ? result.rating.average : 'Not Available',
                        summary: result.summary ? result.summary : 'Not Available',
                        site: result.officialSite ? result.officialSite : 'Not Available',
                        status: result.status ? result.status : 'Not Available',
                        image: result.image && result.image.medium ? result.image.medium : 'default.png'
                    }
                    io.emit('show-returned', show)
                })
                .catch(err => console.log(err))
        })

    })

}