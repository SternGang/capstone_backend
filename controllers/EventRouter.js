const EventsRouter = require('express').Router()

const Event = require('../database/models/Event')

// this route returns all resources
EventsRouter.get('/', (request, response) => {
    Event.findAll()
        .then(Events => {
            response.json(Events)
        })
        .catch(error => next(error));
});

// this route returns resource matching the id provided in the request
EventsRouter.get('/:id', (request, response, next) => {
    Event.findByPk(request.params.id)
        .then(Event => {
            if (Event) {
                response.json(Event)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error));
})

// this route creates a new resource using the information provided in the body of the request
EventsRouter.post('/', (request, response, next) => {
    const body = request.body
    Event.create(
        {
            EventCodeID: body.EventCodeID,
            CadetID: body.CadetID,
            BoneCode: body.BoneCode,
        }
    )
        .then(Event => {
            response.json(Event)
        })
        .catch(error => next(error))
})

// this route deletes the resource matching the id provided in the request
EventsRouter.delete('/:id', (request, response, next) => {
    Event.destroy(
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
EventsRouter.put('/:id', (request, response, next) => {
    const body = request.body
    Event.update(
        {
            EventID: body.EventCodeID,
            CadetID: body.CadetID,
            EventCode: body.EventCode,
        },
        {
            where: {
                id: request.params.id
            }
        }
    )
        .then(Event => {
            if (Event) {
                Event.findByPk(request.params.id)
                    .then(Event => {
                        if (Event) {
                            response.json(Event)
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

module.exports = EventsRouter