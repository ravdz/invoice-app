import {
    helpers,
    required as requiredVuelidate,
    email as emailVuelidate,
    integer as integerVuelidate,
    decimal as decimalVuelidate,
    minLength as minLengthVuelidate,
    maxLength as maxLengthVuelidate,
    minValue,
    maxValue
} from '@vuelidate/validators'

export const required = (message?: string) => {
    return helpers.withMessage(message || 'can\'t be empty', requiredVuelidate)
}

export const email = helpers.withMessage(
    'must have a valid email format',
    emailVuelidate
)

export const integer = helpers.withMessage(
    'must be an integer',
    integerVuelidate
)

export const decimal = helpers.withMessage(
    'must be a decimal',
    decimalVuelidate
)

export const minLength = (min: number) =>
    helpers.withMessage('value is too short', minLengthVuelidate(min))

export const maxLength = (max: number) =>
    helpers.withMessage('value is too long', maxLengthVuelidate(max))

export const minNumber = (min:number) => helpers.withMessage('value is too low', minValue(min))

export const maxNumber = (max:number) => helpers.withMessage('value is too large', maxValue(max))
