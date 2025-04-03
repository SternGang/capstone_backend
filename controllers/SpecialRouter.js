const SpecialsRouter = require('express').Router()

const Special = require('../database/models/Special')

// this route returns all resources
SpecialsRouter.get('/', (request, response) => {
    Special.findAll()
        .then(Specials => {
            response.json(Specials)
        })
        .catch(error => next(error));
});

// this route returns resource matching the id provided in the request
SpecialsRouter.get('/:id', (request, response, next) => {
    Special.findByPk(request.params.id)
        .then(Special => {
            if (Special) {
                response.json(Special)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error));
})

// this route creates a new resource using the information provided in the body of the request
SpecialsRouter.post('/', (request, response, next) => {
    const body = request.body
    Special.create(
        {
            SpecialCodeID: body.SpecialCodeID,
            Name: body.Name,
            ConfinmentDays: body.ConfinmentDays,
            PenaltyTours: body.PenaltyTours,
            Demerits: body.Demerits
        }
    )
        .then(Special => {
            response.json(Special)
        })
        .catch(error => next(error))
})

// this route deletes the resource matching the id provided in the request
SpecialsRouter.delete('/:id', (request, response, next) => {
    Special.destroy(
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
SpecialsRouter.put('/:id', (request, response, next) => {
    const body = request.body
    Special.update(
        {
            SpecialCodeID: body.SpecialCodeID,
            Name: body.Name,
            ConfinmentDays: body.ConfinmentDays,
            PenaltyTours: body.PenaltyTours,
            Demerits: body.Demerits
        },
        {
            where: {
                id: request.params.id
            }
        }
    )
        .then(Special => {
            if (Special) {
                Special.findByPk(request.params.id)
                    .then(Special => {
                        if (Special) {
                            response.json(Special)
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

module.exports = SpecialsRouter