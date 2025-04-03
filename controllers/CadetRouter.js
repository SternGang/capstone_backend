const cadetsRouter = require('express').Router()

const Cadet = require('../database/models/Cadet')

// this route returns all resources
cadetsRouter.get('/', (request, response) => {
    Cadet.findAll()
        .then(cadets => {
            response.json(cadets)
        })
        .catch(error => next(error));
});

// this route returns resource matching the id provided in the request
cadetsRouter.get('/:id', (request, response, next) => {
    Cadet.findByPk(request.params.id)
        .then(cadet => {
            if (cadet) {
                response.json(cadet)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error));
})

// this route creates a new resource using the information provided in the body of the request
cadetsRouter.post('/', (request, response, next) => {
    const body = request.body
    Cadet.create(
        {
            id: body.id,
            name: body.name,
            rank: body.rank,
            class: body.class,
            email:body.userEmail,
            Password: body.Password
        }
    )
        .then(cadet => {
            response.json(cadet)
        })
        .catch(error => next(error))
})

// this route deletes the resource matching the id provided in the request
cadetsRouter.delete('/:id', (request, response, next) => {
    Cadet.destroy(
        {
            where: {
                id: request.params.id
            }
        })
        .then(() => {
            response.status(204).end()

        })
        .catch(error => next(error));
})

// this route replaces an existing resource using the information provided in the body of the request
cadetsRouter.put('/:id', (request, response, next) => {
    const body = request.body
    Cadet.update(
        {
            id: body.id,
            name: body.name,
            rank: body.rank,
            class: body.class,
            Password: body.Password
        },
        {
            where: {
                id: request.params.id
            }
        }
    )
        .then(cadet => {
            if (cadet) {
                Cadet.findByPk(request.params.id)
                    .then(cadet => {
                        if (cadet) {
                            response.json(cadet)
                        } else {
                            response.status(404).end()
                        }
                    })
                    .catch(error => next(error));
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})

module.exports = cadetsRouter