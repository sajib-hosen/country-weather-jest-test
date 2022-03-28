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
            country: 'countryName',
            capital: 'capital',
            latlng: 'latlng',
            population: 1236547889,
            flags: 'flags',
        }))
    })
);

beforeAll(()=>{ server.listen()});
afterEach(()=>{ server.resetHandlers()});
afterAll(()=>{ server.close()});

// according to: https://testing-library.com/docs/react-testing-library/example-intro

const MockCountry = ()=>{
    return(
        <BrowserRouter>
            <Country />
        </BrowserRouter>
    )
}

describe('testing Country.', ()=>{
    // on input value change search btn enable
    it('btn exist in the country page ', async ()=>{
        const { getByTestId } = render( <MockCountry />);
        const backBtnEl = getByTestId('backHomeBtn');
        expect(backBtnEl).toBeInTheDocument()
    })

    test('Load and display data', async () => {
        const { findByTestId } = render(<MockCountry/>)
        const capitalEl = await waitFor(()=>{ findByTestId('capitalEl')})

        expect(capitalEl).toBeInTheDocument()
    })
})

