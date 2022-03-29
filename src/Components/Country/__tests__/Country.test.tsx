import React from "react";
import { BrowserRouter } from "react-router-dom";
import Country from "../Country";
import { findByText, render, screen, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect'
import { rest } from 'msw';
import { setupServer } from 'msw/node';

// setup server for mock api call 
const server = setupServer(

    rest.get('https://restcountries.com/v3.1/name/bangladesh', (req, res, ctx)=>{
        return res(ctx.json({
            capital: 'capital',
            latlng: 'latlng',
            population: 1236547889,
            flags: 'flags',
        }))
    }),

    rest.get('/bangladesh', ( req, res, ctx)=>{
        return res(ctx.json({
            temperature: 32,
            weatherIcon: 'http://weather.icon',
            windSpeed: 27, 
            precip: 14,
        }))
    })

);

beforeAll(()=>{ server.listen()});
afterEach(()=>{ server.resetHandlers()});
afterAll(()=>{ server.close()});


const MockCountry = ()=>{
    return(
        <BrowserRouter>
            <Country />
        </BrowserRouter>
    )
}

describe('testing Country', ()=>{
  
    it('btn exist in the country page', async ()=>{
        render( <MockCountry />);
        const backBtnEl = screen.getByTestId('backHomeBtn');
        expect(backBtnEl).toBeInTheDocument()
    })

    test('Load and display country data', async () => {
        render(<MockCountry/>)
        await screen.findByTestId('capitalEl')

        expect(screen.getByTestId('capitalEl')).toBeInTheDocument()
    })

    test('lead and display weather data', async ()=>{
        render( <MockCountry/> )
 
        await  screen.findByTestId('tampEl')
        expect( screen.getByTestId('tampEl')).toBeInTheDocument()

    })
})

