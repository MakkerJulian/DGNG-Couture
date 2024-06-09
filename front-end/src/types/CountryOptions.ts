export type CountryOptions = 'Mexico' | 'France' | 'United States' | 'Spain' | 'Greenland' | 'Norway' | 'Alaska' | 'Finland'

export const isCountryOption = (value: string): value is CountryOptions => {
    return ['Mexico', 'France', 'United States', 'Spain', 'Greenland', 'Norway', 'Alaska', 'Finland'].includes(value)
}