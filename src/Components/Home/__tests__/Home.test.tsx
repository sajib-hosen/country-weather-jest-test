import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect'
import Home from "../Home";
import { BrowserRouter, Routes } from "react-router-dom";


describe('Home testing', ()=>{
    const MockHome = () =>{
        return (
            <BrowserRouter>
                <Home />
            </BrowserRouter>
        )
    }
    
    // First way
    test('Testing for search btn in home',()=>{
        const { getByTestId } = render( <MockHome/>)
        const searchBtnEl = getByTestId('searchBtn')
        expect(searchBtnEl.textContent).toBe('Search')
    })
    
    //Second way
    it('Testing for search btn', async ()=>{
        render( <MockHome/>)
        const searchBtnEl = screen.getByText(/Search/i)
        expect(searchBtnEl).toBeInTheDocument()
    })
    
    // disable search btn with on test input
    it('search btn disable with no input value', async ()=>{
        render(<MockHome/>);
        const searchBtnEl = screen.getByText(/Search/i);
        expect(searchBtnEl).toBeDisabled()
    })
    
    //input field is rander in th documen
    it('input field in the document', async ()=>{
        const { getByTestId } = render( <MockHome/>)
        const inputEl = getByTestId('inputField');

        expect(inputEl).toBeInTheDocument()    
    })

    //getting search input value
    it('Getting input value', async ()=>{
        const { getByTestId } = render( <MockHome/>);
        const inputEl: any = getByTestId('inputField').querySelector('input'); //only for MUI user need to add ".querySelector('input')" to get input value.
        fireEvent.change( inputEl, { target: { value: 'bangladesh'}});
        expect(inputEl.value).toBe('bangladesh');
    })

    //on input value change search btn enable
    it('change input value and enable search btn', async ()=>{
        const { getByTestId } = render( <MockHome />);
        const inputEl: any = getByTestId('inputField').querySelector('input');
        const searchBtn = screen.getByText(/Search/i);
        fireEvent.change(inputEl, { target: { value: 'Noa-khali'}});
        expect(searchBtn).toBeEnabled();
    })

})
