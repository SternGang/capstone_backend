const BonesRouter = require('express').Router()

const Bone = require('../database/models/Bone')

// this route returns all resources
BonesRouter.get('/', (request, response) => {
    Bone.findAll()
        .then(Bones => {
            response.json(Bones)
        })
        .catch(error => next(error));
});

// this route returns resource matching the id provided in the request
BonesRouter.get('/:id', (request, response, next) => {
    Bone.findByPk(request.params.id)
        .then(Bone => {
            if (Bone) {
                response.json(Bone)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error));
})

// this route creates a new resource using the information provided in the body of the request
BonesRouter.post('/', (request, response, next) => {
    const body = request.body
    Bone.create(
        {
            BoneCode: body.BoneCode,
            Name: body.Name,
            Demerits: body.Demerits,
            PenaltyTours: body.PenaltyTours 
        }
    )
        .then(Bone => {
            response.json(Bone)
        })
        .catch(error => next(error))
})

// this route deletes the resource matching the id provided in the request
BonesRouter.delete('/:id', (request, response, next) => {
    Bone.destroy(
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
BonesRouter.put('/:id', (request, response, next) => {
    const body = request.body
    Bone.update(
        {
            BoneCodeID: body.BoneCodeID,
            Name: body.Name,
            Demerits: body.Demerits,
            PenaltyTours: body.PenaltyTours
        },
        {
            where: {
                id: request.params.id
            }
        }
    )
        .then(Bone => {
            if (Bone) {
                Bone.findByPk(request.params.id)
                    .then(Bone => {
                        if (Bone) {
                            response.json(Bone)
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

module.exports = BonesRouter