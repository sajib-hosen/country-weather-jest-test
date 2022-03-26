import React from "react";
import { render, screen, fireEvent, findByTestId } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect'
import { BrowserRouter } from "react-router-dom";
import Country from "../Country";

const MockCountry = ()=>{
    return(
        <BrowserRouter>
            <Country />
        </BrowserRouter>
    )
}

describe('testing Country', ()=>{

    // on input value change search btn enable
    it('btn exist in the country page', async ()=>{
        const { getByTestId } = render( <MockCountry />);
        const backBtnEl = getByTestId('backHomeBtn');
        expect(backBtnEl).toBeInTheDocument()
    })

    // it('find the country name', async ()=>{
    //     render( <MockCountry />);
    //     const cuntryNameEl: any = await screen.findByTestId('countryName');
    //     expect(cuntryNameEl).toBeInTheDocument()
    // })


    // https://www.youtube.com/watch?v=dReoPIwDccY
})






