export type countryDataType = {
    country?: string,
    capital: string [],
    latlng: number [],
    population: number,
    flags: {
        png: string,
        svg: string,
    }
}

export type weatherDataType = {
    temperature: number,
    weatherIcon: string,
    windSpeed: number,
    precip: number,
}