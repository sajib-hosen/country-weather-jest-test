import React from "react";
import { BrowserRouter } from "react-router-dom";
import Country from "../Country";
import { findByText, fireEvent, render, screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';


const MockCountry = ()=>{
    return(
        <BrowserRouter>
            <Country />
        </BrowserRouter>
    )
}

describe('testing Country', ()=>{

    // Runs a function before any of the tests in this file run
    beforeAll(()=>{
        global.fetch = jest.fn(()=> Promise.resolve({
            json: ()=>Promise.resolve({
             temperature: 32,
             weatherIcon: 'http://weather.icon',
             windSpeed: 27, 
             precip: 14,
            })
        })) as jest.Mock;
    })

    // Runs after each tests have finished
    afterEach(() =>{
        const mockFn = jest.fn();
        mockFn.mockClear();
    })

    // Runs after all tests have finished
    afterAll(()=>{
        const mockFn = jest.fn();
        mockFn.mockRestore();
    })


    test('Load and display country data', async () => {
        render(<MockCountry/>)
        await screen.findByTestId('capitalEl')

        expect(screen.getByTestId('capitalEl')).toBeInTheDocument()
    })

    it('testing capital weather btn', ()=>{
        render(<MockCountry/>)
        
        const capitalWeatherBtnEl = screen.getByText(/Capital weather/i)

        expect(capitalWeatherBtnEl).toBeInTheDocument()
    })

    test('lead and display weather data', async ()=>{
        render( <MockCountry/> )

        const capitalWeatherBtnEl = screen.getByText(/Capital weather/i)
        fireEvent.click(capitalWeatherBtnEl)

        await  screen.findByTestId('tampEl')
        expect( screen.getByTestId('tampEl')).toBeInTheDocument()

    })
})


    // With the help of >>>
    // https://www.leighhalliday.com/mock-fetch-jest
    // https://blog.bitsrc.io/how-to-create-and-test-react-custom-hooks-927fe468c361
    // https://jestjs.io/docs/mock-function-api
